import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerHandle } from './drawer-handle';

describe('DrawerHandle', () => {
  let component: DrawerHandle;
  let fixture: ComponentFixture<DrawerHandle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerHandle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerHandle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
