import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataTabelComponent } from './no-data-tabel.component';

describe('NoDataTabelComponent', () => {
  let component: NoDataTabelComponent;
  let fixture: ComponentFixture<NoDataTabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDataTabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
