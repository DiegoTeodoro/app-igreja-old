import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { CategoriaService } from '../categoria.service';
import { Produto } from '../models/produto';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produto: Produto = { nome: '', descricao: '', codigo_barra: '', categoria_id: 0 };
  categorias: Categoria[] = [];

  constructor(private produtoService: ProdutoService, private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }

  onSubmit() {
    this.produtoService.createProduto(this.produto).subscribe(response => {
      console.log('Produto criado com sucesso!', response);
      this.produto = { nome: '', descricao: '', codigo_barra: '', categoria_id: 0 }; // Resetando o formulário
    });
  }
}