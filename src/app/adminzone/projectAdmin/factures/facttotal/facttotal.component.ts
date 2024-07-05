import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../../website/service.service';
import { Facture } from '../../../../website/interfaces/interface.facture';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facttotal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facttotal.component.html',
  styleUrls: ['./facttotal.component.css'] // Assurez-vous que 'styleUrls' est correct
})
export class FacttotalComponent implements OnInit {
  facture: Facture = { 
    id: 0, 
    num_facture: 0, 
    project_id: 0, 
    charges: [], 
    total_main_oeuvre: 0 
  }; // Initialisez facture avec des valeurs par défaut
  subtotal: number = 0;

  constructor(private factureService: ServiceService) {}

  ngOnInit() {
    this.loadFacture();
  }

  loadFacture() {
    const projectId = 3; // Exemple de project ID, à adapter selon votre logique
    this.factureService.getFactureSinceStart(projectId).subscribe(data => {
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
