import { Injectable } from '@angular/core';
import { UniversiteModel } from '../models/formation-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UniversiteService {
  api="http://127.0.0.1:8000/api/universites"

  constructor(private http:HttpClient){}

  getUniversites():Observable<UniversiteModel[]>{
    return this.http.get<UniversiteModel[]>(this.api)
  }
}