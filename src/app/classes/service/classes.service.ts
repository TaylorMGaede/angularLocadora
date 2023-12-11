import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classe } from '../model/classe';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private readonly API = 'api/classes';
  
  constructor(private httpCLient: HttpClient) { }
  
  list() {
    return this.httpCLient.get<Classe[]>(this.API)
    //.pipe(
      //first(),
      //delay(1000),
      //tap(classes => console.log(classes))
    //);
  }

  loadById(id: string) {
    return this.httpCLient.get<Classe>(`${this.API}/${id}`);
  }

  save(record: Partial<Classe>) {
    if (record._idClasse) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Classe>) {
    return this.httpCLient.post<Classe>(this.API,record).pipe(first());
  }

  private update(record: Partial<Classe>) {
    return this.httpCLient.put<Classe>(`${this.API}/${record._idClasse}`, record).pipe(first());
  }

  remove(id: number) {
    return this.httpCLient.delete(`${this.API}/${id}`).pipe(first());
  }
}