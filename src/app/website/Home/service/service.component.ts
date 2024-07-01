
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../service.service'; // Assurez-vous que le chemin est correct
import { Expertise } from '../../interfaces/interface.expertise'; // Importez l'interface Category
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-service',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule,HttpClientModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  expertises: Expertise[] = []; // Utilisez l'interface Category pour typer le tableau
  baseUrl : String;
  constructor(private serviceService: ServiceService) { 
    this.baseUrl = this.serviceService.apiUrlbase;

  }

  ngOnInit(): void {
    this.serviceService.getExpertises().subscribe(data => {
      this.expertises = data;
      console.log("hhhhh");
    });
  }

  // Method to update the content dynamically
  updateExpertiseContent(updatedData: any): void {
    this.expertises = updatedData.expertises;
  }
}
