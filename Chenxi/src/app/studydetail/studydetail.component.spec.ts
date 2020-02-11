import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudydetailComponent } from './studydetail.component';

describe('StudydetailComponent', () => {
  let component: StudydetailComponent;
  let fixture: ComponentFixture<StudydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
