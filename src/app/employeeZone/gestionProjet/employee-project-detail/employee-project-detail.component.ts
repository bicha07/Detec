import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { ServiceService } from '../../../website/service.service';
import { EmployeeDailyPrice } from '../../../website/interfaces/interface.employeedailyprice';

@Component({
  selector: 'app-employee-project-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-project-detail.component.html',
  styleUrls: ['./employee-project-detail.component.css']
})
export class EmployeeProjectDetailComponent implements OnInit {
  dailyPrices: EmployeeDailyPrice[] = [];
  dateControl = new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
  projectId!: number;

  constructor(private serviceService: ServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.loadPricesForDate();
  }

  loadPricesForDate(): void {
    if (this.dateControl.value) {
      this.serviceService.getEmployeeDailyPricesByProject(this.projectId, this.dateControl.value)
        .subscribe(dailyPrices => {
          this.dailyPrices = dailyPrices;
        });
    }
  }

  loadPreviousDay(): void {
    const currentDate = new Date(this.dateControl.value!);
    currentDate.setDate(currentDate.getDate() - 1);
    this.dateControl.setValue(formatDate(currentDate, 'yyyy-MM-dd', 'en'));
    this.loadPricesForDate();
  }

  loadNextDay(): void {
    const currentDate = new Date(this.dateControl.value!);
    currentDate.setDate(currentDate.getDate() + 1);
    this.dateControl.setValue(formatDate(currentDate, 'yyyy-MM-dd', 'en'));
    this.loadPricesForDate();
  }

  calculateTotalAmount(): number {
    return this.dailyPrices.reduce((total, price) => total + Number(price.daily_price), 0);
  }

  calculateTotalHeures(): number {
    return this.dailyPrices.reduce((total, price) => total + Number(price.heure), 0);
  }
}




// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Project } from '../../../website/interfaces/interface.project'; // Assurez-vous d'avoir un modèle de projet
// import { ServiceService } from '../../../website/service.service'; // Votre service qui appelle l'API
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-employee-projects',
//   standalone: true,
//   templateUrl: './new-project.component.html',
//   styleUrls: ['./new-project.component.css'],
//   imports: [CommonModule,RouterModule] // Ajoutez ici les modules nécessaires
// })
// export class EmployeeProjectsComponent implements OnInit {
//   newProjects: Project[] = [];

//   constructor(private projectService: ServiceService) {}

//   ngOnInit(): void {
//     this.loadNewProjects();
//   }

//   loadNewProjects(): void {
//     this.projectService.getProjects().subscribe(projects => {
//       this.newProjects = projects.filter(project => project.status === 'en attente' || project.status === 'en cours');
//     });
//   }
// }