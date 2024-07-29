import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProdutoService } from 'src/app/produto.service';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-produto-consulta',
  templateUrl: './produto-consulta.component.html',
  styleUrls: ['./produto-consulta.component.css']
})
export class ProdutoConsultaComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nome', 'marca', 'fornecedor', 'codigoBarra', 'categoria', 'volume', 'acoes'];
  dataSource: MatTableDataSource<Produto>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private produtoService: ProdutoService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadProdutos();
  }

  loadProdutos() {
    this.produtoService.getProdutos().subscribe((data: Produto[]) => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }, (error: any) => {
      console.error('Erro ao carregar produtos', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(produto: Produto) {
    // Lógica para editar o produto
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.produtoService.deleteProduto(id).subscribe((response: any) => {
        console.log('Produto deletado com sucesso!', response);
        this.loadProdutos();  // Atualiza a lista de produtos
      }, (error: any) => {
        console.error('Erro ao deletar produto', error);
      });
    } else {
      console.error('ID do produto é indefinido');
    }
  }
}
