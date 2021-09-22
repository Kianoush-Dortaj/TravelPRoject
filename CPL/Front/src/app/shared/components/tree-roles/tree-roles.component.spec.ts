import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeRolesComponent } from './tree-roles.component';

describe('TreeRolesComponent', () => {
  let component: TreeRolesComponent;
  let fixture: ComponentFixture<TreeRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
