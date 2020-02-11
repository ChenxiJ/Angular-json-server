import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  errorMsg: string;
  submitting: boolean;

  // make sure form is completely reset to initial values
  @ViewChild('fform', {static: false}) feedbackFormDirective: { resetForm: () => void; };

  formErrors = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'telnum': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'Frist name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 25 characters long.'
    },
    'email':  {
      'required': 'Email is required.',
      'email': 'Email not in valid form.'
    },
    'telnum':  {
      'required': 'Tel number is required.',
      'pattern': 'Tel number must only contain numbers.'
    }
  };

  constructor(private fb:FormBuilder,
    private feedbackService: FeedbackService,
    @Inject('BaseURL') private BaseURL: any) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      telnum: [null, [Validators.required, Validators.pattern]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    // Rxjs watches for value change
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();  // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.submitting = true;
    this.feedbackService.postFeedback(this.feedbackForm.value)
      .subscribe(feedback => this.feedback = feedback,
        errmess => { this.feedback = null; this.errorMsg = <any>errmess;}
      );
    setTimeout(() => this.submitting = false, 10000); 
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      email: '',
      telnum: null,
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
