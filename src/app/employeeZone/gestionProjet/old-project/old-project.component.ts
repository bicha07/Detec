// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Project } from '../../../website/interfaces/interface.project'; // Assurez-vous d'avoir un modèle de projet
// import { ServiceService } from '../../../website/service.service'; // Votre service qui appelle l'API
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-old-project',
//   standalone: true,
//   imports: [CommonModule,RouterModule],
//   templateUrl: './old-project.component.html',
//   styleUrl: './old-project.component.css'
// })
// export class OldProjectComponent {
//   oldProjects: Project[] = [];

//   constructor(private projectService: ServiceService) {}

//   ngOnInit(): void {
//     this.loadOldProjects();
//   }

//   loadOldProjects(): void {
//     this.projectService.getProjects().subscribe(projects => {
//       this.oldProjects = projects.filter(project => project.status === 'fini');
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../../../website/service.service';
import { Project } from '../../../website/interfaces/interface.project';
import { LoginService } from '../../../registration/login.service'; // Ajustez le chemin selon vos besoins

@Component({
  selector: 'app-old-project',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './old-project.component.html',
  styleUrls: ['./old-project.component.css']
})
export class OldProjectComponent implements OnInit {
  oldProjects: Project[] = [];
  filteredProjects: Project[] = [];

  constructor(private projectService: ServiceService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadOldProjects();
  }

  loadOldProjects(): void {
    const currentUser = this.loginService.currentUserValue;
    if (currentUser) {
      this.projectService.getProjects().subscribe(projects => {
        this.oldProjects = projects.filter(project => project.status === 'fini');
        this.filteredProjects = this.oldProjects.filter(project =>
          project.employees.some(employee => employee.id === currentUser.id)
        );
      });
    }
  }
}
