import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayLegendModalComponent } from './day-legend-Modal.component';

describe('DayLegendComponent', () => {
  let component: DayLegendModalComponent;
  let fixture: ComponentFixture<DayLegendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayLegendModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayLegendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
