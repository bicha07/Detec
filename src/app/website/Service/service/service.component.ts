
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LinkServiceComponent } from '../link-service/link-service.component';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../service.service'; // Assurez-vous que le chemin est correct
import { Certif } from '../../interfaces/interface.certif'; // Importez l'interface Category
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-service',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LinkServiceComponent, CommonModule,HttpClientModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  certifs: Certif[] = []; // Utilisez l'interface Category pour typer le tableau

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getCertifs().subscribe(data => {
      this.certifs = data;
      console.log("hhhhh");
    });
  }

  // Method to update the content dynamically
  updateCertifContent(updatedData: any): void {
    this.certifs = updatedData.certifs;
  }
}
