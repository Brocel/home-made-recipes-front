import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRightPanel } from './profile-right-panel';

describe('ProfileRightPanel', () => {
  let component: ProfileRightPanel;
  let fixture: ComponentFixture<ProfileRightPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRightPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRightPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
