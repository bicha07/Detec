import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../website/service.service'; // Assurez-vous que le chemin d'accès est correct
import { Project } from '../../../website/interfaces/interface.project'; // Ajustez le chemin selon vos besoins
import { User } from '../../../website/interfaces/interface.user'; // Ajustez le chemin selon vos besoins
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-post',
  standalone: true,
  templateUrl: './project-post.component.html',
  styleUrls: ['./project-post.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink]
})
export class ProjectPostComponent implements OnInit {
  projects: Project[] = [];
  users: User[] = [];
  showForm = false;
  isEditing = false;
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
      chef_id: ['', Validators.required],
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
    this.projectForm.reset(); // Réinitialiser le formulaire
    this.employees.clear(); // Vider la liste des employés
    this.selectedFile = null;
  }

  onEdit(project: Project): void {
    this.showForm = true;
    this.isEditing = true;
    this.projectForm.patchValue({
      name: project.name,
      chef_id: project.chef_id,
      progress: project.progress,
      status: project.status,
      start_date: project.start_date,
      end_date: project.end_date
    });
    this.employees.clear();
    project.employees.forEach(emp => {
      this.addEmployeeField();
      this.employees.at(this.employees.length - 1).patchValue({ employee: emp });
    });
    this.selectedFile = null;
  }

  onSubmit(): void {
    const formValues = this.projectForm.value;

    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('chef_id', formValues.chef_id);
    formData.append('progress', formValues.progress);
    formData.append('status', formValues.status);
    formData.append('start_date', formValues.start_date);
    formData.append('end_date', formValues.end_date);

    const employees = formValues.employees.map((control: { employee: any; }) => control.employee);
    formData.append('employees', JSON.stringify(employees));

    if (this.isEditing) {
      this.updateProject(this.projectForm.value.id, formData); // Assurez-vous que le formulaire contient l'ID du projet lors de l'édition
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

  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: MouseEvent) {
  //   const modalContent = document.querySelector('.modal-content');
  //   const target = event.target as HTMLElement;
  //   if (this.showForm && modalContent && !modalContent.contains(target)) {
  //     this.closeForm();
  //   }
  // }
}
