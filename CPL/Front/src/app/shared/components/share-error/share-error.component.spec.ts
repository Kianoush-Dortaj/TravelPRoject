import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareErrorComponent } from './share-error.component';

describe('ShareErrorComponent', () => {
  let component: ShareErrorComponent;
  let fixture: ComponentFixture<ShareErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
