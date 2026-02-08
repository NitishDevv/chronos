import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Chronos</h2>

    <input [(ngModel)]="email" placeholder="Email" />
    <input [(ngModel)]="password" type="password" placeholder="Password" />

    <button (click)="login()">Login</button>
    <button (click)="register()">Register</button>

    <p *ngIf="error" style="color:red">{{ error }}</p>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ email: this.email, password: this.password })
      .subscribe({
        next: res => {
          this.auth.saveToken(res.token);
          this.router.navigate(['/jobs']);
        },
        error: err => this.error = err.error?.message || 'Login failed'
      });
  }

  register() {
    this.auth.register({ email: this.email, password: this.password })
      .subscribe({
        next: res => {
          this.auth.saveToken(res.token);
          this.router.navigate(['/']);
        },
        error: err => this.error = err.error?.message || 'Register failed'
      });
  }
}
