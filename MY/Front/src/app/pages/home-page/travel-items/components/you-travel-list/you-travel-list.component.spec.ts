import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTravelListComponent } from './you-travel-list.component';

describe('YouTravelListComponent', () => {
  let component: YouTravelListComponent;
  let fixture: ComponentFixture<YouTravelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouTravelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouTravelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
