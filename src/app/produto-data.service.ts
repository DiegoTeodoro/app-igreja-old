import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from 'src/app/models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoDataService {
    private produtoSource = new BehaviorSubject<Produto | null>(null);
    currentProduto = this.produtoSource.asObservable();
  
    constructor() {}
  
    changeProduto(produto: Produto) {
      this.produtoSource.next(produto);
    }
  
    clearProduto() {
      this.produtoSource.next(null);
    }
  }