import { Injectable } from '@angular/core';
import { Ricetta } from './models/ricetta';
import { Ingrediente } from './models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // localhost WEBSRV LOCALE
  // 172.23.0.2 WEBSRV CASA
  // 172.23.0.48 WEBSRV NONNA

  private readonly API_BASE : string = "http://localhost/BOANO_5C/TPSI/Es04_Ricette.API/v1/";

  private async performRequest(method: string, endpoint : string, body : any = null) {
    return await (await fetch(this.API_BASE + endpoint, {
      method,
      body : method == "GET" ? null : JSON.stringify(body)
    })).json();
  }

  public async GetRicette(name_filter : string = "") : Promise<Ricetta[]> {
    return (await this.performRequest("GET", "ricette/?q=" + name_filter)) as Ricetta[];
  }

  public async GetRicetta(id : number) : Promise<Ricetta> {
    return (await this.performRequest("GET", "ricette/?id=" + id)) as Ricetta;
  }

  public async EditRicetta(ricetta : Ricetta) {
    return (await this.performRequest("POST", "edit-ricetta/", ricetta));
  }

  public async DeleteRicetta(ricetta : Ricetta) {
    return (await this.performRequest("GET", "del-ricetta/?id=" + ricetta.IdRicetta));
  }

  public async GetIngredienti(ricetta : Ricetta) : Promise<Ingrediente[]> {
    return (await this.performRequest("GET", "ingr-ricetta/?id=" + ricetta.IdRicetta)) as Ingrediente[];
  }

  public async UpdateIngredienti(ricetta : Ricetta, ingr : Ingrediente[]) {
    return (await this.performRequest("POST", "ingr-ricetta-update/?id=" + ricetta.IdRicetta, ingr));
  }

  constructor() { }
}
