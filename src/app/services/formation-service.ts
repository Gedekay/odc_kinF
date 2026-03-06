import { Injectable } from '@angular/core';
import { FormationModel } from '../models/formation-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  
  private apiUrl = 'http://127.0.0.1:8000/api/formations';

  constructor(private http: HttpClient) { }

  getFormations(): Observable<FormationModel[]> {
    return this.http.get<FormationModel[]>(this.apiUrl);
 
  }
}