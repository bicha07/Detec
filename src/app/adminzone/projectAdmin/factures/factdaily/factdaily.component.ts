import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../../../../website/service.service';
import { Project } from '../../../../website/interfaces/interface.project';
import { EmployeeDailyPrice } from '../../../../website/interfaces/interface.employeedailyprice';
import { Charge } from '../../../../website/interfaces/interface.charges';
import { User } from '../../../../website/interfaces/interface.user';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-factdaily',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './factdaily.component.html',
  styleUrl: './factdaily.component.css'
})
export class FactdailyComponent implements OnInit {
  project!: Project;
  employees: EmployeeDailyPrice[] = [];
  charges: Charge[] = [];
  allUsers: User[] = [];
  employeeForm: FormGroup;
  chargeForm: FormGroup;
  showEmployeeForm = false;
  showChargeForm = false;
  editingEmployeeId: number | null = null;
  selectedEmployeeId: number | null = null;
  editingChargeId: number | null = null;
  dateControl = new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')); // Initialize with today's date

  constructor(private serviceService: ServiceService, private route: ActivatedRoute) {
    this.employeeForm = new FormGroup({
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
    this.loadEmployeeDailyPrices(projectId, this.dateControl.value!); // Use non-null assertion
    this.loadAllUsers();
  }

  loadEmployeeDailyPrices(projectId: number, date: string): void {
    this.serviceService.getEmployeeDailyPricesByProject(projectId, date).subscribe(employees => {
      this.employees = employees;
    });
  }

  loadAllUsers(): void {
    this.serviceService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  loadPreviousDay(): void {
    const currentDate = new Date(this.dateControl.value!); // Use non-null assertion
    currentDate.setDate(currentDate.getDate() - 1);
    this.dateControl.setValue(formatDate(currentDate, 'yyyy-MM-dd', 'en'));
    this.loadEmployeeDailyPrices(this.project.id, this.dateControl.value!); // Use non-null assertion
  }

  loadNextDay(): void {
    const currentDate = new Date(this.dateControl.value!); // Use non-null assertion
    currentDate.setDate(currentDate.getDate() + 1);
    this.dateControl.setValue(formatDate(currentDate, 'yyyy-MM-dd', 'en'));
    this.loadEmployeeDailyPrices(this.project.id, this.dateControl.value!); // Use non-null assertion
  }

  loadPricesForDate(): void {
    if (this.dateControl.value) {
      this.loadEmployeeDailyPrices(this.project.id, this.dateControl.value); // Use type narrowing
    }
  }

  onAddEmployeeSalary(employee: EmployeeDailyPrice) {
    this.showEmployeeForm = true;
    this.selectedEmployeeId = employee.personne_id;
    this.employeeForm.reset();
  }

  onEditEmployee(employee: EmployeeDailyPrice) {
    this.showEmployeeForm = true;
    this.editingEmployeeId = employee.id;
    this.selectedEmployeeId = employee.personne_id; // Ensure selectedEmployeeId is set for editing
    this.employeeForm.setValue({
      dailyPrice: employee.daily_price
    });
  }

  onSaveEmployee() {
    if (this.employeeForm.valid) {
      const employeeData = {
        project_id: this.project.id,
        personne_id: this.selectedEmployeeId!, // Include personne_id in the payload
        daily_price: this.employeeForm.value.dailyPrice,
        date: this.dateControl.value! // Use non-null assertion
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
          const index = this.employees.findIndex(emp => emp.personne_id === this.selectedEmployeeId);
          this.employees[index] = { ...this.employees[index], ...employeeData };
          this.employeeForm.reset();
          this.showEmployeeForm = false;
        });
      }
    }
  }

  onDeleteEmployee(employeeId: number) {
    this.serviceService.deleteEmployeeDailyPrice(employeeId).subscribe(() => {
      const index = this.employees.findIndex(emp => emp.id === employeeId);
      if (index !== -1) {
        this.employees[index].daily_price = 'Non assigné';
      }
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
    this.selectedEmployeeId = null;
  }

  closeChargeForm() {
    this.showChargeForm = false;
    this.editingChargeId = null;
  }

  calculateTotalSalaries() {
    return this.employees.reduce((total, emp) => total + Number(emp.daily_price || 0), 0);
  }
  
  calculateTotalHeures() {
    return this.employees.reduce((total, emp) => total + Number(emp.heure || 0), 0);
  }

  calculateTotalCharges() {
    return this.charges.reduce((total, charge) => total + Number(charge.price), 0);
  }
}
