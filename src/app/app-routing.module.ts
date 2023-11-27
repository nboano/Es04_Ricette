import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

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
    path: "recipe-detail/:id",
    component: RecipeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
