import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';



export interface Style {
  id?: string;
  styleCode: string;
  buyerId: string;
  garmentType: string;
  gender: string;
  season: string;
  sampleApproved: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StyleService {

  private apiUrl = environment.apiUrl + 'styles';

  constructor(private http: HttpClient) {}

  // GET ALL STYLES
  getAllStyles(): Observable<Style[]> {
    return this.http.get<Style[]>(this.apiUrl);
  }

  // GET STYLE BY ID
  getStyleById(id: string): Observable<Style> {
    return this.http.get<Style>(`${this.apiUrl}/${id}`);
  }

  // CREATE STYLE
  addStyle(style: Style): Observable<Style> {
    return this.http.post<Style>(this.apiUrl, style);
  }

  // UPDATE STYLE
  updateStyle(id: string, style: Style): Observable<Style> {
    return this.http.put<Style>(`${this.apiUrl}/${id}`, style);
  }

  // DELETE STYLE
  deleteStyle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}