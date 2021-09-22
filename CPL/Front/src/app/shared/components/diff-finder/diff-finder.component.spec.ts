import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffFinderComponent } from './diff-finder.component';

describe('DiffFinderComponent', () => {
  let component: DiffFinderComponent;
  let fixture: ComponentFixture<DiffFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
