export interface FormationModel {
    id?: number;
    nom: string;
    description: string;
    date_debut: string;
    date_fin: string; 
}
export interface UniversiteModel {
  id:number
  nom:string
}
export interface CandidatModel {
  id?: number;
  nom_complet: string;
  email: string;
  tel: string;
  universite_id: number;
  formation_id: number;
}