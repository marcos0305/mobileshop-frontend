// src/app/services/carrinho.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private itensSubject = new BehaviorSubject<any[]>([]);
  itens$ = this.itensSubject.asObservable();

  constructor() {
    this.carregarDoStorage();
  }

  private carregarDoStorage() {
    const dados = localStorage.getItem('carrinho');
    const itens = dados ? JSON.parse(dados) : [];
    this.itensSubject.next(itens); // ← IMPORTANTE: atualiza o subject

  }

  adicionar(produto: any) {
    const itens = this.itensSubject.getValue();
    const existente = itens.find((p: any) => p.id === produto.id);

    if (existente) {
      existente.quantidade += 1;
    } else {
      itens.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(itens));
    this.itensSubject.next(itens); // ← atualiza todos que estão ouvindo
  }

  remover(index: number) {
    const itens = this.itensSubject.getValue();
    itens.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(itens));
    this.itensSubject.next(itens); // ← aqui estava o erro!
  }

  atualizarQuantidade(index: number, qtd: number) {
    const itens = this.itensSubject.getValue();
    if (qtd <= 0) {
      this.remover(index);
      return;
    }
    itens[index].quantidade = qtd;
    localStorage.setItem('carrinho', JSON.stringify(itens));
    this.itensSubject.next(itens); // ← aqui também!
  }

  limpar() {
    localStorage.removeItem('carrinho');
    this.itensSubject.next([]); // ← limpa tudo
  }

  // getters para usar direto no template
  get quantidadeTotal(): number {
    return this.itensSubject.getValue().reduce((acc, item) => acc + (item.quantidade || 1), 0);
  }

  get itens(): any[] {
    return this.itensSubject.getValue();
  }
}