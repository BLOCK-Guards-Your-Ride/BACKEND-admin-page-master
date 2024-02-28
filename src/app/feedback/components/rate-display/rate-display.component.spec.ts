import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDisplayComponent } from './rate-display.component';

describe('RateDisplayComponent', () => {
  let component: RateDisplayComponent;
  let fixture: ComponentFixture<RateDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RateDisplayComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
