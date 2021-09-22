import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsManagerAddComponent } from './claims-manager-add.component';

describe('ClaimsManagerAddComponent', () => {
  let component: ClaimsManagerAddComponent;
  let fixture: ComponentFixture<ClaimsManagerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsManagerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsManagerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
