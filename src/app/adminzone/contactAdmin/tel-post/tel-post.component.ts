import { Component, OnInit } from '@angular/core';
import { ContactTel } from '../../../website/interfaces/interface.contactTel';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';

@Component({
  selector: 'app-tel-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent,CommonModule],
  templateUrl: './tel-post.component.html',
  styleUrl: './tel-post.component.css',
  providers: [ServiceService]

})
export class TelPostComponent implements OnInit {
  tels: ContactTel[] = [];
  showForm = false;
  isEditing = false;
  currentTel: ContactTel = new ContactTel(0, '', '');
  selectedFile: File | null = null;

  constructor(private TelService: ServiceService) {}

  ngOnInit(): void {
    this.loadTels();
  }

  loadTels(): void {
    this.TelService.getContactsTel().subscribe(data => {
      this.tels = data;
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentTel = new ContactTel(0, '', '');
    this.selectedFile = null;
  }

  onEdit(tel: ContactTel): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentTel = Object.assign({}, tel);
    this.selectedFile = null;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.isEditing) {

    } else {
      const formData = new FormData();

      formData.append('tel', this.currentTel.tel);
      formData.append('name', this.currentTel.name);

      this.TelService.createTel(formData).subscribe(() => {
        this.loadTels();
      });
    }
    this.closeForm();
  }

  saveTel(): void {
    const updatedTel: Partial<ContactTel> = {
      tel: this.currentTel.tel,
      name: this.currentTel.name,
    };

    if (this.isEditing) {
      this.TelService.updateTel(this.currentTel.id, updatedTel).subscribe(() => {
        this.loadTels();
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this partner?')) {
      this.TelService.deleteTel(id).subscribe(() => {
        this.loadTels();
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }
}
