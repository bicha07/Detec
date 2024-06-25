import { Component, OnInit } from '@angular/core';
import { Partner } from '../../../website/interfaces/interface.partner';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';

@Component({
    selector: 'app-partner-post',
    standalone: true,
    templateUrl: './partners-post.component.html',
    styleUrls: ['./partners-post.component.css'],
    providers: [ServiceService],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent]
})
export class PartnerPostComponent implements OnInit {
  partners: Partner[] = [];
  showForm = false;
  isEditing = false;
  currentPartner: Partner = new Partner(0, '', '');
  selectedFile: File | null = null;

  constructor(private partnerService: ServiceService) {}

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerService.getPartners().subscribe(data => {
      this.partners = data;
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
      this.partnerService.createPartner(formData).subscribe(() => {
        this.loadPartners();
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
      this.partnerService.updatePartner(this.currentPartner.id, updatedPartner).subscribe(() => {
        this.loadPartners();
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this partner?')) {
      this.partnerService.deletePartner(id).subscribe(() => {
        this.loadPartners();
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }
}
