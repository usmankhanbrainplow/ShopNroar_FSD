import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsGridComponent } from './deals-grid.component';

describe('DealsGridComponent', () => {
  let component: DealsGridComponent;
  let fixture: ComponentFixture<DealsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
