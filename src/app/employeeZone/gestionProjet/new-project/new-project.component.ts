
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../../../website/service.service';
import { Project } from '../../../website/interfaces/interface.project';
import { LoginService } from '../../../registration/login.service'; // Ajustez le chemin selon vos besoins

@Component({
  selector: 'app-employee-projects',
  standalone: true,
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
  imports: [CommonModule,RouterModule] // Ajoutez ici les modules nécessaires
})
export class EmployeeProjectsComponent implements OnInit {
  newProjects: Project[] = [];
  filteredProjects: Project[] = [];
  baseUrl: string;


  constructor(private projectService: ServiceService, private loginService: LoginService) {
    this.baseUrl = this.projectService.apiUrlbase;
  }

  ngOnInit(): void {
    this.loadNewProjects();
  }

  loadNewProjects(): void {
    const currentUser = this.loginService.currentUserValue;
    if (currentUser) {
      this.projectService.getProjects().subscribe(projects => {
        this.newProjects = projects.filter(project => project.status === 'en attente' || project.status === 'en cours');
        this.filteredProjects = this.newProjects.filter(project =>
          project.employees.some(employee => employee.id === currentUser.id)
        );
      });
    }
  }
}
