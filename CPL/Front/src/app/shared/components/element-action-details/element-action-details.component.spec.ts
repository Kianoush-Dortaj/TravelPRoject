import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementActionDetailsComponent } from './element-action-details.component';

describe('ElementActionDetailsComponent', () => {
  let component: ElementActionDetailsComponent;
  let fixture: ComponentFixture<ElementActionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementActionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementActionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
