import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideRail } from './side-rail';

describe('SideRail', () => {
  let component: SideRail;
  let fixture: ComponentFixture<SideRail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideRail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideRail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
