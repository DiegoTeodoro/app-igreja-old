import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PedidoService } from '../Pedido.Service';

@Component({
  selector: 'app-consulta-pedido',
  templateUrl: './consulta-pedido.component.html',
  styleUrls: ['./consulta-pedido.component.css']
})
export class ConsultaPedidoComponent implements OnInit {
  pedidos: any[] = [];
  dataSource = new MatTableDataSource<any>([]); // Fonte de dados para a tabela
  igrejas: any[] = [];

  // Filtros
  selectedIgreja: string = '';
  selectedStatus: string = '';
  startDate: any = null;
  endDate: any = null;

  displayedColumns: string[] = ['id', 'igreja_nome', 'data_pedido', 'status', 'valor_total', 'recebedor'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Vincula o Paginator

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe((data) => {
      // Ordena por data mais recente
      this.pedidos = data.sort((a, b) => new Date(b.data_pedido).getTime() - new Date(a.data_pedido).getTime());
      this.dataSource.data = this.pedidos; // Alimenta o DataSource com os dados de pedidos
      this.dataSource.paginator = this.paginator; // Conecta o paginator ao DataSource
    });

    this.pedidoService.getIgrejas().subscribe((igrejasData) => {
      this.igrejas = igrejasData;
    });
  }

  // Método de filtro
  applyFilter() {
    const filteredData = this.pedidos.filter(pedido => {
      const matchesIgreja = this.selectedIgreja ? pedido.igreja_nome === this.selectedIgreja : true;
      const matchesStatus = this.selectedStatus ? pedido.status === this.selectedStatus : true;
      const matchesDate = this.checkDateRange(pedido.data_pedido);
      return matchesIgreja && matchesStatus && matchesDate;
    });

    this.dataSource.data = filteredData;
  }

  // Função para verificar se a data do pedido está dentro do intervalo
  checkDateRange(dataPedido: string): boolean {
    const pedidoDate = new Date(dataPedido).getTime();
    
    const start = this.startDate ? new Date(this.startDate).getTime() : null;
    const end = this.endDate ? new Date(this.endDate).getTime() : null;

    if (start && end) {
      return pedidoDate >= start && pedidoDate <= end;
    } else if (start) {
      return pedidoDate >= start;
    } else if (end) {
      return pedidoDate <= end;
    } else {
      return true;  // Sem filtros de data aplicados
    }
  }

  // Função para limpar os filtros
  clearFilters() {
    this.selectedIgreja = '';
    this.selectedStatus = '';
    this.startDate = null;
    this.endDate = null;
    this.applyFilter(); // Reaplica o filtro após limpar
  }
}