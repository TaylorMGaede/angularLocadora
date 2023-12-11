import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Diretor } from '../model/diretor';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiretoresService {

  private readonly API = 'api/diretores';

  constructor(private httpCLient: HttpClient) { }

  list() {
    return this.httpCLient.get<Diretor[]>(this.API)
    .pipe(
      first(),
      delay(1000),
      tap(diretores => console.log(diretores))
    );
  }

  loadById(id: string) {
    return this.httpCLient.get<Diretor>(`${this.API}/${id}`);
  }

  save(record: Partial<Diretor>) {
    if (record._idDiretor) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Diretor>) {
    return this.httpCLient.post<Diretor>(this.API,record).pipe(first());
  }

  private update(record: Partial<Diretor>) {
    return this.httpCLient.put<Diretor>(`${this.API}/${record._idDiretor}`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpCLient.delete(`${this.API}/${id}`).pipe(first());
  }
}