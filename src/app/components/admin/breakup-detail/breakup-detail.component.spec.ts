import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BreakupDetailComponent } from './breakup-detail.component';

describe('BreakupDetailComponent', () => {
  let component: BreakupDetailComponent;
  let fixture: ComponentFixture<BreakupDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
