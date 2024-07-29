import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/fornecedor.service';
import { EstadoService } from 'src/app/estado.service';
import { CidadeService } from 'src/app/cidade.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedorComponent implements OnInit {
displayedColumns: Iterable<string> | undefined;
onDelete(arg0: any) {
throw new Error('Method not implemented.');
}
  fornecedores: any[] = [];
  estados: any[] = [];
  cidades: any[] = [];
  fornecedor: any = {};

  constructor(
    private fornecedorService: FornecedorService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService
  ) {}

  ngOnInit(): void {
    this.loadFornecedores();
    this.loadEstados();
    this.loadCidades();
  }

  loadFornecedores() {
    this.fornecedorService.getFornecedores().subscribe(data => {
      this.fornecedores = data;
    });
  }

  loadEstados() {
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data;
    });
  }

  loadCidades() {
    this.cidadeService.getCidades().subscribe(data => {
      this.cidades = data;
    });
  }

  saveFornecedor() {
    if (this.fornecedor.id) {
      this.fornecedorService.updateFornecedor(this.fornecedor.id, this.fornecedor).subscribe(() => {
        this.loadFornecedores();
        this.fornecedor = {};
      });
    } else {
      this.fornecedorService.createFornecedor(this.fornecedor).subscribe(() => {
        this.loadFornecedores();
        this.fornecedor = {};
      });
    }
  }

  editFornecedor(fornecedor: any) {
    this.fornecedor = { ...fornecedor };
  }

  deleteFornecedor(id: number) {
    this.fornecedorService.deleteFornecedor(id).subscribe(() => {
      this.loadFornecedores();
    });
  }

  getEstadoNome(estadoId: number): string {
    const estado = this.estados.find(e => e.id === estadoId);
    return estado ? estado.nome : '';
  }

  getCidadeNome(cidadeId: number): string {
    const cidade = this.cidades.find(c => c.id === cidadeId);
    return cidade ? cidade.nome : '';
  }
}
