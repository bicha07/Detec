import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ServiceService } from '../../service.service';
import { Personne } from '../../interfaces/interface.personne';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  personnes: Personne[] = []; // Utilisez l'interface Category pour typer le tableau

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getPersonnes().subscribe(data => {
      this.personnes = data;
    });
  }

  // Method to update the content dynamically
  updatePersonneContent(updatedData: any): void {
    this.personnes = updatedData.personnes;
  }
}