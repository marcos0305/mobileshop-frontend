import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductItem } from '../produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css'
})
export class Produto implements OnInit {
 produtos: ProductItem[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.produtos = data;
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
      }
    });
  }
}
