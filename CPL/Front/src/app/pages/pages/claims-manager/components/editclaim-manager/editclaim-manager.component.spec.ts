import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclaimManagerComponent } from './editclaim-manager.component';

describe('EditclaimManagerComponent', () => {
  let component: EditclaimManagerComponent;
  let fixture: ComponentFixture<EditclaimManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditclaimManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclaimManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
