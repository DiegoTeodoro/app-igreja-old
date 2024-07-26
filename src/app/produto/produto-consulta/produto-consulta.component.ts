import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/produto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProdutoDataService } from 'src/app/produto-data.service';


@Component({
  selector: 'app-produto-consulta',
  templateUrl: './produto-consulta.component.html',
  styleUrls: ['./produto-consulta.component.css']
})
export class ProdutoConsultaComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'codigoBarra', 'categoria', 'volume', 'acoes'];
  dataSource: MatTableDataSource<Produto> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private produtoService: ProdutoService, private router: Router, private produtoDataService: ProdutoDataService) {}

  ngOnInit() {
    this.produtoService.getProdutos().subscribe((data: Produto[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
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
    this.produtoDataService.changeProduto(produto);
    this.router.navigate(['/produto/cadastro']);
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.produtoService.deleteProduto(id).subscribe(response => {
        console.log('Produto deletado com sucesso!', response);
        this.loadProdutos();  // Atualiza a lista de produtos
      });
    } else {
      console.error('ID do produto é indefinido');
    }
  }

  loadProdutos() {
    this.produtoService.getProdutos().subscribe((data: Produto[]) => {
      this.dataSource.data = data;
    }, error => {
      console.error('Erro ao carregar produtos', error);
    });
  }
}