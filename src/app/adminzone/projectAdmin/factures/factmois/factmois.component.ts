import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../../website/service.service';
import { Facture } from '../../../../website/interfaces/interface.facture';
import { Charge } from '../../../../website/interfaces/interface.charges';
import { EmployeeDailyPrice } from '../../../../website/interfaces/interface.employeedailyprice';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-factmois',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factmois.component.html',
  styleUrl: './factmois.component.css'
})
  export class FactmoisComponent implements OnInit {

    facture!: Facture;
    subtotal: number = 0;
  
    constructor(private factureService: ServiceService) {}
  
    ngOnInit() {
      this.loadFacture();
    }
  
    loadFacture() {
      const projectId = 1; // Exemple de project ID, à adapter selon votre logique
      this.factureService.getFacturePreviousMonth(projectId).subscribe(data => {
        this.facture = {
          ...data,
          total_main_oeuvre: +data.total_main_oeuvre // Convertir en nombre si nécessaire
        };
        this.calculateSubtotal();
      });
    }
  
    calculateSubtotal() {
      this.subtotal = this.facture.total_charges.reduce((acc, charge) => acc + parseFloat(charge.price), 0) +
                      this.facture.total_main_oeuvre;
    }
  }