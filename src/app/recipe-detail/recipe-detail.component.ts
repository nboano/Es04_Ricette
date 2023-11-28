import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api-service.service';
import { Ricetta } from '../models/ricetta';
import { Ingrediente } from '../models/ingrediente';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  ricetta! : Ricetta;
  ingredienti! : Ingrediente[];
  nPersone : number = 2;
  
  ingredientiNPersone : Ingrediente[] = [];

  constructor(private router : Router, route : ActivatedRoute, private apiSvc : ApiService) {
    route.paramMap.subscribe(async params => {
      let idRic = parseInt(params.get("id") ?? '-1');
      if(idRic != -1) {
        this.ricetta = await apiSvc.GetRicetta(idRic);
        this.ingredienti = await apiSvc.GetIngredienti(this.ricetta);
        this.calcIngrNPersone();
      } else {
        this.ricetta = {
          IdRicetta : -1,
          Nome : "Nuova ricetta",
          Difficolta : 1,
          Descrizione : "",
          PathImg : "",
          TempoEsecuzione : 30,
          Istruzioni : ""
        };
        this.ingredienti = [];
      }
    });
  }

  async saveRecipe() {
    try {
      await Promise.all([
        this.apiSvc.EditRicetta(this.ricetta), 
        this.apiSvc.UpdateIngredienti(this.ricetta, this.ingredienti)]
      );
      eval('toastr.success("La ricetta è stata salvata", "Salvataggio avvenuto con successo")');
      this.router.navigate(["/recipes"]);
    } catch(e) {
      eval('toastr.error("", "Errore nel salvataggio della ricetta")');
    }
    
  }

  async deleteRecipe() {
    try {
      if(confirm("Sei sicuro di voler eliminare la ricetta?")) {
        await this.apiSvc.DeleteRicetta(this.ricetta);
        eval('toastr.success("La ricetta è stata eliminata", "Eliminazione avvenuta con successo")');
        this.router.navigate(["/recipes"]);
      }
    } catch(e) {
      eval('toastr.error("", "Errore nell\'eliminazione della ricetta")');
    }
  }

  aggiungiIngr() {
    this.ingredienti.push(new Ingrediente());
  }

  rimuoviIngr(i : number) {
    this.ingredienti.splice(i, 1);
  }

  calcIngrNPersone() {
    this.ingredientiNPersone = this.ingredienti.map(ingr => {let o = Object.assign({}, ingr); o.Dose *= this.nPersone; return o;});
  }
}
