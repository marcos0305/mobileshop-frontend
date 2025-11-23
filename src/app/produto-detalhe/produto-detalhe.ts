import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../services/carrinho';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './produto-detalhe.html',
  styleUrls: ['./produto-detalhe.css']
})
export class ProdutoDetalheComponent implements OnInit {
  produto: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public carrinhoService: CarrinhoService   // ← injeta o serviço
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');

    if (!token || !id) {
      alert('Faça login novamente.');
      this.router.navigate(['/login']);
      return;
    }

    this.http.get(`/api/${id}`, { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.produto = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro:', err);
        alert('Erro ao carregar produto.');
        this.router.navigate(['/produtos']);
        this.loading = false;
      }
    });
  }

  // Adiciona ao carrinho (já funcionando 100%)
addToCart(produto: any) {
  this.carrinhoService.adicionar(produto);
}

  // Imagem quebrada → coloca uma padrão
  onImgError(event: any) {
    event.target.src = 'assets/imagens/sem-imagem.jpg';
  }

  // Opcional: se quiser usar o botão voltar com método
  voltar() {
    this.router.navigate(['/produtos']);
  }
}