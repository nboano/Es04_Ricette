import { Component } from '@angular/core';
import { Ricetta } from '../models/ricetta';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
  private readonly _apiService : ApiService;
  public lstRicette! : Ricetta[];

  constructor(apiService : ApiService) {
    this._apiService = apiService;
    this._apiService.GetRicette().then(ricette => this.lstRicette = ricette);
  }
}
