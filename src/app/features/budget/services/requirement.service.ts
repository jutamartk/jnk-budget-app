import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Requirement } from '../../models/requirement';

@Injectable({
  providedIn: 'root',
})
export class RequirementService {
  url = 'http://localhost:3000/requirements';
  HttpClient = inject(HttpClient);

  constructor() {}
  list(): Observable<Requirement[]> {
    return this.HttpClient.get<Requirement[]>(this.url);
  }
}
