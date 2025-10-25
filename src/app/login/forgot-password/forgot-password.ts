import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  email = '';
  loading = false;
  message = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  sendLink() {
    this.loading = true;
    this.message = '';
    this.error = '';

    this.http.post('http://localhost:8080/api/auth/forgot-password', { email: this.email })
      .subscribe({
        next: () => {
          this.loading = false;
          this.message = 'Link enviado! Verifique seu console.';
          console.log(`Link para ${this.email}: http://localhost:4200/redefinir-senha?token=...`);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.error || 'Erro ao enviar link';
        }
      });
  }
}