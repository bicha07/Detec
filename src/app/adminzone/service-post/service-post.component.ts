import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../website/service.service'; // Assurez-vous que le chemin est correct
import { Expertise } from '../../website/interfaces/interface.expertise'; // Importez l'interface Expertise
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-post',
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './service-post.component.html',
  styleUrls: ['./service-post.component.css'],
  providers: [ServiceService]
})
export class ServicePostComponent implements OnInit {
  expertises: Expertise[] = [];
  showForm = false;
  isEditing = false;
  currentExpertise: Expertise = new Expertise(0, '', '', '');

  constructor(private serviceService: ServiceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadExpertises();
  }

  loadExpertises(): void {
    this.serviceService.getExpertises().subscribe(data => {
      this.expertises = data;
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentExpertise = new Expertise(0, '', '', '');
  }

  onEdit(expertise: Expertise): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentExpertise = { ...expertise };
  }

  onDelete(id: BigInteger): void {
    if (confirm('Are you sure you want to delete this expertise?')) {
      this.serviceService.deleteExpertise(id).subscribe(() => {
        this.loadExpertises();
      });
    }
  }

 
  }



