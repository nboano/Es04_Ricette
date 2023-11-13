import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { InsertRecipeComponent } from './insert-recipe/insert-recipe.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/recipes"
  },
  {
    path: "recipes",
    component: RecipesListComponent
  },
  {
    path: "insert-recipe",
    component: InsertRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
