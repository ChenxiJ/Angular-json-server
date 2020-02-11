import { Component, OnInit, Inject } from '@angular/core';
import { Job } from '../shared/job'
import { JobService } from '../services/job.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class EmploymentComponent implements OnInit {

  jobs: Job[];
  errMess: string;
  breakpoint: number;

  // put in constructor to use the service
  constructor(private jobService: JobService,
    @Inject('BaseURL') private BaseURL: any) { }

  // ngOnInit is called when the component is instantiated
  ngOnInit() {
    this.jobService.getJobs()
    .subscribe(jobs => this.jobs = jobs,
      errmess => this.errMess = <any>errmess);

    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
  }
}
