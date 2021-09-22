import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumpsComponent } from './bread-crumps.component';

describe('BreadCrumpsComponent', () => {
  let component: BreadCrumpsComponent;
  let fixture: ComponentFixture<BreadCrumpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadCrumpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
