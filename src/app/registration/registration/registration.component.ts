import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginForm: FormGroup;
  registrationForm: FormGroup;
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onForgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      this.loginService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next: () => {
          // Handle successful password reset request
        },
        error: (error) => {
          // Handle error in password reset request
        }
      });
    }
  }

  onRegister(): void {
    if (this.registrationForm.valid) {
      this.loginService.registerUser(this.registrationForm.value).subscribe(
        response => {
          // Handle successful registration
          this.router.navigate(['/login']);
          this.registrationForm.reset();
        },
        error => {
          // Handle error in registration
          this.registrationForm.reset();
        }
      );
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loginService.loginUser(this.loginForm.value).subscribe(
        response => {
          // Store the token or any other response data
          localStorage.setItem('token', response.token);
          // Navigate to the dashboard or any other route
          this.router.navigate(['/homeAdmin']);
        },
        error => {
          // Handle error in login
          this.loginForm.reset();
        }
      );
    }
  }
}
