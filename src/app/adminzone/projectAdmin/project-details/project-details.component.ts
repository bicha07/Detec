import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../../../website/service.service';
import { Project } from '../../../website/interfaces/interface.project';
import { EmployeeDailyPrice } from '../../../website/interfaces/interface.employeedailyprice';
import { Charge } from '../../../website/interfaces/interface.charges';
import { User } from '../../../website/interfaces/interface.user';
import { FactdailyComponent } from "../factures/factdaily/factdaily.component";
import { FactmoisComponent } from "../factures/factmois/factmois.component";
import { FactanneeComponent } from "../factures/factannee/factannee.component";
import { FacttotalComponent } from "../factures/facttotal/facttotal.component";

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FactdailyComponent, FactmoisComponent, FactanneeComponent, FacttotalComponent]
})
export class ProjectDetailComponent implements OnInit {

  activeTab: 'factdaily'|'factmois'|'factannee'|'facttotal' = 'factdaily';

  project: Project = {
    id: 0, name: '', charges: [],
    name_chef: '',
    photo_chef: '',
    chef_id: 0,
    progress: '',
    status: '',
    start_date: '',
    end_date: '',
    employees: []
  }; // Initialisation avec des valeurs par défaut
  employees: EmployeeDailyPrice[] = [];
  charges: Charge[] = [];
  allUsers: User[] = [];  // List of all users for the dropdown

  employeeForm: FormGroup;
  chargeForm: FormGroup;
  showEmployeeForm = false;
  showChargeForm = false;
  editingEmployeeId: number | null = null;
  editingChargeId: number | null = null;
  dateControl: any;

  constructor(private serviceService: ServiceService, private route: ActivatedRoute) {
    this.employeeForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      dailyPrice: new FormControl('', [Validators.required])
    });
    this.chargeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.serviceService.getProjectById(projectId).subscribe(project => {
      this.project = project;
      this.charges = project.charges;
    });
    this.loadEmployeeDailyPrices(projectId);
    this.loadAllUsers();
  }

  loadEmployeeDailyPrices(projectId: number): void {
    this.serviceService.getEmployeeDailyPricesByProject(projectId,this.dateControl.value).subscribe(employees => {
      this.employees = employees;
    });
  }

  loadAllUsers(): void {
    this.serviceService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  onAddEmployee() {
    this.showEmployeeForm = true;
    this.editingEmployeeId = null;
    this.employeeForm.reset();
  }

  onEditEmployee(employee: EmployeeDailyPrice) {
    this.showEmployeeForm = true;
    this.editingEmployeeId = employee.id;
    this.employeeForm.setValue({
      userId: employee.personne_id,
      dailyPrice: employee.daily_price
    });
  }

  onSaveEmployee() {
    if (this.employeeForm.valid) {
      const employeeData = {
        project_id: this.project.id,
        personne_id: this.employeeForm.value.userId,
        daily_price: this.employeeForm.value.dailyPrice
      };

      if (this.editingEmployeeId) {
        this.serviceService.updateEmployeeDailyPrice(this.editingEmployeeId, employeeData).subscribe(() => {
          const index = this.employees.findIndex(emp => emp.id === this.editingEmployeeId);
          this.employees[index] = { ...this.employees[index], ...employeeData };
          this.editingEmployeeId = null;
          this.employeeForm.reset();
          this.showEmployeeForm = false;
        });
      } else {
        this.serviceService.createEmployeeDailyPrice(employeeData).subscribe(employee => {
          this.employees.push(employee);
          this.employeeForm.reset();
          this.showEmployeeForm = false;
        });
      }
    }
  }

  onDeleteEmployee(employeeId: number) {
    this.serviceService.deleteEmployeeDailyPrice(employeeId).subscribe(() => {
      this.employees = this.employees.filter(emp => emp.id !== employeeId);
    });
  }

  onAddCharge() {
    this.showChargeForm = true;
    this.editingChargeId = null;
    this.chargeForm.reset();
  }

  onEditCharge(charge: Charge) {
    this.showChargeForm = true;
    this.editingChargeId = charge.id;
    this.chargeForm.setValue({
      name: charge.name,
      price: charge.price
    });
  }

  onSaveCharge() {
    if (this.chargeForm.valid) {
      const chargeData = {
        project_id: this.project.id,
        name: this.chargeForm.value.name,
        price: this.chargeForm.value.price
      };

      if (this.editingChargeId) {
        this.serviceService.updateCharge(this.editingChargeId, chargeData).subscribe(() => {
          const index = this.charges.findIndex(chg => chg.id === this.editingChargeId);
          this.charges[index] = { ...this.charges[index], ...chargeData };
          this.editingChargeId = null;
          this.chargeForm.reset();
          this.showChargeForm = false;
        });
      } else {
        this.serviceService.createCharge(chargeData).subscribe(charge => {
          this.charges.push(charge);
          this.chargeForm.reset();
          this.showChargeForm = false;
        });
      }
    }
  }

  onDeleteCharge(chargeId: number) {
    this.serviceService.deleteCharge(chargeId).subscribe(() => {
      this.charges = this.charges.filter(chg => chg.id !== chargeId);
    });
  }

  closeEmployeeForm() {
    this.showEmployeeForm = false;
    this.editingEmployeeId = null;
  }

  closeChargeForm() {
    this.showChargeForm = false;
    this.editingChargeId = null;
  }

  calculateTotalSalaries() {
    return this.employees.reduce((total, emp) => total + Number(emp.daily_price), 0);
  }

  calculateTotalCharges() {
    return this.charges.reduce((total, charge) => total + Number(charge.price), 0);
  }
}
