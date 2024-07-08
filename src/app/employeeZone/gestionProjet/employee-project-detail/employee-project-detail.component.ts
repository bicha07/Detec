import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { ServiceService } from '../../../website/service.service';
import { EmployeeDailyPrice } from '../../../website/interfaces/interface.employeedailyprice';
import { LoginService } from '../../../registration/login.service'; // Ajustez le chemin selon vos besoins

@Component({
  selector: 'app-employee-project-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-project-detail.component.html',
  styleUrls: ['./employee-project-detail.component.css']
})
export class EmployeeProjectDetailComponent implements OnInit {
  dailyPrices: EmployeeDailyPrice[] = [];
  filteredDailyPrices: EmployeeDailyPrice[] = [];
  dateControl = new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
  projectId!: number;

  constructor(private serviceService: ServiceService, private loginService: LoginService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.loadPricesForDate();
  }

  loadPricesForDate(): void {
    const currentUser = this.loginService.currentUserValue;
    if (this.dateControl.value && currentUser) {
      this.serviceService.getEmployeeDailyPricesByProject(this.projectId, this.dateControl.value)
        .subscribe(dailyPrices => {
          this.dailyPrices = dailyPrices;
          this.filteredDailyPrices = this.dailyPrices.filter(price => price.personne_id === currentUser.id);
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
    return this.filteredDailyPrices.reduce((total, price) => total + Number(price.daily_price), 0);
  }

  calculateTotalHeures(): number {
    return this.filteredDailyPrices.reduce((total, price) => total + Number(price.heure), 0);
  }
}
