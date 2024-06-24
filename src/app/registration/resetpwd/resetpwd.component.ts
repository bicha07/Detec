import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'; // Assurez-vous d'importer le service
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpwd',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent {

  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      identifier: ['', [Validators.required]] // Combine username and email into one field
    });
  }

  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.loginService.forgotPassword(this.forgotPasswordForm.value.identifier).subscribe({
        next: () => {
          // Handle successful password reset request
          alert('Please check your email for password reset instructions.');
        },
        error: (error) => {
          // Handle error
          alert('Error sending password reset email.');
        }
      });
    }
  }
}
