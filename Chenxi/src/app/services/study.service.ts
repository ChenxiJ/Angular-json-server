import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// when using json-server, then don't need to get data from local shared
// import { STUDIES } from '../shared/studies';
// import { delay } from 'rxjs/operators';
import { Study } from '../shared/study';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

// dependency injection
@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  // 1
  // getStudies(): Study[] {
  //   return STUDIES;
  // }
  
  // // 2 instead use Promise to get studies
  // getStudies(): Promise<Study[]> {
  //   // 2.1 this is when resolve immediately

  //   // return Promise.resolve(STUDIES);
    
  //   // 2.2 instead simulate server latency with 2s delay

  //   // return new Promise(resolve => {
  //   //   setTimeout(() => resolve(STUDIES), 2000);
  //   // });

  //   // 2.3 now the third way of using Rxjs with delay
  //   return of(STUDIES).pipe(delay(2000)).toPromise();

  // }

    // 3 instead use observable
  getStudies(): Observable<Study[]> {
    // 3.1 from local with delay simulation
    // return of(STUDIES).pipe(delay(2000));
    // 3.2 now instead get data from json-server
    return this.http.get<Study[]>(baseURL + 'studies')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getStudy(id: string): Observable<Study> {
    return this.http.get<Study>(baseURL + 'studies/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getCurrentStudy(): Observable<Study> {
    return this.http.get<Study>(baseURL + 'studies?current=true')
      .pipe(map(studies => studies[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getStudyIds(): Observable<string[] | any> {
    return this.getStudies().pipe(map(studies => studies.map(study => study.id)))
      .pipe(catchError(error => error));
  }

  putStudy(study: Study): Observable<Study> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
      };
      return this.http.put<Study>(baseURL + 'studies/' + study.id, study, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
