import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api-service.service';
import { Ricetta } from '../models/ricetta';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  ricetta! : Ricetta;

  constructor(private router : Router, route : ActivatedRoute, private apiSvc : ApiService) {
    route.paramMap.subscribe(async params => {
      let idRic = parseInt(params.get("id") ?? '-1');
      if(idRic != -1) {
        this.ricetta = await apiSvc.GetRicetta(idRic);
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
      }
    });
  }

  async saveRecipe() {
    try {
      await this.apiSvc.EditRicetta(this.ricetta);
      eval('toastr.success("La ricetta è stata salvata", "Salvataggio avvenuto con successo")');
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
}
