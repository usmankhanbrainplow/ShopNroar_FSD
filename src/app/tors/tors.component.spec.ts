import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorsComponent } from './tors.component';

describe('TorsComponent', () => {
  let component: TorsComponent;
  let fixture: ComponentFixture<TorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
