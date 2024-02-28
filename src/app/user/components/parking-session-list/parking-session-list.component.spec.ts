import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSessionListComponent } from './parking-session-list.component';

describe('ParkingSessionListComponent', () => {
  let component: ParkingSessionListComponent;
  let fixture: ComponentFixture<ParkingSessionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSessionListComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
