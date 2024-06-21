import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../login.service';  // Assurez-vous d'importer le service
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,FormsModule,ReactiveFormsModule  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 
// Form groups pour la connexion et l'inscription
registrationForm: FormGroup;
forgotPasswordForm :FormGroup

constructor(
  private fb: FormBuilder, 
  private registrationService: LoginService,
  private router: Router , // Inject the Router,



) {

  this.registrationForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    role: ['', [Validators.required]]


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
// Dans votre composant, pour l'inscription
onRegister() {
  if (this.registrationForm.valid) {
    this.registrationService.registerUser(this.registrationForm.value).subscribe(
      response => {
        // this.alertService.showAlert('Inscription réussie');
        this.router.navigate(['/inscription']); // Remplacez par le chemin réel de votre tableau de bord
        this.registrationForm.reset();

        // Autres actions après une inscription réussie
      },
      error => {
        // this.alertService.showAlert("Erreur lors de l'inscription : " + error.error.message);
        this.registrationForm.reset();
      }
    );
  }
}

}