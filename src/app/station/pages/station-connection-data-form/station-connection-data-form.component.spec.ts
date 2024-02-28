import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationConnectionDataFormComponent } from './station-connection-data-form.component';

describe('StationConnectionDataFormComponent', () => {
  let component: StationConnectionDataFormComponent;
  let fixture: ComponentFixture<StationConnectionDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StationConnectionDataFormComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationConnectionDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
