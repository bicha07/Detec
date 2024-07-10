import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../../website/service.service'; // Ensure the path is correct
import { CommonModule } from '@angular/common';
import { User } from '../../../website/interfaces/interface.user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // Add CommonModule to imports
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  baseUrl: string;
  currentUser!: User;
  profileForm!: FormGroup;
  isEditing: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private userService: ServiceService, // This service should have methods to fetch and update user data
    private fb: FormBuilder,
    private router: Router
  ) {
    this.baseUrl = this.userService.apiUrlbase;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserProfile();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      description: ['']
    });
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        this.profileForm.patchValue(user); // Populate the form with user data
      },
      error: (error) => console.error('Error loading profile:', error)
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser: User = {
        id: this.currentUser.id,
        username: this.profileForm.value.username,
        email: this.profileForm.value.email,
        role: this.profileForm.value.role,
        description: this.profileForm.value.description,
        photo: '', // Preserve the existing photo if not changed
        password: this.currentUser.password // Preserve the existing password
      };

      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('username', updatedUser.username);
        formData.append('email', updatedUser.email);
        formData.append('role', updatedUser.role);
        formData.append('description', updatedUser.description);
        formData.append('photo', this.selectedFile);

        this.userService.updateUserProfileWithPhoto(this.currentUser.id, formData).subscribe({
          next: () => {
            console.log('Profile updated successfully');
            this.isEditing = false;
            this.loadUserProfile(); // Refresh the profile data after update
          },
          error: (error) => console.error('Error updating profile:', error)
        });
      } else {
        this.userService.updateUserProfile(this.currentUser.id, updatedUser).subscribe({
          next: () => {
            console.log('Profile updated successfully');
            this.isEditing = false;
            this.loadUserProfile(); // Refresh the profile data after update
          },
          error: (error) => console.error('Error updating profile:', error)
        });
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }
}
