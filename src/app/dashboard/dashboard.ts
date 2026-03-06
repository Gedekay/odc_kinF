import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormationModel } from '../models/formation-model';
import { FormationService } from '../services/formation-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {

  
}