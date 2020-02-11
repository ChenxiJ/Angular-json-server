import { Injectable } from '@angular/core';
import { Job } from '../shared/job';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(baseURL + 'jobs')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getJob(id: string): Observable<Job> {
    return this.http.get<Job>(baseURL + 'jobs/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  
  }

  getCurrentJob(): Observable<Job> {
    return this.http.get<Job>(baseURL + 'jobs?current=true')
      .pipe(map(jobs => jobs[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
