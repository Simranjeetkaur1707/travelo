import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PackageDisplayComponent } from './package-display.component';

describe('PackageDisplayComponent', () => {
  let component: PackageDisplayComponent;
  let fixture: ComponentFixture<PackageDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
