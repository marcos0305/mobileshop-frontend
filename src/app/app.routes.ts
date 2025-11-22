import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register";
import { LoginComponent } from "./login/login";
import { Produto } from "./produto/produto";
import { ProdutoDetalheComponent } from "./produto-detalhe/produto-detalhe";
import { CallbackComponent } from "./callback.component.ts";

export const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  
  // ROTA CORRETA DA LISTA
  { path: 'produtos', component: Produto },
  
  // ROTA NOVA PARA DETALHES (ESSA É A CHAVE!)
  { path: 'produtos/:id', component: ProdutoDetalheComponent },

  { path: 'esqueci-senha', loadComponent: () => import('./login/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent) },
  { path: 'redefinir-senha', loadComponent: () => import('./login/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
  { path: '**', redirectTo: '' }
];