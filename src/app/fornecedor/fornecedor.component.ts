import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fornecedor } from '../models/fornecedores';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  fornecedor: Fornecedor = new Fornecedor();
  fornecedores: Fornecedor[] = [];
  estados: any[] = [];
  cidades: any[] = [];
  dataSource = new MatTableDataSource<Fornecedor>(this.fornecedores);
  displayedColumns: string[] = ['razao_social', 'cnpj', 'estado', 'cidade', 'actions'];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getFornecedores();
    this.getEstados();
    this.getCidades();
  }

  getFornecedores() {
    this.http.get<Fornecedor[]>('http://localhost:3000/fornecedores').subscribe(data => {
      this.fornecedores = data;
      this.dataSource.data = this.fornecedores;
    });
  }

  getEstados() {
    this.http.get<any[]>('http://localhost:3000/estados').subscribe(data => {
      this.estados = data;
    });
  }

  getCidades() {
    this.http.get<any[]>('http://localhost:3000/cidades').subscribe(data => {
      this.cidades = data;
    });
  }

  saveFornecedor() {
    if (this.fornecedor.id) {
      this.http.put(`http://localhost:3000/fornecedores/${this.fornecedor.id}`, this.fornecedor).subscribe(() => {
        this.getFornecedores();
        this.fornecedor = new Fornecedor();
      });
    } else {
      this.http.post('http://localhost:3000/fornecedores', this.fornecedor).subscribe(() => {
        this.getFornecedores();
        this.fornecedor = new Fornecedor();
      });
    }
  }

  editFornecedor(fornecedor: Fornecedor) {
    this.fornecedor = { ...fornecedor };
  }

  deleteFornecedor(id: number | undefined) {
    if (id !== undefined) {
      this.http.delete(`http://localhost:3000/fornecedores/${id}`).subscribe(() => {
        this.getFornecedores();
      });
    }
  }

  getEstadoNome(id: number | undefined): string {
    const estado = this.estados.find(e => e.id === id);
    return estado ? estado.nome : '';
  }

  getCidadeNome(id: number | undefined): string {
    const cidade = this.cidades.find(c => c.id === id);
    return cidade ? cidade.nome : '';
  }
}