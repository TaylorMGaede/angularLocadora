import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ator } from '../model/ator';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtoresService {

  private readonly API = 'api/atores';

  constructor(private httpCLient: HttpClient) { }

  list() {
    return this.httpCLient.get<Ator[]>(this.API)
    .pipe(
      first(),
      delay(1000),
      tap(atores => console.log(atores))
    );
  }

  loadById(id: string) {
    return this.httpCLient.get<Ator>(`${this.API}/${id}`);
  }

  save(record: Partial<Ator>) {
    if (record._idAtor) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Ator>) {
    return this.httpCLient.post<Ator>(this.API,record).pipe(first());
  }

  private update(record: Partial<Ator>) {
    return this.httpCLient.put<Ator>(`${this.API}/${record._idAtor}`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpCLient.delete(`${this.API}/${id}`).pipe(first());
  }
}