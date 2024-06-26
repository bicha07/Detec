import { Component, OnInit } from '@angular/core';
import { User } from '../../../website/interfaces/interface.user';
import { ServiceService } from '../../../website/service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { LoginService } from '../../../registration/login.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent]
})
export class UserComponent implements OnInit {
  users: User[] = [];
  currentUser: User = new User(0, '', '', '', '');
  showForm = false;
  isEditing = false;
  registrationForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private userService: ServiceService, private fb: FormBuilder, private registrationService: LoginService, private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: [''],
      confirmPassword: ['']
    });
  }
  
  

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (error) => console.error('Erreur lors du chargement des utilisateurs:', error)
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentUser = new User(0, '', '', '', '');
  }

  onEdit(user: User): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentUser = { ...user };
    this.registrationForm.patchValue({
      username: user.username,
      email: user.email,
      role: user.role
    });
    this.selectedFile = null; // Reset the selected file
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          console.log('Suppression réussie');
          this.loadUsers();
        },
        error: (error) => console.error('Erreur lors de la suppression de l\'utilisateur:', error)
      });
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.saveUser();
    } else {
      this.addUser();
    }
  }
  

  addUser(): void {
    if (this.registrationForm.valid) {
      const userData = {
        ...this.registrationForm.value,
        password_confirmation: this.registrationForm.value.confirmPassword
      };
  
      this.userService.createUser(userData).subscribe({
        next: (response) => {
          console.log('Ajout réussi');
          this.users.push(response); // Add the new user to the users array
          this.closeForm();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
          this.closeForm();
        }
      });
    }
  }
  

  saveUser(): void {
    if (this.registrationForm.valid) {
      const updatedUser: any = {
        username: this.registrationForm.value.username,
        email: this.registrationForm.value.email,
        role: this.registrationForm.value.role
      };
  
      if (this.registrationForm.value.password) {
        updatedUser.password = this.registrationForm.value.password;
        updatedUser.confirmPassword = this.registrationForm.value.confirmPassword;
      }
  
      this.userService.updateUser(this.currentUser.id, updatedUser).subscribe({
        next: () => {
          console.log('Mise à jour réussie');
          this.loadUsers();
          this.closeForm();
        },
        error: (error) => console.error('Erreur lors de la mise à jour de l\'utilisateur:', error)
      });
    }
  }
  

  closeForm(): void {
    this.showForm = false;
  }
}
