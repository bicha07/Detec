import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../website/service.service'; // Assurez-vous que le chemin d'accès est correct
import { Project } from '../../../website/interfaces/interface.project'; // Ajustez le chemin selon vos besoins
import { Charge } from '../../../website/interfaces/interface.charges';// Ajustez le chemin selon vos besoins
import { User } from '../../../website/interfaces/interface.user'; // Ajustez le chemin selon vos besoins
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-post',
  standalone: true,
  templateUrl: './project-post.component.html',
  styleUrls: ['./project-post.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProjectPostComponent implements OnInit {
  projects: Project[] = [];
  users: User[] = [];
  showForm = false;
  isEditing = false;
  currentProject: Project = new Project(0, '', '', '', '', '', '', '', [], []);
  selectedFile: File | null = null;
  projectForm!: FormGroup;

  constructor(private projectService: ServiceService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadEmployees();
  }

  createForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      name_chef: ['', Validators.required],
      photo_chef: ['', Validators.required],
      progress: ['', Validators.required],
      status: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      employees: this.fb.array([]),
      charges: this.fb.array([])
    });
  }

  get employees(): FormArray {
    return this.projectForm.get('employees') as FormArray;
  }

  addEmployeeField(): void {
    if (this.employees.length < this.users.length) {
      const employeeControl = this.fb.group({
        employee: [null, Validators.required]
      });
      this.employees.push(employeeControl);
    } else {
      alert('Vous avez atteint le nombre maximum d\'employés disponibles.');
    }
  }

  removeEmployeeField(index: number): void {
    this.employees.removeAt(index);
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  loadEmployees(): void {
    this.projectService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentProject = new Project(0, '', '', '', '', '', '', '', [], []);
    this.selectedFile = null;
  }

  onEdit(project: Project): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentProject = { ...project };
    this.selectedFile = null;
    this.currentProject = JSON.parse(JSON.stringify(project));
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.currentProject.name);
    formData.append('name_chef', this.currentProject.name_chef);
    formData.append('photo_chef', this.selectedFile ? this.selectedFile.name : this.currentProject.photo_chef);
    formData.append('progress', this.currentProject.progress);
    formData.append('status', this.currentProject.status);
    formData.append('start_date', this.currentProject.start_date);
    formData.append('end_date', this.currentProject.end_date);

    // Ajouter les employés
    const employees = this.employees.controls.map(control => control.value.employee);
    formData.append('employees', JSON.stringify(employees));

    if (this.isEditing) {
      this.updateProject(this.currentProject.id, formData);
    } else {
      this.addProject(formData);
    }
    this.closeForm();
  }

  addProject(newProject: FormData): void {
    this.projectService.createProject(newProject).subscribe(() => {
      this.loadProjects();
    });
  }

  updateProject(id: number, updatedProject: FormData): void {
    this.projectService.updateProject(id, updatedProject).subscribe(() => {
      this.loadProjects();
    });
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }
}