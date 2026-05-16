import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Production, ProductionStage } from '../../shared/model';

@Injectable({
  providedIn: 'root',
})
export class ProductionService {

 private apiUrl = environment.apiUrl + 'productions';

  constructor(private http: HttpClient) {}

  getAllProductions() {
    return this.http.get<Production[]>(this.apiUrl);
  }

  getById(id: string) {
    return this.http.get<Production>(`${this.apiUrl}/${id}`);
  }

  addProduction(data: Production) {
    return this.http.post(this.apiUrl, data);
  }

  updateProduction(id: string, data: Production) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteProduction(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}