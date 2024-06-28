import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';

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
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SidebarComponent],
  templateUrl: './formulaire-post.component.html',
  styleUrls: ['./formulaire-post.component.css']
})
export class FormulairePostComponent implements OnInit {
  forms: Devis[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(): void {
    this.service.getForms().subscribe({
      next: (data: Devis[]) => {
        this.forms = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des formulaires:', error);
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this submission?')) {
      this.service.deleteForm(id).subscribe({
        next: () => {
          console.log('Deletion successful');
          this.reloadForms();
        },
        error: (error) => {
          console.error('Error deleting the form:', error);
        }
      });
    }
  }

  reloadForms(): void {
    this.loadForms();
  }
}
