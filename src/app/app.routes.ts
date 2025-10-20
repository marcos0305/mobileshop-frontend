import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register";
import { LoginComponent } from "./login/login";
import { ProdutoComponent } from "./produto/produto";
import { CallbackComponent } from "./callback.component.ts";

export const routes: Routes = [
  { path: 'callback', component: CallbackComponent  },
  { path: '', redirectTo: '/login', pathMatch:'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'produto', component: ProdutoComponent},
  { path: '**', redirectTo: '' } 
];
