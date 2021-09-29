import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqiveRequestListComponent } from './reqive-request-list.component';

describe('ReqiveRequestListComponent', () => {
  let component: ReqiveRequestListComponent;
  let fixture: ComponentFixture<ReqiveRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqiveRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqiveRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
