import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CandidatModel } from '../models/formation-model';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private api = 'http://127.0.0.1:8000/api/candidats';

  constructor(private http: HttpClient) {}

  postuler(data: {
    nom_complet: string,
    email: string,
    tel: string,
    universite_id: number,
    formation_id: number
  }): Observable<any> {
    return this.http.post(this.api, data);
  }

  // ✅ On transforme la réponse pour ne garder que le tableau de candidats
  getCandidats(): Observable<CandidatModel[]> {
    return this.http.get<{ success: boolean, data: { data: CandidatModel[] } }>(this.api)
      .pipe(
        map(res => res.data.data) // on extrait uniquement le tableau
      );
  }

  getCandidat(id: number): Observable<CandidatModel> {
    return this.http.get<CandidatModel>(`${this.api}/${id}`);
  }

  createCandidat(data: CandidatModel) {
    return this.http.post(this.api, data);
  }

  updateCandidat(id: number, data: CandidatModel) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteCandidat(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}

