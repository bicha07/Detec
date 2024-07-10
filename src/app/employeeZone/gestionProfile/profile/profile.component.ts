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
  selectedFile: File | null = null;

  constructor(
    private userService: ServiceService,
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


  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files ? target.files[0] : null;
  }

  onSubmit(): void {
  if (this.profileForm.valid) {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    Object.keys(this.profileForm.value).forEach(key => {
      formData.append(key, this.profileForm.value[key]);
    });

    this.userService.updateUserProfileWithFile(this.currentUser.id, formData).subscribe({
      next: () => {
        console.log('Profile update successful');
        // Redirect or other actions after update
      },
      error: (error) => console.error('Error updating profile:', error)
    });
  }
}

}
