import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarrinhoService } from '../services/carrinho';
import { FormsModule } from '@angular/forms';

interface Product {
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
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class Produto implements OnInit {

  products: Product[] = [];
  loading = true;
  error = false;

  // Busca por texto
  termoBusca: string = '';
  produtosFiltrados: Product[] = [];

  // NOVO: Filtro por categoria
  categoriaSelecionada: string | null = null;
  categoriasUnicas: string[] = [];

  constructor(
    private http: HttpClient,
    public carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.http.get<Product[]>('/api/produtos', { withCredentials: true }).subscribe({
      next: (data) => {
        this.products = data;

        // Extrai categorias únicas e ordena
        this.categoriasUnicas = [...new Set(data.map(p => p.categoria))].sort();

        // Inicializa lista filtrada com todos os produtos
        this.produtosFiltrados = [...data];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  // Filtro por categoria
  filtrarPorCategoria(categoria: string | null): void {
    this.categoriaSelecionada = categoria;
    this.aplicarFiltros();
  }

  // Filtro por texto (busca)
  filtrarProdutos(): void {
    this.aplicarFiltros();
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.aplicarFiltros();
  }

  // Função central que combina os dois filtros
  private aplicarFiltros(): void {
    const termo = this.termoBusca.toLowerCase().trim();
    let lista = [...this.products];

    // 1. Filtra por categoria (se tiver selecionada)
    if (this.categoriaSelecionada) {
      lista = lista.filter(p => p.categoria === this.categoriaSelecionada);
    }

    // 2. Filtra por texto (se tiver busca)
    if (termo) {
      lista = lista.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo)
      );
    }

    this.produtosFiltrados = lista;
  }

  addToCart(produto: Product) {
    this.carrinhoService.adicionar(produto);
  }

  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/300x300.png?text=Sem+Imagem';
  }
}