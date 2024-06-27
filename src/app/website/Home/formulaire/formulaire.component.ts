import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  formulaireForm: FormGroup;

    // Define options as properties of the class
    naturesOptions: string[] = ['1','2','3'];
    chantiersOptions: string[] = ['1', '2', '3', '4', '5'];
    naturez:string[]=['Soudeur', 'Assembleur', 'Soudeur Assembleur'];
    chantierz : string[] = ['Mine', 'Aluminerie', 'Pâte à papier', 'Shop de Soudure', 'Construction'];


  // Define options as properties of the class
  // naturesOptions: string[] = ['Soudeur', 'Assembleur', 'Soudeur Assembleur'];
  // chantiersOptions: string[] = ['Mine', 'Aluminerie', 'Pâte à papier', 'Shop de Soudure', 'Construction'];

  constructor(
    private fb: FormBuilder,
    private formulaireService: ServiceService,
    private router: Router
  ) {
    this.formulaireForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      company: ['', Validators.required],
      natures: new FormArray([]),
      chantiers: new FormArray([]),
      message: ['']
    });
    this.addCheckboxes();
  }

  ngOnInit() {}

  private addCheckboxes() {
    this.naturesOptions.forEach(() => (this.naturesArray as FormArray).push(new FormControl(false)));
    this.chantiersOptions.forEach(() => (this.chantiersArray as FormArray).push(new FormControl(false)));
  }

  get naturesArray() {
    return this.formulaireForm.get('natures') as FormArray;
  }

  get chantiersArray() {
    return this.formulaireForm.get('chantiers') as FormArray;
  }

  onSubmit(): void {
    if (this.formulaireForm.valid) {
      const selectedNatures = this.formulaireForm.value.natures
        .map((checked: boolean, i: number) => checked ? this.naturesOptions[i] : null)
        .filter((v: string | null) => v !== null);

      const selectedChantiers = this.formulaireForm.value.chantiers
        .map((checked: boolean, i: number) => checked ? this.chantiersOptions[i] : null)
        .filter((v: string | null) => v !== null);

      const finalData = {
        ...this.formulaireForm.value,
        natures: selectedNatures,
        chantiers: selectedChantiers
      };

      console.log(finalData);
      // Implement the service call or other actions
    
  


      this.formulaireService.sendFormData(finalData).subscribe({
        next: (response) => {
          console.log('Données envoyées avec succès:', response);
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      });
    } else {
      console.log('Form is not valid:', this.formulaireForm);
    }
}
}

