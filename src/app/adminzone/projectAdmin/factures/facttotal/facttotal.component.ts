import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../../../../website/service.service';
import { Facture } from '../../../../website/interfaces/interface.facture';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facttotal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facttotal.component.html',
  styleUrls: ['./facttotal.component.css']
})
export class FacttotalComponent implements OnInit {
  @Input() projectId!: number; // Ajoutez cette ligne pour recevoir l'ID du projet
  facture: Facture = { 
    id: 0, 
    num_facture: 0, 
    project_id: 0, 
    charges: [], 
    total_main_oeuvre: 0 ,
    total_heure_ouvrable:0,
  }; // Initialisez facture avec des valeurs par défaut
  subtotal: number = 0;

  constructor(private factureService: ServiceService) {}

  ngOnInit() {
    this.loadFacture();
  }

  loadFacture() {
    this.factureService.getFactureSinceStart(this.projectId).subscribe(data => { // Utilisez this.projectId ici
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
