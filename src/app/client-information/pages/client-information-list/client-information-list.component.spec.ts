import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInformationListComponent } from './client-information-list.component';

describe('ClientInformationListComponent', () => {
  let component: ClientInformationListComponent;
  let fixture: ComponentFixture<ClientInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientInformationListComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
