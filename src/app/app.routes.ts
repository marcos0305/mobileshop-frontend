import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register";
import { LoginComponent } from "./login/login";
import { ProdutoComponent } from "./produto/produto";

export const routes: Routes = [
  { path: '', component: ProdutoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' } 
];
