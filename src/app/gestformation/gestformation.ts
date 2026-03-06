import { Component, signal } from '@angular/core';
import { FormationModel } from '../models/formation-model';
import { FormationService } from '../services/formation-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestformation',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestformation.html',
  styleUrl: './gestformation.css',
})
export class Gestformation {
  formations = signal<FormationModel[]>([]);
  editMode = signal(false);
  formationId = signal<number | null>(null);

  formation: FormationModel = {
    nom: '',
    description: '',
    date_debut: '',
    date_fin: ''
  };

  constructor(private formationService: FormationService) {
    this.loadFormations();
  }

  loadFormations() {
    this.formationService.getFormations().subscribe(data => {
      this.formations.set(data);
    });
  }

  saveFormation() {

    if (this.editMode()) {

      this.formationService.updateFormation(
        this.formationId()!,
        this.formation
      ).subscribe(() => {
        this.loadFormations();
        this.resetForm();
      });

    } else {

      this.formationService.createFormation(this.formation)
        .subscribe(() => {
          this.loadFormations();
          this.resetForm();
        });

    }
  }

  editFormation(f: FormationModel) {
    this.editMode.set(true);
    this.formationId.set(f.id!);
    this.formation = { ...f };
  }

  deleteFormation(id: number) {
    if (confirm("Supprimer cette formation ?")) {
      this.formationService.deleteFormation(id)
        .subscribe(() => {
          this.loadFormations();
        });
    }
  }

  resetForm() {
    this.editMode.set(false);
    this.formationId.set(null);

    this.formation = {
      nom: '',
      description: '',
      date_debut: '',
      date_fin: ''
    };
  }
}
