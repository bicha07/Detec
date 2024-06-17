import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../service.service';
import { Technique } from '../interfaces/interface.technique';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  techniques: Technique[] = []; // Utilisez l'interface Category pour typer le tableau

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getTechniques().subscribe(data => {
      this.techniques = data;
      console.log("kkkk")
    });
  }

  // Method to update the content dynamically
  updateTechniqueContent(updatedData: any): void {
    this.techniques = updatedData.certifs;
  }
}