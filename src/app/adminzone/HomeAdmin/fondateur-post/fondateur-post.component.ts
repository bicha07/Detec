import { Component, OnInit } from '@angular/core';
import { Personne } from '../../../website/interfaces/interface.personne';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';
import { AlertComponent } from '../../../alert/alert.component';// Import the AlertModule

@Component({
  selector: 'app-fondateur-post',
  standalone: true,
  templateUrl: './fondateur-post.component.html',
  styleUrls: ['./fondateur-post.component.css'],
  providers: [ServiceService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent,AlertComponent]
})
export class FondateurPostComponent implements OnInit {
  personne: Personne[] = [];
  showForm = false;
  isEditing = false;
  currentPersonne: Personne = new Personne(0, '', '', '', '');
  selectedFile: File | null = null;
  baseUrl: String;

  alertType: string = '';
  alertMessage: string = '';

  constructor(private teamService: ServiceService) {
    this.baseUrl = this.teamService.apiUrlbase;
  }

  ngOnInit(): void {
    this.loadTeam();
  }

  loadTeam(): void {
    this.teamService.getPersonnes().subscribe(data => {
      this.personne = data;
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentPersonne = new Personne(0, '', '', '', '');
    this.selectedFile = null;
  }

  onEdit(personne: Personne): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentPersonne = Object.assign({}, personne);
    this.selectedFile = null;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.isEditing) {
      if (this.selectedFile) {
        this.teamService.uploadFile(this.selectedFile).subscribe(response => {
          this.currentPersonne.photo = response.path;
          this.savePersonne();
        });
      } else {
        this.savePersonne();
      }
    } else {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }
      formData.append('name', this.currentPersonne.name);
      formData.append('post', this.currentPersonne.post);
      formData.append('description', this.currentPersonne.description);
      this.teamService.createPersonne(formData).subscribe(
        () => {
          this.loadTeam();
          this.setAlert('success', 'Membre ajouté avec succès.');
        },
        error => {
          this.setAlert('danger', 'Erreur lors de l\'ajout du membre.');
        }
      );
    }
    this.closeForm();
  }

  savePersonne(): void {
    const updatedPersonne: Partial<Personne> = {
      name: this.currentPersonne.name,
      post: this.currentPersonne.post,
      description: this.currentPersonne.description,
      photo: this.selectedFile ? this.currentPersonne.photo : "empty"
    };

    if (this.isEditing) {
      this.updatePersonne(this.currentPersonne.id, updatedPersonne);
    }
  }

  updatePersonne(id: number, updatedPersonne: Partial<Personne>): void {
    this.teamService.updatePersonne(id, updatedPersonne).subscribe(
      () => {
        this.loadTeam();
        this.setAlert('primary', 'Membre mis à jour avec succès.');
      },
      error => {
        this.setAlert('danger', 'Erreur lors de la mise à jour du membre.');
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre?')) {
      this.teamService.deletePersonne(id).subscribe(
        () => {
          this.loadTeam();
          this.setAlert('danger', 'Membre supprimé avec succès.');
        },
        error => {
          this.setAlert('danger', 'Erreur lors de la suppression du membre.');
        }
      );
    }
  }

  closeForm(): void {
    this.showForm = false;
  }

  setAlert(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;

    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}
