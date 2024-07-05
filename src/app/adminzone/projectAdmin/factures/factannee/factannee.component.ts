import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../../website/service.service';
import { Facture } from '../../../../website/interfaces/interface.facture';
import { Charge } from '../../../../website/interfaces/interface.charges';
import { EmployeeDailyPrice } from '../../../../website/interfaces/interface.employeedailyprice';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-factannee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factannee.component.html',
  styleUrl: './factannee.component.css'
})
export class FactanneeComponent implements OnInit {


    facture!: Facture;
    subtotal: number = 0;
  
    constructor(private factureService: ServiceService) {}
  
    ngOnInit() {
      this.loadFacture();
    }
  
    loadFacture() {
      const projectId = 3; // Exemple de project ID, à adapter selon votre logique
      this.factureService.getFacturePreviousYear(projectId).subscribe(data => {
        this.facture = {
          ...data,
          total_main_oeuvre: +data.total_main_oeuvre // Convertir en nombre si nécessaire
        };
        this.calculateSubtotal();
      });
    }
  
    calculateSubtotal() {
      this.subtotal = this.facture.charges.reduce((acc, charge) => acc + parseFloat(charge.price), 0) +
                      this.facture.total_main_oeuvre;
    }
  }