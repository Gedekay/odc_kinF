import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormationModel } from '../models/formation-model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  api = "http://127.0.0.1:8000/api/formations"

  constructor(private http:HttpClient){}

  getFormations():Observable<FormationModel[]>{
    return this.http.get<FormationModel[]>(this.api)
  }

  createFormation(data:FormationModel){
    return this.http.post(this.api,data)
  }

  updateFormation(id:number,data:FormationModel){
    return this.http.put(`${this.api}/${id}`,data)
  }

  deleteFormation(id:number){
    return this.http.delete(`${this.api}/${id}`)
  }

}