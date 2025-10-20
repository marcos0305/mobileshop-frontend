import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage: string = '';
  

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

login() {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }
    console.log('Dados enviados para login:', { email: this.user.email, password: this.user.password });
    this.http.post('http://localhost:8080/api/auth/login', this.user, { 
      withCredentials: true, 
      responseType: 'text' // Define o tipo de resposta como texto
    }).subscribe({
      next: (response: string) => {
        if (response && !response.includes('Credenciais inválidas')) {
          console.log('Login bem-sucedido, token:', response);
          localStorage.setItem('token', response);
          this.router.navigate(['/produto']);
        } else {
          this.errorMessage = 'Erro no login: ' + (response || 'Credenciais inválidas');
          console.error('Resposta inesperada:', response);
        }
      },
      error: (err) => {
        this.errorMessage = 'Erro no login: ' + (err.error?.message || err.statusText || 'Conexão falhou');
        console.error('Erro detalhado:', err);
      }
    });
  }
    loginWithGoogle() {
  console.log('Tentando login com Google...');
  this.auth.loginWithRedirect({
    appState: { target: '/produto' },
    authorizationParams:{
        prompt: 'select_account'
    }
    
  });
  }
}