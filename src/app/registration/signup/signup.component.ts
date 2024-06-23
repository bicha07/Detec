import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: LoginService,
    private router: Router
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

  ngOnInit(): void {}

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

  onRegister() {
    if (this.registrationForm.valid) {
      const userData = {
        ...this.registrationForm.value,
        password_confirmation: this.registrationForm.value.confirmPassword
      };
      this.registrationService.registerUser(userData).subscribe(
        response => {
          // this.alertService.showAlert('Registration successful');
          this.router.navigate(['/registration']); // Adjust the path as needed
          this.registrationForm.reset();
        },
        error => {
          // this.alertService.showAlert("Error during registration: " + error.error.message);
          this.registrationForm.reset();
        }
      );
    }
  }
}
