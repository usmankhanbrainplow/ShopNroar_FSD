import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistuserComponent } from './wishlistuser.component';

describe('WishlistuserComponent', () => {
  let component: WishlistuserComponent;
  let fixture: ComponentFixture<WishlistuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
