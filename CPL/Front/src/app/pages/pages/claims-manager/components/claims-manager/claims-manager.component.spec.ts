import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsManagerComponent } from './claims-manager.component';

describe('ClaimsManagerComponent', () => {
  let component: ClaimsManagerComponent;
  let fixture: ComponentFixture<ClaimsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
