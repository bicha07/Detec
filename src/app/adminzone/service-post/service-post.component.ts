import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../website/service.service';
import { Expertise } from '../../website/interfaces/interface.expertise';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './service-post.component.html',
  styleUrls: ['./service-post.component.css'],
  providers: [ServiceService]
})
export class ServicePostComponent implements OnInit {
  expertises: Expertise[] = [];
  showForm = false;
  isEditing = false;
  currentExpertise: Expertise = { id: 0, photo: '', title: '', recap: '' };
  selectedFile: File | null = null;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadExpertises();
  }

  loadExpertises(): void {
    this.serviceService.getExpertises().subscribe(data => {
      this.expertises = data;
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentExpertise = { id: 0, photo: '', title: '', recap: '' };
    this.selectedFile = null; // Reset the selected file
  }

  onEdit(expertise: Expertise): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentExpertise = { ...expertise };
    this.selectedFile = null; // Reset the selected file

  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.isEditing) {
      if (this.selectedFile) {
        this.serviceService.uploadFile(this.selectedFile).subscribe(response => {
          this.currentExpertise.photo = response.path;
          this.saveExpertise();
        });
      } else {
        this.saveExpertise();
      }
    } else {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }
      formData.append('title', this.currentExpertise.title);
      formData.append('recap', this.currentExpertise.recap);
      this.serviceService.createExpertise(formData).subscribe(() => {
        this.loadExpertises();
      });
    }
    this.closeForm();
  }

  saveExpertise(): void {
    const updatedExpertise: Partial<Expertise> = {
      title: this.currentExpertise.title,
      recap: this.currentExpertise.recap,
      photo: this.selectedFile ? this.currentExpertise.photo : "empty" // Set photo to null if no file selected
    };

    if (this.isEditing) {
      this.updateExpertise(this.currentExpertise.id, updatedExpertise);
    }
  }

  addExpertise(newExpertise: FormData): void {
    this.serviceService.createExpertise(newExpertise).subscribe(() => {
      this.loadExpertises();
    });
  }

  updateExpertise(id: number, updatedExpertise: Partial<Expertise>): void {
    this.serviceService.updateExpertise(id, updatedExpertise).subscribe(() => {
      this.loadExpertises();
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this expertise?')) {
      this.serviceService.deleteExpertise(id).subscribe(() => {
        this.loadExpertises();
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }
}
