import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlysearchComponent } from './recentlysearch.component';

describe('RecentlysearchComponent', () => {
  let component: RecentlysearchComponent;
  let fixture: ComponentFixture<RecentlysearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlysearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
