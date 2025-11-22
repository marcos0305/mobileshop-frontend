import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarrinhoService } from '../services/carrinho';
interface Product{
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  estoque: number;
  categoria: string;
}

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class Produto implements OnInit {

  onImgError(event: any) {
  event.target.src = 'https://via.placeholder.com/300x300.png?text=Sem+Imagem';
}
  products: Product[] = [];
  loading = true;
  error = false;

  constructor(private http: HttpClient,
    public carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<Product[]>('http://localhost:8080/api/produtos',{
      withCredentials: true
      }).subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar produtos', err);
          this.error = true;
          this.loading = false;
        }
      });
  }

  addToCart(produto: any) {
  this.carrinhoService.adicionar(produto);
  }
}