import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produto.service'; // Ajuste o caminho se necessário
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private produtoService: ProdutoService, private router: Router) {}

  login() {
  if (!this.user.email || !this.user.password) {
    this.errorMessage = 'Preencha todos os campos.';
    return;
  }
  console.log('Dados enviados para login:', { email: this.user.email, password: this.user.password }); // Log detalhado
  this.produtoService.login(this.user).subscribe({
    next: (token) => {
      console.log('Login bem-sucedido, token:', token);
      localStorage.setItem('token', token);
      this.router.navigate(['/']);
      this.router.navigate(['/produto']);
    },
    error: (err) => {
      this.errorMessage = 'Credenciais inválidas: ' + err.message;
      console.error('Erro no login:', err); // Linha 34
    }
  });
}
}