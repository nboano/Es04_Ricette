import { Injectable } from '@angular/core';
import { Ricetta } from './models/ricetta';

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

  public async GetRicette() : Promise<Ricetta[]> {
    return (await this.performRequest("GET", "ricette/")) as Ricetta[];
  }

  public async GetRicetta(id : number) : Promise<Ricetta> {
    return (await this.performRequest("GET", "ricette?id=" + id)) as Ricetta;
  }

  public async EditRicetta(id : number, ricetta : Ricetta) {
    return (await this.performRequest("POST", "editRicette?id=" + id, ricetta));
  }

  constructor() { }
}