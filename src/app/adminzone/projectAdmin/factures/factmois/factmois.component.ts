import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../../../../website/service.service';
import { Facture } from '../../../../website/interfaces/interface.facture';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factmois',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factmois.component.html',
  styleUrl: './factmois.component.css'
})
export class FactmoisComponent implements OnInit {

  @Input() projectId!: number; // Ajoutez cette ligne pour recevoir l'ID du projet
  facture!: Facture;
  subtotal: number = 0;

  constructor(private factureService: ServiceService) {}

  ngOnInit() {
    this.loadFacture();
  }

  loadFacture() {
    this.factureService.getFacturePreviousMonth(this.projectId).subscribe(data => { // Utilisez this.projectId ici
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
