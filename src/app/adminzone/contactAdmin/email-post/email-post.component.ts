import { Component, OnInit } from '@angular/core';
import { ContactEmail } from '../../../website/interfaces/interface.contactEmail';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';

@Component({
  selector: 'app-mail-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent,CommonModule],
  templateUrl: './email-post.component.html',
  styleUrl: './email-post.component.css',
  providers: [ServiceService]

})
export class MailPostComponent implements OnInit {
  mails: ContactEmail[] = [];
  showForm = false;
  isEditing = false;
  currentMail: ContactEmail = new ContactEmail(0, '', '');
  selectedFile: File | null = null;

  constructor(private MailService: ServiceService) {}

  ngOnInit(): void {
    this.loadMails();
  }

  loadMails(): void {
    this.MailService.getContactsEmail().subscribe(data => {
      this.mails = data;
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

    } else {
      const formData = new FormData();

      formData.append('mail', this.currentMail.mail);
      formData.append('name', this.currentMail.name);

      this.MailService.createMail(formData).subscribe(() => {
        this.loadMails();
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
      this.MailService.updateMail(this.currentMail.id, updatedMail).subscribe(() => {
        this.loadMails();
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this partner?')) {
      this.MailService.deleteMail(id).subscribe(() => {
        this.loadMails();
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }
}
