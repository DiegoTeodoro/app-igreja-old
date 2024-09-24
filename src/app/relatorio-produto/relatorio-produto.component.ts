import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  // Importar DomSanitizer
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-relatorio-produto',
  templateUrl: './relatorio-produto.component.html',
  styleUrls: ['./relatorio-produto.component.css']
})
export class RelatorioProdutoComponent implements OnInit {
  produtos: any[] = [];
  pdfSrc: SafeResourceUrl = '';  // Variável para armazenar o caminho do PDF gerado
  displayedColumns: string[] = ['id', 'nome', 'volume', 'codigo_barras', 'marca', 'categoria_nome', 'fornecedor_nome'];

  constructor(private produtoService: ProdutoService, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.loadProdutos();
  }
  
  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe((produtos: any[]) => {
      this.produtos = produtos;
      console.log('Produtos carregados:', this.produtos);  // Verifica se os produtos estão sendo carregados
    }, error => {
      console.error('Erro ao carregar produtos', error);
    });
  }
  

  gerarPDF() {
    console.log('Gerando PDF...');  // Verificar se o método é chamado
  
    const doc = new jsPDF({ orientation: 'landscape' });  // Define o PDF em modo paisagem
  
    // Cabeçalho do documento
    doc.text('Relatório de Produtos', 10, 10);
  
    // Gera a tabela de produtos
    (doc as any).autoTable({
      head: [['ID', 'Nome', 'Volume', 'Código de Barras', 'Marca', 'Categoria', 'Fornecedor']],
      body: this.produtos.map(produto => [
        produto.id,
        produto.nome,
        produto.volume,
        produto.codigo_barras,
        produto.marca,
        produto.categoria_nome,
        produto.fornecedor_nome
      ]),
    });
  
    // Gera o PDF como um blob e o exibe no iframe
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}  