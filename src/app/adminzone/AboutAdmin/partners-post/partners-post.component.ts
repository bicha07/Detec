import { Component, OnInit } from '@angular/core';
import { Partner } from '../../../website/interfaces/interface.partner';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';
import { AlertComponent } from '../../../alert/alert.component';

@Component({
  selector: 'app-partner-post',
  standalone: true,
  templateUrl: './partners-post.component.html',
  styleUrls: ['./partners-post.component.css'],
  providers: [ServiceService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent, AlertComponent]
})
export class PartnerPostComponent implements OnInit {
  partners: Partner[] = [];
  showForm = false;
  isEditing = false;
  currentPartner: Partner = new Partner(0, '', '');
  selectedFile: File | null = null;
  baseUrl: String;

  alertType: string = '';
  alertMessage: string = '';

  constructor(private partnerService: ServiceService) {
    this.baseUrl = this.partnerService.apiUrlbase;
  }

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerService.getPartners().subscribe({
      next: (data) => {
        this.partners = data;
        this.setAlert('success', 'Partners chargés avec succès.');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des partners:', error);
        this.setAlert('danger', 'Erreur lors du chargement des partners.');
      }
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentPartner = new Partner(0, '', '');
    this.selectedFile = null;
  }

  onEdit(partner: Partner): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentPartner = Object.assign({}, partner);
    this.selectedFile = null;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.isEditing) {
      if (this.selectedFile) {
        this.partnerService.uploadFile(this.selectedFile).subscribe(response => {
          this.currentPartner.photo = response.path;
          this.savePartner();
        });
      } else {
        this.savePartner();
      }
    } else {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }
      formData.append('name', this.currentPartner.name);
      this.partnerService.createPartner(formData).subscribe({
        next: () => {
          this.loadPartners();
          this.setAlert('success', 'Partner ajouté avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du partner:', error);
          this.setAlert('danger', 'Erreur lors de l\'ajout du partner.');
        }
      });
    }
    this.closeForm();
  }

  savePartner(): void {
    const updatedPartner: Partial<Partner> = {
      name: this.currentPartner.name,
      photo: this.selectedFile ? this.currentPartner.photo : "empty"
    };

    if (this.isEditing) {
      this.partnerService.updatePartner(this.currentPartner.id, updatedPartner).subscribe({
        next: () => {
          this.loadPartners();
          this.setAlert('primary', 'Partner mis à jour avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du partner:', error);
          this.setAlert('danger', 'Erreur lors de la mise à jour du partner.');
        }
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce partner ?')) {
      this.partnerService.deletePartner(id).subscribe({
        next: () => {
          this.loadPartners();
          this.setAlert('danger', 'Partner supprimé avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du partner:', error);
          this.setAlert('danger', 'Erreur lors de la suppression du partner.');
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
