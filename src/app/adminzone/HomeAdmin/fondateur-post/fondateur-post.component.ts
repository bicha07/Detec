import { Component, OnInit } from '@angular/core';
 // Assure-toi d'avoir un service approprié
import { Personne } from '../../../website/interfaces/interface.personne';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';

@Component({
    selector: 'app-fondateur-post',
    standalone: true,
    templateUrl: './fondateur-post.component.html',
    styleUrls: ['./fondateur-post.component.css'],
    providers: [ServiceService],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent]
})
export class FondateurPostComponent implements OnInit {
  personne: Personne[] = [];
  showForm = false;
  isEditing = false;
  currentPersonne: Personne = new Personne(0, '', '', '', '');
  selectedFile: File | null = null;
  baseUrl : String;


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
      this.teamService.createPersonne(formData).subscribe(() => {
        this.loadTeam();
      });
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
    this.teamService.updatePersonne(id, updatedPersonne).subscribe(() => {
      this.loadTeam();
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this team member?')) {
      this.teamService.deletePersonne(id).subscribe(() => {
        this.loadTeam();
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }
}
