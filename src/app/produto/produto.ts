import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class ProdutoComponent implements OnInit {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    // Temporariamente desabilitado
    // this.produtoService.getProdutos().subscribe(produtos => this.produtos = produtos);
    console.log('Carregamento de produtos desabilitado até login.');
  }
}