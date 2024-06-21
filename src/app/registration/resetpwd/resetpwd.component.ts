import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'; // Assurez-vous d'importer le service
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpwd',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,ReactiveFormsModule],
  templateUrl: './resetpwd.component.html',
  styleUrl: './resetpwd.component.css'
})
export class ResetpwdComponent {

// Form groups pour la connexion et l'inscription
loginForm: FormGroup;
registrationForm: FormGroup;
forgotPasswordForm :FormGroup

constructor(
  private fb: FormBuilder, 
  private registrationService: LoginService,
  private router: Router , // Inject the Router,



) {
  // Initialiser les formulaires avec FormBuilder
  this.loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  this.registrationForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });
  this.forgotPasswordForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });
}

  // Méthode pour gérer l'inscription
  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.registrationService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next: () => {
          // this.alertService.showAlert('Please check your email for password reset instructions.');
        },
        error: (error) => {
          // this.alertService.showAlert('Error sending password reset email.');
        }
      });
    }
  }
}