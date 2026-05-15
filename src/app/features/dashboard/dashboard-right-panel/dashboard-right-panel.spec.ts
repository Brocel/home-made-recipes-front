import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRightPanel } from './dashboard-right-panel';

describe('DashboardRightPanel', () => {
  let component: DashboardRightPanel;
  let fixture: ComponentFixture<DashboardRightPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRightPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRightPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
