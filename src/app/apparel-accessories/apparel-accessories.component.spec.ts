import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelAccessoriesComponent } from './apparel-accessories.component';

describe('ApparelAccessoriesComponent', () => {
  let component: ApparelAccessoriesComponent;
  let fixture: ComponentFixture<ApparelAccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparelAccessoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparelAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
