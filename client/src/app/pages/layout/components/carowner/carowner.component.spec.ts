import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarownerComponent } from './carowner.component';

describe('CarownerComponent', () => {
  let component: CarownerComponent;
  let fixture: ComponentFixture<CarownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarownerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
