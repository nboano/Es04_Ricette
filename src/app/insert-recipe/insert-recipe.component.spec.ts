import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRecipeComponent } from './insert-recipe.component';

describe('InsertRecipeComponent', () => {
  let component: InsertRecipeComponent;
  let fixture: ComponentFixture<InsertRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertRecipeComponent]
    });
    fixture = TestBed.createComponent(InsertRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
