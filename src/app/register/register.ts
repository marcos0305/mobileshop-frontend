import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produto.service'; // Ajuste o caminho se necessário
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };
  errorMessage: string = '';

  constructor(private produtoService: ProdutoService, private router: Router) {}

  register() {
    this.produtoService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registro bem-sucedido:', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Erro no registro: ' + err.message;
      }
    });
  }
}