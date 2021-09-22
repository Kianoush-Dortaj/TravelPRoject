import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitlerComponent } from './fitler.component';

describe('FitlerComponent', () => {
  let component: FitlerComponent;
  let fixture: ComponentFixture<FitlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
