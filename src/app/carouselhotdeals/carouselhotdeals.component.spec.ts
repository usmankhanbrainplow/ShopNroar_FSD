import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselhotdealsComponent } from './carouselhotdeals.component';

describe('CarouselhotdealsComponent', () => {
  let component: CarouselhotdealsComponent;
  let fixture: ComponentFixture<CarouselhotdealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselhotdealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselhotdealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
