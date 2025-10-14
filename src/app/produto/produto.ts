import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { ProductItem } from '../produto.model';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class ProdutoComponent implements OnInit {
  produtos: ProductItem[] = [];
  novoProduto: Omit<ProductItem, 'id'> = { nome: '', preco: 0, descricao: '' }; // Remova o id

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
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

  adicionarProduto(): void {
    this.produtoService.createProduto(this.novoProduto).subscribe({
      next: (produto) => {
        this.produtos.push(produto);
        this.novoProduto = { nome: '', preco: 0, descricao: '' }; // Reseta o formulário
        this.loadProdutos(); // Recarrega a lista para garantir sincronia
      },
      error: (err) => {
        console.error('Erro ao criar produto:', err);
      }
    });
  }

  excluirProduto(id: number): void{
    this.produtoService.deleteProduto(id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
        this.loadProdutos();
      },
      error(err) {
        console.error('Erro ao excluir produto', err);
      },
    })
  }
}