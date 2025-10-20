import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: '<p>Autenticando... <span *ngIf="errorMessage">{{ errorMessage }}</span></p>'
})
export class CallbackComponent {
  errorMessage: string = '';

  constructor(public auth: AuthService) {
    this.auth.handleRedirectCallback().subscribe({
      next: () => {
        console.log('Autenticação bem-sucedida, redirecionando para /produto');
        window.location.href = '/produto';
      },
      error: (err) => {
  console.error('Erro no callback:', err);
  this.errorMessage = 'Erro na autenticação: ' + err.message;
  console.log('Detalhes do erro:', {
    message: err.message,
    url: window.location.href,
    returnedState: new URLSearchParams(window.location.search).get('state'),
    errorDetails: err.error || 'Nenhum detalhe adicional'
  });
  // Tente usar o code para autenticação manual (teste)
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
    console.log('Código de autorização encontrado:', code);
    window.location.href = '/produto'; // Redireciona com o code
  } else {
    window.location.href = '/login?error=invalid_state';
  }
}
    });
  }
}