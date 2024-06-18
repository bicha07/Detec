import { Component } from '@angular/core';
import { Partner } from '../../interfaces/interface.partner';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
import { ContactTel } from '../../interfaces/interface.contactTel';
import { ContactEmail } from '../../interfaces/interface.contactEmail';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  contactstel: ContactTel[] = []; // Utilisez l'interface Category pour typer le tableau
  contactsemail: ContactEmail[] = [];
  partners: Partner[] = []; // Utilisez l'interface Category pour typer le tableau

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getPartners().subscribe(data => {
      this.partners = data;
    this.serviceService.getContactsTel().subscribe(data => {
        this.contactstel = data;
      });
    this.serviceService.getContactsEmail().subscribe(data => {
        this.contactsemail = data;
      });
    });    

  }

  // Method to update the content dynamically
  updatePartnersContent(updatedData: any): void {
    this.partners = updatedData.partners;
  }
// Method to update the content dynamically
  updateContactTelContent(updatedData: any): void {
    this.contactstel = updatedData.contactstel;
  } 
  updateContactEmailContent(updatedData: any): void {
    this.contactsemail = updatedData.contactsemail;
}

}
