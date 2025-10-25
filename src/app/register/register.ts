import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produto.service'; 
import { Router, RouterLink } from '@angular/router';
import { timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface RegisterRequest{
  email: string;
  password: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  user = {email: '', 
          password: '',
          confirmPassword: '',
   };
  errorMessage: string = '';
  isButtonEnabled = false;
error: any;
success: any;

  constructor(private http: HttpClient,
    private router: Router) {}

   validateForm() {
  const { email, password, confirmPassword } = this.user;

  // VALIDAÇÃO CORRETA DE E-MAIL
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  this.isButtonEnabled = 
    isEmailValid && 
    password.length >= 6 && 
    password === confirmPassword;

  console.log('Validação:', { 
    email, 
    isEmailValid, 
    passwordLength: password.length, 
    passwordsMatch: password === confirmPassword,
    buttonEnabled: this.isButtonEnabled
  });
}

  register() {
  console.log('bOTAO CLICADO! enviando cadastro...')

  const { confirmPassword, ...userToSend } = this.user;

  console.log('Enviando cadastro:', userToSend); // DEBUG

  this.http.post<any>('http://localhost:8080/api/auth/register', userToSend, {
    withCredentials: true
  }).pipe(timeout(10000)).subscribe({
    next: (response) => {
      console.log('Cadastro bem-sucedido:', response); // DEBUG
      alert(`Cadastro realizado com sucesso! E-mail: ${response.email}`);
      this.router.navigate(['/login']); // REDIRECIONA AQUI
    },
    error: (err) => {
      console.error('Erro no cadastro:', err); // DEBUG
      const msg = err.error?.message || err.error || 'Erro ao cadastrar. Tente novamente.';
      this.errorMessage = msg;
    }
  });
}
}