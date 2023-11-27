import { Ingrediente } from "./ingrediente";

export class Ricetta {
    IdRicetta! : number;
    Nome! : string;
    Difficolta! : number;
    Descrizione! : string;
    PathImg! : string;
    Istruzioni! : string;
    TempoEsecuzione! : number;
};