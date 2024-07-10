import { Component, OnInit } from '@angular/core';
import { ContactTel } from '../../../website/interfaces/interface.contactTel';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';
import { AlertComponent } from '../../../alert/alert.component';

@Component({
  selector: 'app-tel-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent, AlertComponent],
  templateUrl: './tel-post.component.html',
  styleUrls: ['./tel-post.component.css'],
  providers: [ServiceService]
})
export class TelPostComponent implements OnInit {
  tels: ContactTel[] = [];
  showForm = false;
  isEditing = false;
  currentTel: ContactTel = new ContactTel(0, '', '');

  alertType: string = '';
  alertMessage: string = '';

  constructor(private TelService: ServiceService) {}

  ngOnInit(): void {
    this.loadTels();
  }

  loadTels(): void {
    this.TelService.getContactsTel().subscribe({
      next: (data) => {
        this.tels = data;
        this.setAlert('success', 'Contacts téléphoniques chargés avec succès.');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des contacts téléphoniques:', error);
        this.setAlert('danger', 'Erreur lors du chargement des contacts téléphoniques.');
      }
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentTel = new ContactTel(0, '', '');
  }

  onEdit(tel: ContactTel): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentTel = { ...tel };
  }

  onSubmit(): void {
    const formData = new ContactTel(this.currentTel.id, this.currentTel.tel, this.currentTel.name);

    if (this.isEditing) {
      this.TelService.updateTel(this.currentTel.id, formData).subscribe({
        next: () => {
          this.loadTels();
          this.setAlert('primary', 'Contact mis à jour avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du contact:', error);
          this.setAlert('danger', 'Erreur lors de la mise à jour du contact.');
        }
      });
    } else {
      this.TelService.createTel(formData).subscribe({
        next: () => {
          this.loadTels();
          this.setAlert('success', 'Contact ajouté avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du contact:', error);
          this.setAlert('danger', 'Erreur lors de l\'ajout du contact.');
        }
      });
    }
    this.closeForm();
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      this.TelService.deleteTel(id).subscribe({
        next: () => {
          this.loadTels();
          this.setAlert('danger', 'Contact supprimé avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du contact:', error);
          this.setAlert('danger', 'Erreur lors de la suppression du contact.');
        }
      });
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
