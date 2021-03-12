import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TourDisplayComponent } from './tour-display.component';

describe('TourDisplayComponent', () => {
  let component: TourDisplayComponent;
  let fixture: ComponentFixture<TourDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TourDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
