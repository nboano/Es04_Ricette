import { Ingrediente } from "./ingrediente";

export class Ricetta {
    IdRicetta! : number;
    Nome! : string;
    Difficolta! : number;
    Descrizione! : string;
    PathImg! : string;
    PathIstruzioni! : string;
    TempoEsecuzione! : number;
    Ingredienti! : Ingrediente[];
};