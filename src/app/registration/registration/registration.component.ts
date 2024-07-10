import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlertComponent } from '../../alert/alert.component'; // Import the AlertModule
import { LoginService } from '../login.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    FormsModule, ReactiveFormsModule,
    CommonModule, AlertComponent // Include the AlertModule here
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginForm: FormGroup;
  registrationForm: FormGroup;
  forgotPasswordForm: FormGroup;

  alertType!: string;
  alertMessage!: string;

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
          this.setAlert('success', 'Password reset link sent to your email');
        },
        error: (error) => {
          this.setAlert('danger', 'Failed to send password reset link');
        }
      });
    }
  }

  onRegister(): void {
    if (this.registrationForm.valid) {
      this.loginService.registerUser(this.registrationForm.value).subscribe(
        response => {
          this.setAlert('success', 'Registration successful');
          this.router.navigate(['/login']);
          this.registrationForm.reset();
        },
        error => {
          this.setAlert('danger', 'Registration failed');
          this.registrationForm.reset();
        }
      );
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loginService.loginUser(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.loginService.setCurrentUser(response.user);

          if (response.user.role === 'admin') {
            this.router.navigate(['/homeAdmin']);
          } else if (response.user.role === 'employee') {
            this.router.navigate(['/newproject']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.setAlert('danger', 'Invalid credentials');
          this.loginForm.reset();
        }
      );
    }
  }

  setAlert(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;

    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}
