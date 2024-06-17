// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { LinkServiceComponent } from '../link-service/link-service.component';
// import {  OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-service',
//   standalone: true,
//   imports: [RouterOutlet,RouterLink, RouterLinkActive,LinkServiceComponent,CommonModule],
//   templateUrl: './service.component.html',
//   styleUrl: './service.component.css'
// })
// export class ServiceComponent implements OnInit {

//   categories = [
//     {
//       photo: './assets/images/icon-01.png',
//       title: 'Tests Radiographiques',
//       link: '/sg',
//       recap: 'Compétence avérée dans les tests radiographiques et ultrasoniques pour assurer la conformité et la qualité des soudures.'
//     },
//     {
//       photo: './assets/images/icon-02.png',
//       title: 'Soudage Haute Pression',
//       link: '#',
//       recap: 'Qualifications diverses pour le soudage dans toutes positions: à plat (1G/1F), horizontale (2G/2F), verticale montante (3G/3F), verticale descendante (4G/4F), répondant a vos besoins.'
//     }
//   ];

//   constructor() { }

//   ngOnInit(): void {
//     // You can load the data from your backend here if needed
//   }

//   // Method to update the content dynamically
//   updateCategoryContent(updatedData: any): void {
//     this.categories = updatedData.categories;
//   }
// }


import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LinkServiceComponent } from '../link-service/link-service.component';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../service.service'; // Assurez-vous que le chemin est correct
import { Technique } from '../interface.technique'; // Importez l'interface Category
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-service',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LinkServiceComponent, CommonModule,HttpClientModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  techniques: Technique[] = []; // Utilisez l'interface Category pour typer le tableau

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getTechniques().subscribe(data => {
      this.techniques = data;
      console.log("hhhhh");
    });
  }

  // Method to update the content dynamically
  updateCategoryContent(updatedData: any): void {
    this.techniques = updatedData.categories;
  }
}
