import { Component, signal } from '@angular/core';
import { FormationService } from '../services/formation-service';
import { FormationModel, UniversiteModel } from '../models/formation-model';
import { CandidatService } from '../services/candidat-service';
import {FormsModule } from '@angular/forms';
import { UniversiteService } from '../services/universite-service';

@Component({
  selector: 'app-formation',
  imports: [FormsModule
  ],
  templateUrl: './formation.html',
  styleUrl: './formation.css',
})
export class Formation {

  formations = signal<FormationModel[]>([]);
  universites = signal<UniversiteModel[]>([]);

  loading = signal(true);
  error = signal('');

  modalOpen = signal(false);
  formationSelected = signal<number | null>(null);

  candidat = {
    nom_complet: '',
    email: '',
    tel: '',
    universite_id: 0,
    formation_id: 0
  };

  constructor(
    private formationService: FormationService,
    private candidatService: CandidatService,
    private universiteService: UniversiteService
  ) {
    this.loadFormations();
    this.loadUniversites();
  }

  loadFormations() {
    this.formationService.getFormations().subscribe({
      next: (data) => {
        this.formations.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur chargement formations');
        this.loading.set(false);
      }
    });
  }

  loadUniversites() {
    this.universiteService.getUniversites().subscribe({
      next: (data) => {
        this.universites.set(data);
      },
      error: () => {
        console.error("Erreur chargement universités");
      }
    });
  }

  openModal(formationId: number) {
    this.formationSelected.set(formationId);
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }

  submitCandidat() {

    this.candidat.formation_id = this.formationSelected()!;

    this.candidatService.postuler(this.candidat).subscribe({
      next: () => {
        alert("Inscription réussie !");
        this.closeModal();
      },
      error: () => {
        alert("Erreur lors de l'inscription");
      }
    });
  }

}
