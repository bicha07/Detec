import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Pack } from '../../interfaces/interface.pack';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent implements OnInit {
  packs: Pack[] = []; // Utilisez l'interface Category pour typer le tableau

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getPacks().subscribe(data => {
      this.packs = data;
      console.log("hhhhh");
    });
  }

  // Method to update the content dynamically
  updatePackContent(updatedData: any): void {
    this.packs = updatedData.packs;
  }
}
