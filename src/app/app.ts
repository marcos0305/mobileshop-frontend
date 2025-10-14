import { Component, signal } from '@angular/core';
import { Produto } from './produto/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Produto, CommonModule],
  templateUrl: './app.html',

  styleUrl: './app.css'
})
export class App {
  
}
