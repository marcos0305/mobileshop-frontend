import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class ProdutoComponent implements OnInit {
  userEmail: string = '';


  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
      return;
    }
  }

  logout(){
    this.http.post('http://localhost:8080/api/auth/logout', {}, {
      withCredentials:true
    }).subscribe({
      next: () => {
        this.finalizarLogout();
      },
      error: () => {
        this.finalizarLogout();
      }
    });
  }

  private finalizarLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}