import { Component, OnInit } from '@angular/core';
import { SaldoEstoqueService } from '../Saldo_Estoque.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-relatorio-saldo-estoque',
  templateUrl: './relatorio-saldo-estoque.component.html',
  styleUrls: ['./relatorio-saldo-estoque.component.css']
})
export class RelatorioSaldoEstoqueComponent implements OnInit {
  saldoEstoque: any[] = [];
  displayedColumns: any;
  pdfSrc: string = '';  // Variável para armazenar a URL do PDF

  constructor(private saldoEstoqueService: SaldoEstoqueService) {}

  ngOnInit(): void {
    this.getSaldoEstoque();
  }

  getSaldoEstoque() {
    this.saldoEstoqueService.getSaldoEstoque().subscribe(
      (data: any[]) => {
        console.log('Dados recebidos:', data);  // Verifique os dados aqui
        this.saldoEstoque = data;
      },
      (error: any) => {
        console.error('Erro ao buscar dados de saldo de estoque', error);
      }
    );
  }

  gerarPDF() {
    // Verifica se os dados estão corretos antes de gerar o PDF
    if (this.saldoEstoque.length === 0) {
      alert('Nenhum dado disponível para gerar o PDF');
      return;
    }

    const doc = new jsPDF();
    doc.text('Relatório de Saldo de Estoque', 10, 10);

    // Verifica se os dados estão corretos
    console.log('Dados sendo enviados para o PDF:', this.saldoEstoque);

    // Gera a tabela no PDF com os dados
    (doc as any).autoTable({
      head: [['Codigo', 'Quantidade', 'Valor Unitário', 'Valor Total', 'Atualizado Em']],
      body: this.saldoEstoque.map(item => [
        item.produto_id,
        item.quantidade,
        item.valor_unitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        item.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        new Date(item.updated_at).toLocaleDateString()
      ])
    });

    // Gera o PDF como Blob
    const blob = doc.output('blob');

    // Cria uma URL para o Blob e armazena no pdfSrc
    const url = URL.createObjectURL(blob);
    this.pdfSrc = url;
  }
}
