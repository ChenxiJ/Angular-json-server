import { Routes } from '@angular/router';
import { UniversityComponent } from '../university/university.component';
import { StudydetailComponent } from '../studydetail/studydetail.component';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { EmploymentComponent } from '../employment/employment.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'education', component: UniversityComponent},
  {path: 'studydetail/:id', component: StudydetailComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'employment', component: EmploymentComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];