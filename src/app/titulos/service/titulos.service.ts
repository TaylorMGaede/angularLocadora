import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Titulo } from '../model/titulo';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitulosService {

  private readonly API = 'api/titulos';

  constructor(private httpCLient: HttpClient) { }

  list() {
    return this.httpCLient.get<Titulo[]>(this.API)
    .pipe(
      first(),
      delay(1000),
      tap(titulos => console.log(titulos))
    );
  }

  loadById(id: string) {
    return this.httpCLient.get<Titulo>(`${this.API}/${id}`);
  }

  save(record: Partial<Titulo>) {
    if (record._idTitulo) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Titulo>) {
    return this.httpCLient.post<Titulo>(this.API,record).pipe(first());
  }

  private update(record: Partial<Titulo>) {
    return this.httpCLient.put<Titulo>(`${this.API}/${record._idTitulo}`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpCLient.delete(`${this.API}/${id}`).pipe(first());
  }
}