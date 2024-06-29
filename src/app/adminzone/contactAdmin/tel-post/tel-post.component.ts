import { Component, OnInit } from '@angular/core';
import { ContactTel } from '../../../website/interfaces/interface.contactTel';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';

@Component({
  selector: 'app-tel-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './tel-post.component.html',
  styleUrls: ['./tel-post.component.css'],
  providers: [ServiceService]
})
export class TelPostComponent implements OnInit {
  tels: ContactTel[] = [];
  showForm = false;
  isEditing = false;
  currentTel: ContactTel = new ContactTel(0, '', '');

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
  }

  onEdit(tel: ContactTel): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentTel = { ...tel };
  }

  onSubmit(): void {
    const formData = new ContactTel( this.currentTel.id,this.currentTel.tel,this.currentTel.name);

    if (this.isEditing) {
      this.TelService.updateTel(this.currentTel.id, formData).subscribe(() => {
        this.loadTels();
      });
    } else {
      this.TelService.createTel(formData).subscribe(() => {
        this.loadTels();
      });
    }
    this.closeForm();
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.TelService.deleteTel(id).subscribe(() => {
        this.loadTels();
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }
}
