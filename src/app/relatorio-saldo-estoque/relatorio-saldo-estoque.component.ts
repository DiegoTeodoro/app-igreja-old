import { Component, OnInit } from '@angular/core';
import { SaldoEstoqueService } from '../Saldo_Estoque.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  // Importar DomSanitizer


@Component({
  selector: 'app-relatorio-saldo-estoque',
  templateUrl: './relatorio-saldo-estoque.component.html',
  styleUrls: ['./relatorio-saldo-estoque.component.css']
})
export class RelatorioSaldoEstoqueComponent implements OnInit {

  saldoEstoque: any[] = [];
  pdfSrc: SafeResourceUrl = '';
  totalEstoque: number = 0; // Variável para armazenar o valor total
displayedColumns: any;

  constructor(
    private saldoEstoqueService: SaldoEstoqueService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getSaldoEstoque();
  }

  // Método para obter o saldo de estoque e calcular o total
  getSaldoEstoque() {
    this.saldoEstoqueService.getSaldoEstoque().subscribe(
      (data: any[]) => {
        this.saldoEstoque = data;
        this.calcularTotalEstoque(); // Chama o método para calcular o total
      },
      (error: any) => {
        console.error('Erro ao buscar dados de saldo de estoque', error);
      }
    );
  }
  onProdutoSelect(produtoId: number) {
    this.saldoEstoqueService.getPrecoUnitario(produtoId).subscribe((precoUnitario: number) => {
      console.log('Preço unitário recebido:', precoUnitario);
      // Lógica adicional para tratar o preço unitário
    });
  }
  
  // Método para calcular o valor total do estoque
  calcularTotalEstoque() {
    this.totalEstoque = this.saldoEstoque.reduce((acc, item) => acc + item.valor_total, 0);
  }

  gerarPDF() {
    if (this.saldoEstoque.length === 0) {
      alert('Nenhum dado disponível para gerar o PDF');
      return;
    }
  
    const doc = new jsPDF({ orientation: 'landscape' }); // Define o PDF em modo paisagem
    doc.text('Relatório de Saldo de Estoque', 10, 10);
  
    // Gerar tabela com os dados
    (doc as any).autoTable({
      head: [['Codigo','Produto', 'Quantidade', 'Valor Unitário', 'Valor Total', 'Atualizado Em']],
      body: this.saldoEstoque.map(item => [
        item.produto_id,
        item.produto_nome,
        item.quantidade,
        item.valor_unitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        item.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        new Date(item.updated_at).toLocaleDateString()
      ])
    });
  
    // Adicionar linha final com o valor total do estoque
    const valorTotal = this.totalEstoque.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    (doc as any).autoTable({
      body: [['', '', '', 'Valor Total Estoque:', valorTotal]],
      startY: (doc as any).lastAutoTable.finalY + 10,  // Define a posição logo após a tabela
      theme: 'plain',  // Remove bordas
      styles: {
        halign: 'right', // Alinha à direita
        fontStyle: 'bold' // Texto em negrito
      }
    });
  
    // Abrir o PDF em uma nova aba para visualização antes da impressão
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url); // Abrir o PDF em uma nova aba
  
    // Caso precise de um iframe para visualização específica (opcional):
    // this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
}