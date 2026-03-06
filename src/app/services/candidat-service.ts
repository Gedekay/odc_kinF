import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private apiUrl = 'http://127.0.0.1:8000/api/candidats';

  constructor(private http: HttpClient) {}
  postuler(data: {
    nom_complet: string,
    email: string,
    tel: string,
    universite_id: number,
    formation_id: number
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
