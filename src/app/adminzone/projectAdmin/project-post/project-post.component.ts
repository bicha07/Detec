import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../website/service.service';
import { Project } from '../../../website/interfaces/interface.project';
import { User } from '../../../website/interfaces/interface.user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../../alert/alert.component';

@Component({
  selector: 'app-project-post',
  standalone: true,
  templateUrl: './project-post.component.html',
  styleUrls: ['./project-post.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, AlertComponent]
})
export class ProjectPostComponent implements OnInit {
  projects: Project[] = [];
  users: User[] = [];
  showForm = false;
  isEditing = false;
  selectedFile: File | null = null;
  projectForm!: FormGroup;
  baseUrl: string;

  alertType: string = '';
  alertMessage: string = '';

  constructor(private projectService: ServiceService, private fb: FormBuilder) {
    this.baseUrl = this.projectService.apiUrlbase;

    this.createForm();
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadEmployees();
  }

  createForm() {
    this.projectForm = this.fb.group({
      id: [null],  // Include the id field in the form group
      name: ['', Validators.required],
      chef_id: ['', Validators.required],
      progress: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      employees: this.fb.array([])
    });
  }

  get employees(): FormArray {
    return this.projectForm.get('employees') as FormArray;
  }

  addEmployeeField(employee?: User): void {
    const employeeControl = this.fb.group({
      employee: [employee ? employee.id : null, Validators.required],
      employee_name: [{ value: employee ? employee.username : '', disabled: true }]  // Nom désactivé
    });
    this.employees.push(employeeControl);
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
      id: project.id,
      name: project.name,
      chef_id: project.chef_id,
      progress: project.progress,
      status: project.status,
      start_date: project.start_date,
      end_date: project.end_date,
      description: project.description
    });
    this.employees.clear();  // Nettoyer les entrées existantes pour éviter les doublons

    // Ajout des employés existants dans le FormArray
    project.employees.forEach(emp => {
      const employeeGroup = this.fb.group({
        employee: [emp.id, Validators.required],
        employee_name: [{ value: emp.username, disabled: true }]  // Correctement désactivé ici
      });
      this.employees.push(employeeGroup);
    });
  }

  onSubmit(): void {
    const formValues = this.projectForm.value;

    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('chef_id', formValues.chef_id);
    formData.append('progress', formValues.progress);
    formData.append('status', formValues.status);
    formData.append('description', formValues.description);
    formData.append('start_date', formValues.start_date);
    formData.append('end_date', formValues.end_date);

    const employees = formValues.employees.map((control: { employee: any; }) => control.employee);
    formData.append('employees', JSON.stringify(employees));

    if (this.isEditing) {
      formData.append('_method', 'PUT'); // Indicate the intended method
      this.updateProject(formValues.id, formData); // Use the id from formValues
    } else {
      this.addProject(formData);
    }
    this.closeForm();
  }

  addProject(newProject: FormData): void {
    this.projectService.createProject(newProject).subscribe(
      () => {
        this.loadProjects();
        this.setAlert('success', 'Projet ajouté avec succès.');
      },
      error => {
        this.setAlert('danger', 'Erreur lors de l\'ajout du projet.');
      }
    );
  }

  updateProject(id: number, updatedProject: FormData): void {
    this.projectService.updateProject(id, updatedProject).subscribe(
      () => {
        this.loadProjects();
        this.setAlert('primary', 'Projet mis à jour avec succès.');
      },
      error => {
        this.setAlert('danger', 'Erreur lors de la mise à jour du projet.');
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectService.deleteProject(id).subscribe(
        () => {
          this.loadProjects();
          this.setAlert('danger', 'Projet supprimé avec succès.');
        },
        error => {
          this.setAlert('danger', 'Erreur lors de la suppression du projet.');
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
