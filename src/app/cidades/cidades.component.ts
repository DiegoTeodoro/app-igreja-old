import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../cidade.service';
import { EstadoService } from '../estado.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.css']
})
export class CidadeComponent implements OnInit {
displayedColumns: any;
onDelete(arg0: any) {
throw new Error('Method not implemented.');
}
  cidades: any[] = [];
  estados: any[] = [];
  cidade: any = {};

  constructor(private cidadeService: CidadeService, private estadoService: EstadoService) {}

  ngOnInit(): void {
    this.loadCidades();
    this.loadEstados();
  }

  loadCidades() {
    this.cidadeService.getCidades().subscribe(data => {
      this.cidades = data;
    });
  }

  loadEstados() {
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data;
    });
  }

  saveCidade() {
    if (this.cidade.id) {
      this.cidadeService.updateCidade(this.cidade.id, this.cidade).subscribe(() => {
        this.loadCidades();
        this.cidade = {};
      });
    } else {
      this.cidadeService.createCidade(this.cidade).subscribe(() => {
        this.loadCidades();
        this.cidade = {};
      });
    }
  }

  editCidade(cidade: any) {
    this.cidade = { ...cidade };
  }

  deleteCidade(id: number) {
    this.cidadeService.deleteCidade(id).subscribe(() => {
      this.loadCidades();
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