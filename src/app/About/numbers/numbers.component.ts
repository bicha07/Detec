import { Component } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Stat } from '../../interfaces/interface.stat';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './numbers.component.html',
  styleUrl: './numbers.component.css'
})
export class NumbersComponent {
  stats: Stat[] = []; // Utilisez l'interface Category pour typer le tableau

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getStats().subscribe(data => {
      this.stats = data;
      console.log("hhhhh");
    });
  }

  // Method to update the content dynamically
  updateStatContent(updatedData: any): void {
    this.stats = updatedData.stats;
  }
}
