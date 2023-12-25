import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Requirement } from '../models/requirement';

@Injectable({
  providedIn: 'root',
})
export class RequirementService {
  url = 'http://localhost:3000/requirements';
  httpClient = inject(HttpClient);

  constructor() {}
  list(): Observable<Requirement[]> {
    return this.httpClient.get<Requirement[]>(this.url);
  }

  //requirment => Observable<Requirement>
  add(req: Requirement): Observable<Requirement> {
    return this.httpClient.post<Requirement>(this.url, req);
  }

  get(id: number): Observable<Requirement> {
    //requirments/:id
    return this.httpClient.get<Requirement>(`${this.url}/${id}`);
  }

  edit(req: Requirement, id: number): Observable<Requirement> {
    // requirements/:id
    return this.httpClient.put<Requirement>(`${this.url}/${id}`, req);
  }
}
