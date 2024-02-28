import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlcMetadataFormComponent } from './plc-metadata-form.component';

describe('PlcMetadataFormComponent', () => {
  let component: PlcMetadataFormComponent;
  let fixture: ComponentFixture<PlcMetadataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlcMetadataFormComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlcMetadataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
