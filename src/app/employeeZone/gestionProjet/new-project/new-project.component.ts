import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../website/interfaces/interface.project'; // Assurez-vous d'avoir un modèle de projet
import { ServiceService } from '../../../website/service.service'; // Votre service qui appelle l'API
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-projects',
  standalone: true,
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
  imports: [CommonModule] // Ajoutez ici les modules nécessaires
})
export class EmployeeProjectsComponent implements OnInit {
  projects$: Observable<Project[]> | undefined; // Utilisation d'un Observable pour la réactivité

  constructor(private projectService: ServiceService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    // Cette méthode suppose que vous avez un moyen d'obtenir l'ID de l'employé connecté
    const employeeId = 1; // Remplacer par le mécanisme d'authentification pour obtenir l'ID de l'employé
    this.projects$ = this.projectService.getProjectsForEmployee(employeeId);
  }
}
