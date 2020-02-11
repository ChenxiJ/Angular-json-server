import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Study, Course } from '../shared/study';
import { StudyService } from '../services/study.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-studydetail',
  templateUrl: './studydetail.component.html',
  styleUrls: ['./studydetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class StudydetailComponent implements OnInit {
  
  // input decorator since study is passed from university component
  // @Input()

  // if pass from router parameters, then don't need @Input()
  study: Study;
  studyIds: string[];
  prev: string;
  next: string;
  errorMsg: string;

  courseForm: FormGroup;
  course: Course;
  studyCopy: Study;
  visibility = 'shown';

  @ViewChild('fform', {static: false}) courseFormDirective: { resetForm: () => void; };

  formErrors = {
    'title': '',
    'grade': '',
    'lecturerRating': ''
  };

  validationMessages = {
    'title': {
      'required': 'Title is required.',
      'minlength': 'Title must be at least 5 characters long.',
      'maxlength': 'Title cannot be more than 50 characters long. '
    },
    'grade': {
      'required': 'Grade is required.',
      'minlength': 'Grade must be at least 1 characters long.',
      'maxlength': 'Grade cannot be more than 20 characters long. '
    },
    'lecturerRating': {
      'required': 'Lecturer rating is required.',
      'pattern': 'Lecturer rating must only contain numbers.'
    }
  };

  // all the services need to be params in constructor
  constructor(private studyService: StudyService,
    private route: ActivatedRoute,
    private location: Location,
    private cors: FormBuilder,
    @Inject('BaseURL') private BaseURL: any) { 
      this.createForm();
    }

  ngOnInit() {
    // instead of using snapshot, use observable to get params whenever changes
    // let id = this.route.snapshot.params['id'];
    this.studyService.getStudyIds()
      .subscribe((studyIds) => this.studyIds = studyIds);
    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.studyService.getStudy(params['id']);}))
        .subscribe(study => {
          this.study = study,
          this.studyCopy = study,
          this.setPrevNext(study.id),
          this.visibility = 'shown'},
          errmess => this.errorMsg = <any>errmess);
  }

  setPrevNext(studyId: string) {
    const index = this.studyIds.indexOf(studyId);
    this.prev = this.studyIds[(this.studyIds.length + index - 1) % this.studyIds.length];
    this.next = this.studyIds[(this.studyIds.length + index + 1) % this.studyIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.courseForm = this.cors.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      grade: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      lecturerRating: [5, [Validators.required, Validators.pattern]],
    });
    this.courseForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.courseForm) { return; }
    const form = this.courseForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
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
    this.course = this.courseForm.value;
    this.course.date = new Date().toISOString();
    this.studyCopy.courses.push(this.course);
    this.studyService.putStudy(this.studyCopy)
      .subscribe(study => { this.study = study, this.studyCopy = study},
        errmess => { this.study = null; this.studyCopy = null; this.errorMsg = <any>errmess; });
    this.courseForm.reset({
      title: '',
      grade: '',
      lecturerRating: 5,
      date : ''
    });
    this.courseFormDirective.resetForm();
  }

}
