import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../services/carrinho';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DecimalPipe],
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css']
})
export class CarrinhoComponent implements OnInit {

  itens: any[] = [];
  total = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.atualizarDoServico();
    // Toda vez que o serviço mudar, atualiza a tela
    this.carrinhoService.itens$.subscribe(() => {
      this.atualizarDoServico();
    });
  }

  private atualizarDoServico() {
    this.itens = this.carrinhoService.itens;
    this.calcularTotal();
  }

  removerItem(index: number) {
    this.carrinhoService.remover(index);
  }

  atualizarQuantidade(index: number, quantidade: number) {
    this.carrinhoService.atualizarQuantidade(index, Number(quantidade));
  }

  limparCarrinho() {
    this.carrinhoService.limpar();
  }

  calcularTotal() {
    this.total = this.itens.reduce((acc, item) => {
      return acc + (item.preco * (item.quantidade || 1));
    }, 0);
  }
}