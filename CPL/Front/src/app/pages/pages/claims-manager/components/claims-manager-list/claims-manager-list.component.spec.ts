import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsManagerListComponent } from './claims-manager-list.component';

describe('ClaimsManagerListComponent', () => {
  let component: ClaimsManagerListComponent;
  let fixture: ComponentFixture<ClaimsManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
