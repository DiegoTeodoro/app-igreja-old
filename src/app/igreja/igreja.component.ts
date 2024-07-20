import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IgrejaService } from '../igreja.service';
import { SetorService } from '../setor.service';
import { Igreja } from '../models/igreja'; // Importar a interface Igreja
import { Setor } from '../models/setor'; // Importar a interface Setor

@Component({
  selector: 'app-igreja',
  templateUrl: './igreja.component.html',
  styleUrls: ['./igreja.component.css']
})
export class IgrejaComponent implements OnInit, AfterViewInit {
  igrejas: Igreja[] = []; // Definir o tipo do array
  setores: Setor[] = []; // Definir o tipo do array
  displayedColumns: string[] = ['codigo', 'nome', 'logradouro', 'numero', 'bairro', 'cep', 'cidade', 'uf', 'codigo_setor', 'ativo'];
  dataSource: MatTableDataSource<Igreja> = new MatTableDataSource<Igreja>([]);
  
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  igreja: Igreja = {
    codigo: 0,
    nome: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    codigo_setor: 0,
    ativo: false
  };

  constructor(private igrejaService: IgrejaService, private setorService: SetorService) {}

  ngOnInit(): void {
    this.loadIgrejas();
    this.loadSetores();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadIgrejas() {
    this.igrejaService.getIgrejas().subscribe((data: Igreja[]) => {
      this.igrejas = data;
      this.dataSource.data = this.igrejas;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      console.error('Erro ao carregar igrejas:', error);
    });
  }

  loadSetores() {
    this.setorService.getSetores().subscribe((data: Setor[]) => {
      this.setores = data;
    }, error => {
      console.error('Erro ao carregar setores:', error);
    });
  }

  onSubmit() {
    this.igrejaService.createIgreja(this.igreja).subscribe(() => {
      this.loadIgrejas();
      this.resetForm();
    }, error => {
      console.error('Erro ao criar igreja:', error);
    });
  }

  resetForm() {
    this.igreja = {
      codigo: 0,
      nome: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      uf: '',
      codigo_setor: 0,
      ativo: false
    };
  }
}
