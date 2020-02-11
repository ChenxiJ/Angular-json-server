import { Component, OnInit, Inject } from '@angular/core';
import { Study } from '../shared/study';
import { StudyService } from '../services/study.service';
import { Job } from '../shared/job';
import { JobService } from '../services/job.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  study: Study;
  job: Job;
  studyErrMess: string;
  jobErrMess: string;

  constructor(private studyService: StudyService,
    private jobService: JobService,
    @Inject ('BaseURL') private BaseURL: any) { }

  ngOnInit() {

    this.studyService.getCurrentStudy()
    .subscribe(study => this.study = study,
      errmess => this.studyErrMess = <any>errmess);
    
    this.jobService.getCurrentJob()
    .subscribe(job => this.job = job,
      errmess => this.jobErrMess = <any>errmess);
  }

}
