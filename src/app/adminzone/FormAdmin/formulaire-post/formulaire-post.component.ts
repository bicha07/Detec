import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';
import { AlertComponent } from '../../../alert/alert.component';
interface Nature {
  id: number;
  name: string;
}

interface Chantier {
  id: number;
  name: string;
}

interface Devis {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  natures: Nature[];
  chantiers: Chantier[];
}

@Component({
  selector: 'app-formulaire-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SidebarComponent, AlertComponent],
  templateUrl: './formulaire-post.component.html',
  styleUrls: ['./formulaire-post.component.css']
})
export class FormulairePostComponent implements OnInit {
  forms: Devis[] = [];
  
  alertType: string = '';
  alertMessage: string = '';

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(): void {
    this.service.getForms().subscribe({
      next: (data: Devis[]) => {
        this.forms = data;
        this.setAlert('success', 'Formulaires chargés avec succès.');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des formulaires:', error);
        this.setAlert('danger', 'Erreur lors du chargement des formulaires.');
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette soumission ?')) {
      this.service.deleteForm(id).subscribe({
        next: () => {
          console.log('Suppression réussie');
          this.reloadForms();
          this.setAlert('success', 'Soumission supprimée avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la soumission:', error);
          this.setAlert('danger', 'Erreur lors de la suppression de la soumission.');
        }
      });
    }
  }

  reloadForms(): void {
    this.loadForms();
  }

  setAlert(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;

    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}
