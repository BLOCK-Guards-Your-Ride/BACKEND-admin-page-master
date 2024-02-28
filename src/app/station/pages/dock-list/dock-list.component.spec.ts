import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockListComponent } from './dock-list.component';

describe('DockListComponent', () => {
  let component: DockListComponent;
  let fixture: ComponentFixture<DockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DockListComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
