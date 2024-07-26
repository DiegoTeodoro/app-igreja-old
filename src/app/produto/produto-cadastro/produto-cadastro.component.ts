import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/produto.service';
import { CategoriaService } from 'src/app/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { Produto } from 'src/app/models/produto';
import { ProdutoDataService } from 'src/app/produto-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {
  produto: Produto = { 
    id: 0, 
    codigo: '', 
    nome: '', 
    marca: '', 
    fornecedor: '', 
    codigo_barra: '', 
    categoria_id: 0, 
    volume: '', 
    observacao: '' 
  };
  categorias: Categoria[] = [];
  editMode = false;  // Flag para determinar se está no modo de edição

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private produtoDataService: ProdutoDataService,
    private snackBar: MatSnackBar  // Injeção do MatSnackBar
  ) {}

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    }, error => {
      console.error('Erro ao carregar categorias', error);
    });

    this.produtoDataService.currentProduto.subscribe(produto => {
      if (produto) {
        this.produto = produto;
        this.editMode = true;
      } else {
        this.resetForm();
      }
    });
  }

  onSubmit() {
    if (this.editMode) {
      if (this.produto.id !== undefined) {
        this.produtoService.updateProduto(this.produto.id, this.produto).subscribe(
          response => {
            this.snackBar.open('Produto atualizado com sucesso!', 'Fechar', { duration: 3000 });
            this.resetForm();
          },
          error => {
            this.snackBar.open('Erro ao atualizar o produto.', 'Fechar', { duration: 3000 });
            console.error('Erro ao atualizar produto', error);
          }
        );
      } else {
        console.error('ID do produto é indefinido');
      }
    } else {
      this.produtoService.createProduto(this.produto).subscribe(
        response => {
          this.snackBar.open('Produto criado com sucesso!', 'Fechar', { duration: 3000 });
          this.resetForm();
        },
        error => {
          this.snackBar.open('Erro ao criar o produto.', 'Fechar', { duration: 3000 });
          console.error('Erro ao criar produto', error);
        }
      );
    }
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.produtoService.deleteProduto(id).subscribe(
        response => {
          this.snackBar.open('Produto deletado com sucesso!', 'Fechar', { duration: 3000 });
          this.resetForm();
        },
        error => {
          this.snackBar.open('Erro ao deletar o produto.', 'Fechar', { duration: 3000 });
          console.error('Erro ao deletar produto', error);
        }
      );
    } else {
      console.error('ID do produto é indefinido');
    }
  }

  resetForm() {
    this.produto = { 
      id: 0, 
      codigo: '', 
      nome: '', 
      marca: '', 
      fornecedor: '', 
      codigo_barra: '', 
      categoria_id: 0, 
      volume: '', 
      observacao: '' 
    };
    this.editMode = false;
    this.produtoDataService.clearProduto();
  }
}