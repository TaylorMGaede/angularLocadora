import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Classe } from '../model/classe';
import { ClassesService } from '../service/classes.service';

export const classeResolver: ResolveFn<Observable<Classe>> = (route, state,  service: ClassesService = inject(ClassesService)) => {

  if (route.params?.['id']){
    return service.loadById(route.params['id']);
  }
  return of({_idClasse: 0, name: '', valor: 0, date: ''});
};