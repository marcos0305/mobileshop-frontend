import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { RecaptchaModule } from 'ng-recaptcha';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RecaptchaModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  user = { email: '', password: '', captchaToken: '' };
  errorMessage: string = '';
  isButtonEnabled: boolean = false;
  isLoading: boolean = false; // ADICIONADO

  // Site Key do reCAPTCHA
  siteKey: string = '6LdOwvMrAAAAAGvkAYvgo8Yin0wt2oeetYD3AYHf';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  // Verifica se os campos de login e senha estão preenchidos
  checkFormValidity() {
    this.isButtonEnabled = this.user.email.trim().length > 0 && this.user.password.trim().length > 0;
    console.log('Campos preenchidos, botão habilitado:', this.isButtonEnabled);
  }

  login() {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Preencha todos os campos de login e senha.';
      console.log('Campos inválidos:', { email: this.user.email, password: this.user.password });
      return;
    }

    // ATIVA O LOADING
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Iniciando login...');

    console.log('Dados enviados para login:', {
      email: this.user.email,
      password: this.user.password,
      captchaToken: this.user.captchaToken
    });

    this.http.post('http://localhost:8080/api/auth/login', this.user, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(timeout(10000)).subscribe({
      next: (response: string) => {
        console.log('Resposta do servidor:', response);
        this.isLoading = false; // DESATIVA O LOADING

        if (response && !response.includes('Credenciais inválidas') && !response.includes('CAPTCHA')) {
          localStorage.setItem('token', response);
          this.router.navigate(['/produtos']);
        } else {
          this.errorMessage = 'Erro no login: ' + (response || 'Credenciais inválidas ou CAPTCHA inválido');
        }
      },
      error: (err) => {
        this.isLoading = false; // DESATIVA O LOADING
        this.errorMessage = 'Erro no login: ' + (err.error?.message || err.statusText || 'Timeout');
        console.error('Erro detalhado:', {
          status: err.status,
          message: err.error?.message || err.statusText,
          url: err.url
        });
      }
    });
  }

  loginWithGoogle() {
    console.log('Tentando login com Google...');
    this.auth.loginWithRedirect({
      appState: { target: '/produto' },
      authorizationParams: { prompt: 'select_account' }
    });
  }

  onRecaptchaSuccess(event: any) {
    console.log('Evento do reCAPTCHA recebido:', event);
    let captchaToken: string = '';
    if (event && typeof event === 'object' && 'response' in event) {
      captchaToken = event.response as string;
    } else if (typeof event === 'string') {
      captchaToken = event;
    }
    this.user.captchaToken = captchaToken;
    console.log('Token do reCAPTCHA extraído:', captchaToken);
  }

  onRecaptchaError(error: any) {
    console.error('Erro no reCAPTCHA:', error);
    this.errorMessage = 'Erro ao carregar o CAPTCHA. Tente novamente.';
  }
}