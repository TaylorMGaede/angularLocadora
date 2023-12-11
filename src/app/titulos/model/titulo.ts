import { Ator } from "src/app/atores/model/ator";
import { Classe } from "src/app/classes/model/classe";
import { Diretor } from "src/app/diretores/model/diretor";

export interface Titulo {
    _idTitulo: number;
    name: string;
    year: number;
    synopsis: string;
    category: string;
    diretor: Diretor;
    classe: Classe;
    ator: Ator[];
}

/* export class Titulo {
    _id: string = "";
    name: string = "";
    year: number = 0;
    synopsis: string = "";
    category: string = "";
    diretor: Diretor = new Diretor;
    classe: Classe = new Classe;
    ator: Ator[] = new Array<Ator>;
} */