import { Component, signal } from '@angular/core';
import { CandidatModel, FormationModel } from '../models/formation-model';
import { CandidatService } from '../services/candidat-service';
import { FormationService } from '../services/formation-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

@Component({
  selector: 'app-gestcandidat',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestcandidat.html',
  styleUrl: './gestcandidat.css',
})
export class Gestcandidat {

  candidats = signal<CandidatModel[]>([]);
  formations = signal<FormationModel[]>([]);
  editMode = signal(false);
  candidatId = signal<number | null>(null);
  formationFiltre = signal<number | null>(null);

  candidat: CandidatModel = {
    nom_complet: '',
    email: '',
    tel: '',
    universite_id: 0,
    formation_id: 0
  };

  constructor(
    private candidatService: CandidatService,
    private formationService: FormationService
  ) {
    this.loadCandidats();
    this.loadFormations();
  }

  loadCandidats() {
    this.candidatService.getCandidats().subscribe({
      next: data => this.candidats.set(data),
      error: err => {
        console.error('Erreur API:', err);
        this.candidats.set([]);
      }
    });
  }

  loadFormations() {
    this.formationService.getFormations().subscribe({
      next: data => this.formations.set(data),
      error: err => {
        console.error('Erreur API formations:', err);
        this.formations.set([]);
      }
    });
  }

  saveCandidat() {
    if (this.editMode()) {
      this.candidatService.updateCandidat(
        this.candidatId()!,
        this.candidat
      ).subscribe(() => {
        this.loadCandidats();
        this.resetForm();
      });
    } else {
      this.candidatService.createCandidat(this.candidat)
        .subscribe(() => {
          this.loadCandidats();
          this.resetForm();
        });
    }
  }

  editCandidat(c: CandidatModel) {
    this.editMode.set(true);
    this.candidatId.set(c.id!);
    this.candidat = { ...c };
  }

  deleteCandidat(id: number) {
    if (confirm("Supprimer ce candidat ?")) {
      this.candidatService.deleteCandidat(id)
        .subscribe(() => {
          this.loadCandidats();
        });
    }
  }

  resetForm() {
    this.editMode.set(false);
    this.candidatId.set(null);

    this.candidat = {
      nom_complet: '',
      email: '',
      tel: '',
      universite_id: 0,
      formation_id: 0
    };
  }
  getFormationNom(id: number): string {
    const formation = this.formations().find(f => f.id === id);
    return formation ? formation.nom : 'Formation inconnue';
  }

  getCandidatsParFormation() {
    if (this.formationFiltre() === null) return this.candidats();
    return this.candidats().filter(c => c.formation_id === this.formationFiltre());
  }

  // EXPORT EXCEL
  exportExcel() {
  const candidats = this.candidats();

  const grouped = candidats.reduce((acc, c) => {
    const key = c.formation_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {} as Record<number, CandidatModel[]>);

  const rows: any[] = [];

  for (const formationId in grouped) {
    rows.push({
      Formation: formationId,
      Candidat: '',
      Email: '',
      Téléphone: ''
    });

    grouped[formationId].forEach(c => {
      rows.push({
        Formation: formationId,
        Candidat: c.nom_complet,
        Email: c.email,
        Téléphone: c.tel
      });
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidats');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const blob = new Blob([excelBuffer], {
    type: 'application/octet-stream'
  });

  saveAs(blob, 'rapport_candidats.xlsx');
}

  // EXPORT WORD
  exportWord() {
    const candidats = this.candidats();

    const grouped = candidats.reduce((acc, c) => {
      const key = c.formation_id;
      if (!acc[key]) acc[key] = [];
      acc[key].push(c);
      return acc;
    }, {} as Record<number, CandidatModel[]>);

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Rapport des candidats par formation",
                  bold: true,
                  size: 28
                })
              ],
            }),

            ...Object.keys(grouped).map(fid =>
              new Paragraph({
                children: [
                  new TextRun({ text: `Formation ${fid}`, bold: true, break: 1 }),

                  ...grouped[+fid].map(c =>
                    new TextRun({
                      text: `- ${c.nom_complet} (${c.email}, ${c.tel})`,
                      break: 1
                    })
                  )
                ]
              })
            )
          ]
        }
      ]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'rapport_candidats.docx');
    });
  }

}
