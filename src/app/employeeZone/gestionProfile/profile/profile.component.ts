import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../../website/service.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  profileForm!: FormGroup;

  constructor(
    private userService: ServiceService, // Ce service doit avoir une méthode pour récupérer et mettre à jour les données utilisateur
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserProfile();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    });
  }

  loadUserProfile(): void {
    // Ici, vous devez appeler le service pour obtenir les données de l'utilisateur connecté
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.profileForm.patchValue(user); // Remplir le formulaire avec les données de l'utilisateur
      },
      error: (error) => console.error('Erreur lors du chargement du profil:', error)
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      // Appeler le service pour mettre à jour les données de l'utilisateur
      this.userService.updateUser(this.currentUser.id, this.profileForm.value).subscribe({
        next: () => {
          console.log('Mise à jour du profil réussie');
          // Redirection ou actions après la mise à jour
        },
        error: (error) => console.error('Erreur lors de la mise à jour du profil:', error)
      });
    }
  }
}
