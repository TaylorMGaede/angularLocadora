import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Titulo } from '../model/titulo';
import { TitulosService } from '../service/titulos.service';

export const tituloResolver: ResolveFn<Observable<Titulo>> = (route, state,  service: TitulosService = inject(TitulosService)) => {

    if (route.params?.['id']) {
        return service.loadById(route.params['id']);
    }
    return of({_idTitulo: 0, name: '', year: 0, synopsis: '', category: '', diretor: { _idDiretor: 0, name: '' }, classe: { _idClasse: 0, name: '', valor: 0, date: '' }, ator: [],});
};