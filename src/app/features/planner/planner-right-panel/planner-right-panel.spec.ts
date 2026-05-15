import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerRightPanel } from './planner-right-panel';

describe('PlannerRightPanel', () => {
  let component: PlannerRightPanel;
  let fixture: ComponentFixture<PlannerRightPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerRightPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerRightPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
