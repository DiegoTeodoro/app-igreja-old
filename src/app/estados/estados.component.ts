import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../estado.service';
@Component({
  selector: 'app-estado',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadoComponent implements OnInit {
onDelete(arg0: any) {
throw new Error('Method not implemented.');
}
  estados: any[] = [];
  estado: any = {};
displayedColumns: any;

  constructor(private estadoService: EstadoService) {}

  ngOnInit(): void {
    this.loadEstados();
  }

  loadEstados() {
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data;
    });
  }

  saveEstado() {
    if (this.estado.id) {
      this.estadoService.updateEstado(this.estado.id, this.estado).subscribe(() => {
        this.loadEstados();
        this.estado = {};
      });
    } else {
      this.estadoService.createEstado(this.estado).subscribe(() => {
        this.loadEstados();
        this.estado = {};
      });
    }
  }

  editEstado(estado: any) {
    this.estado = { ...estado };
  }

  deleteEstado(id: number) {
    this.estadoService.deleteEstado(id).subscribe(() => {
      this.loadEstados();
    });
  }
}