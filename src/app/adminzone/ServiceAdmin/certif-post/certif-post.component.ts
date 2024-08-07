import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../website/service.service';
import { Certif, CertAdvantages } from '../../../website/interfaces/interface.certif';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../../alert/alert.component';

@Component({
  selector: 'app-certif-post',
  standalone: true,
  templateUrl: './certif-post.component.html',
  styleUrls: ['./certif-post.component.css'],
  providers: [ServiceService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AlertComponent]
})
export class CertifPostComponent implements OnInit {
  certifs: Certif[] = [];
  showForm = false;
  isEditing = false;
  currentCertif: Certif = { 
    id: 0, 
    photo: '', 
    title: '', 
    recap: '', 
    description1: '', 
    description2: '', 
    desc_photo: '', 
    conclusion: '', 
    certadvantages: [] 
  };
  selectedFile: File | null = null;
  baseUrl: String;

  alertType: string = '';
  alertMessage: string = '';

  constructor(private serviceService: ServiceService) {
    this.baseUrl = this.serviceService.apiUrlbase;
  }

  ngOnInit(): void {
    this.loadCertifs();
  }

  loadCertifs(): void {
    this.serviceService.getCertifs().subscribe(data => {
      this.certifs = data;
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentCertif = { 
      id: 0, 
      photo: '', 
      title: '', 
      recap: '', 
      description1: '', 
      description2: '', 
      desc_photo: '', 
      conclusion: '', 
      certadvantages: [] 
    };
    this.selectedFile = null; // Reset the selected file
  }

  onEdit(certif: Certif): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentCertif = { ...certif };
    this.selectedFile = null; // Reset the selected file
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addAdvantage(): void {
    this.currentCertif.certadvantages.push({ id: 0, title: '', description: '' });
  }

  removeAdvantage(index: number): void {
    this.currentCertif.certadvantages.splice(index, 1);
  }

  onSubmit(): void {
    if (this.isEditing) {
      if (this.selectedFile) {
        this.serviceService.uploadFile(this.selectedFile).subscribe(response => {
          this.currentCertif.photo = response.path;
          this.saveCertif();
        });
      } else {
        this.saveCertif();
      }
    } else {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      } else {
        formData.append('photo', "empty");
      }
      formData.append('title', this.currentCertif.title);
      formData.append('recap', this.currentCertif.recap);
      formData.append('description1', this.currentCertif.description1);
      formData.append('description2', this.currentCertif.description2);
      formData.append('desc_photo', this.currentCertif.desc_photo);
      formData.append('conclusion', this.currentCertif.conclusion);
      formData.append('certadvantages', JSON.stringify(this.currentCertif.certadvantages)); // Convert advantages to JSON

      this.serviceService.createCertif(formData).subscribe(
        () => {
          this.loadCertifs();
          this.setAlert('success', 'Certificat ajouté avec succès.');
        },
        error => {
          this.setAlert('danger', 'Erreur lors de l\'ajout du certificat.');
        }
      );
    }
    this.closeForm();
  }

  saveCertif(): void {
    const updatedCertif: Partial<Certif> = {
      title: this.currentCertif.title,
      recap: this.currentCertif.recap,
      photo: this.selectedFile ? this.currentCertif.photo : this.currentCertif.photo,
      description1: this.currentCertif.description1,
      description2: this.currentCertif.description2,
      desc_photo: this.currentCertif.desc_photo,
      conclusion: this.currentCertif.conclusion,
      certadvantages: this.currentCertif.certadvantages // Ensure advantages are included
    };

    if (this.isEditing) {
      this.serviceService.updateCertif(this.currentCertif.id, updatedCertif).subscribe(
        () => {
          this.loadCertifs();
          this.setAlert('primary', 'Certificat mis à jour avec succès.');
        },
        error => {
          this.setAlert('danger', 'Erreur lors de la mise à jour du certificat.');
        }
      );
    }
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce certificat ?')) {
      this.serviceService.deleteCertif(id).subscribe(
        () => {
          this.loadCertifs();
          this.setAlert('danger', 'Certificat supprimé avec succès.');
        },
        error => {
          this.setAlert('danger', 'Erreur lors de la suppression du certificat.');
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
