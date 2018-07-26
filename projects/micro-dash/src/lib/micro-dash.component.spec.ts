import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroDashComponent } from './micro-dash.component';

describe('MicroDashComponent', () => {
  let component: MicroDashComponent;
  let fixture: ComponentFixture<MicroDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
