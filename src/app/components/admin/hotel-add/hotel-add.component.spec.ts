import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotelAddComponent } from './hotel-add.component';

describe('HotelAddComponent', () => {
  let component: HotelAddComponent;
  let fixture: ComponentFixture<HotelAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
