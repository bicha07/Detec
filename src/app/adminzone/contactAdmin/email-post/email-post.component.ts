import { Component, OnInit } from '@angular/core';
import { ContactEmail } from '../../../website/interfaces/interface.contactEmail';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';
import { AlertComponent } from '../../../alert/alert.component';

@Component({
  selector: 'app-mail-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent, AlertComponent],
  templateUrl: './email-post.component.html',
  styleUrls: ['./email-post.component.css'],
  providers: [ServiceService]
})
export class MailPostComponent implements OnInit {
  mails: ContactEmail[] = [];
  showForm = false;
  isEditing = false;
  currentMail: ContactEmail = new ContactEmail(0, '', '');
  selectedFile: File | null = null;

  alertType: string = '';
  alertMessage: string = '';

  constructor(private MailService: ServiceService) {}

  ngOnInit(): void {
    this.loadMails();
  }

  loadMails(): void {
    this.MailService.getContactsEmail().subscribe({
      next: (data) => {
        this.mails = data;
        this.setAlert('success', 'Emails chargés avec succès.');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des emails:', error);
        this.setAlert('danger', 'Erreur lors du chargement des emails.');
      }
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentMail = new ContactEmail(0, '', '');
    this.selectedFile = null;
  }

  onEdit(mail: ContactEmail): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentMail = Object.assign({}, mail);
    this.selectedFile = null;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.saveMail();
    } else {
      const formData = new FormData();
      formData.append('mail', this.currentMail.mail);
      formData.append('name', this.currentMail.name);

      this.MailService.createMail(formData).subscribe({
        next: () => {
          this.loadMails();
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

  saveMail(): void {
    const updatedMail: Partial<ContactEmail> = {
      mail: this.currentMail.mail,
      name: this.currentMail.name,
    };

    if (this.isEditing) {
      this.MailService.updateMail(this.currentMail.id, updatedMail).subscribe({
        next: () => {
          this.loadMails();
          this.setAlert('primary', 'Contact mis à jour avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du contact:', error);
          this.setAlert('danger', 'Erreur lors de la mise à jour du contact.');
        }
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      this.MailService.deleteMail(id).subscribe({
        next: () => {
          this.loadMails();
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
