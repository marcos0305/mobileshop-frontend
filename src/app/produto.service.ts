import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/api';
  private authUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, user);
  }

  login(user: { email: string; password: string }): Observable<string> {
    return this.http.post<string>(`${this.authUrl}/login`, user);
  }

  getProdutos(): Observable<any[]> { // Ajuste o tipo se necessário
    console.log('Carregamento de produtos desabilitado até login.');
    return of([]); // Placeholder
  }
}