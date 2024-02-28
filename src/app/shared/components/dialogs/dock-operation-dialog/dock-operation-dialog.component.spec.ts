import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockOperationDialogComponent } from './dock-operation-dialog.component';

describe('SelectParkingSessionStoppingOperationComponent', () => {
  let component: DockOperationDialogComponent;
  let fixture: ComponentFixture<DockOperationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DockOperationDialogComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockOperationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
