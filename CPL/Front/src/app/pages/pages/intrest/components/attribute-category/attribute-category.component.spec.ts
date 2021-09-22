import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeCategoryComponent } from './attribute-category.component';

describe('AttributeCategoryComponent', () => {
  let component: AttributeCategoryComponent;
  let fixture: ComponentFixture<AttributeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
