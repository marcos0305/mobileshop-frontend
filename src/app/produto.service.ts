import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductItem } from './produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  createProduto(novoProduto: Omit<ProductItem, "id">) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api';
  private authUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, user);
  }

  login(user: { email: string; password: string }): Observable<string> {
    return this.http.post(
      `${this.authUrl}/login`,
      user,
      { responseType: 'text' as const } // Usa 'text' com tipo explícito
    );
  }

 getProdutos() {
  return this.http.get<any[]>('/api/produtos');
}
}