import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token = '';
  password = '';
  confirm = '';
  loading = false;
  message = '';
  error = '';
  success = false; // NOVA VARIÁVEL

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.error = 'Token inválido. Solicite um novo link.';
    }
  }

  reset() {
    this.loading = true;
    this.message = '';
    this.error = '';

    this.http.post('http://localhost:8080/api/auth/reset-password', {
      token: this.token,
      newPassword: this.password
    }).subscribe({
      next: () => {
        this.loading = false;
        this.success = true; // MOSTRA TELA DE SUCESSO
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error || 'Erro ao redefinir senha';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']).then(success => {
      console.log('Navegao para /login', success ? 'OK' : 'FALHOU');
      if(!navigator){
        window.location.href = '/login'
      }
    });
  }
}