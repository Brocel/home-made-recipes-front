import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesRightPanel } from './recipes-right-panel';

describe('RecipesRightPanel', () => {
  let component: RecipesRightPanel;
  let fixture: ComponentFixture<RecipesRightPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesRightPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesRightPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
