import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSettingComponent } from './register-setting.component';

describe('RegisterSettingComponent', () => {
  let component: RegisterSettingComponent;
  let fixture: ComponentFixture<RegisterSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
