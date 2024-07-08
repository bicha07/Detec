import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../website/interfaces/interface.project'; // Assurez-vous d'avoir un modèle de projet
import { ServiceService } from '../../../website/service.service'; // Votre service qui appelle l'API
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-projects',
  standalone: true,
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
  imports: [CommonModule,RouterModule] // Ajoutez ici les modules nécessaires
})
export class EmployeeProjectsComponent implements OnInit {
  newProjects: Project[] = [];

  constructor(private projectService: ServiceService) {}

  ngOnInit(): void {
    this.loadNewProjects();
  }

  loadNewProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.newProjects = projects.filter(project => project.status === 'en attente' || project.status === 'en cours');
    });
  }
}