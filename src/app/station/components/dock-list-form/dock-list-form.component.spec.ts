import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockListFormComponent } from './dock-list-form.component';

describe('DockListComponent', () => {
  let component: DockListFormComponent;
  let fixture: ComponentFixture<DockListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DockListFormComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
