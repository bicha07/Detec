// src/app/formulaire/formulaire.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule

  ],
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  formulaireForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    natures: new FormControl([]),  
    chantiers: new FormControl([])
  });

  constructor(private formulaireService: ServiceService, private router: Router) {}

  onSubmit(): void {
    if (this.formulaireForm.valid) {
      this.formulaireService.sendFormData(this.formulaireForm.value).subscribe({
        next: (response) => {
          console.log('Données envoyées avec succès:', response);
          // this.router.navigate(['/confirmation']); 
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });
    }
  }
}
