//import { ResolveFn } from '@angular/router';

//export const atorResolver: ResolveFn<boolean> = (route, state) => {
//  return true;
//};

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Ator } from '../model/ator';
import { AtoresService } from '../service/atores.service';

export const atorResolver: ResolveFn<Observable<Ator>> = (route, state,  service: AtoresService = inject(AtoresService)) => {

  if (route.params?.['id']){
    return service.loadById(route.params['id']);
  }
  return of({_idAtor: 0, name: ''});
};