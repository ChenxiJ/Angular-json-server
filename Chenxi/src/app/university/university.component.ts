import { Component, OnInit, Inject } from '@angular/core';
import { Study } from '../shared/study';
// import const directly is not the good way, should use service to fetch data
// import { STUDIES } from '../shared/studies';
import { StudyService } from '../services/study.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class UniversityComponent implements OnInit {

  studies: Study[];
  errMess: string;
  breakpoint: number;

  // put in constructor to use the service
  constructor(private studyService: StudyService,
    @Inject('BaseURL') private BaseURL: any) { }

  // ngOnInit is called when the component is instantiated
  ngOnInit() {
    // 1 this is when using promises
    // this.studyService.getStudies()
    // .then((studies) => {
    //   this.studies = studies;
    // });

    // instead use observables

    this.studyService.getStudies()
    .subscribe(studies => this.studies = studies,
      errmess => this.errMess = <any>errmess);

    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }
}
