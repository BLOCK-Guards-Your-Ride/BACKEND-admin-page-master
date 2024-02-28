import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInformationFormComponent } from './client-information-form.component';

describe('ClientInformationFormComponent', () => {
  let component: ClientInformationFormComponent;
  let fixture: ComponentFixture<ClientInformationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientInformationFormComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
