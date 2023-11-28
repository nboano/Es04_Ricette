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

  public searchQuery : string = "";

  constructor(apiService : ApiService) {
    this._apiService = apiService;
    this._apiService.GetRicette(this.searchQuery).then(ricette => this.lstRicette = ricette);
  }

  onSearch() {
    this._apiService.GetRicette(this.searchQuery).then(ricette => this.lstRicette = ricette);
  }

  getStarsHTML(diff : number) {
    return "<i class='fa fa-star'></i>".repeat(diff);
  }
}
