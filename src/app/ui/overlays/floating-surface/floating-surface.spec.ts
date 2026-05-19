import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingSurface } from './floating-surface';

describe('FloatingSurface', () => {
  let component: FloatingSurface;
  let fixture: ComponentFixture<FloatingSurface>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingSurface]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingSurface);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
