import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotelDisplayComponent } from './hotel-display.component';

describe('HotelDisplayComponent', () => {
  let component: HotelDisplayComponent;
  let fixture: ComponentFixture<HotelDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
