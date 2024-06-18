import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import {  ContactTel } from '../../interfaces/interface.contactTel';
import { ContactEmail } from '../../interfaces/interface.contactEmail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  contactstel: ContactTel[] = []; // Utilisez l'interface Category pour typer le tableau
  contactsemail: ContactEmail[] = [];
  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getContactsTel().subscribe(data => {
      this.contactstel = data;
    });
    this.serviceService.getContactsEmail().subscribe(data => {
      this.contactsemail = data;
    });
  }

  // Method to update the content dynamically
  updateContactTelContent(updatedData: any): void {
    this.contactstel = updatedData.contactstel;
  } 
   updateContactEmailContent(updatedData: any): void {
    this.contactsemail = updatedData.contactsemail;
  }
}
