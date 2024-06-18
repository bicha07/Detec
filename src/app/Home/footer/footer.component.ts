import { Component } from '@angular/core';
import { Partner } from '../../interfaces/interface.partner';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  partners: Partner[] = []; // Utilisez l'interface Category pour typer le tableau

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getPartners().subscribe(data => {
      this.partners = data;
    });
  }

  // Method to update the content dynamically
  updatePartnersContent(updatedData: any): void {
    this.partners = updatedData.partners;
  }
}