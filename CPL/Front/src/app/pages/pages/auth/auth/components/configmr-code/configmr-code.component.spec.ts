import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigmrCodeComponent } from './configmr-code.component';

describe('ConfigmrCodeComponent', () => {
  let component: ConfigmrCodeComponent;
  let fixture: ComponentFixture<ConfigmrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigmrCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigmrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
