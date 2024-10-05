import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../Pedido.Service';
import { Pedido, PedidoItem } from '../models/Pedido';
import { SaldoEstoqueService } from '../Saldo_Estoque.service';
import { NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Empresa } from '../models/empresa';

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {

  @ViewChild('pedidoForm') pedidoForm!: NgForm;

  pedido: Pedido = {
    igreja_id: 0,
    data_pedido: new Date(),
    status: 'Pendente',
    valor_total: 0,
    recebedor: '',
    pedido_itens: []
  };

  igrejas: any[] = [];
  produtos: any[] = [];
  dataSource: PedidoItem[] = [];
  displayedColumns: string[] = ['produto', 'quantidade', 'valor_unitario', 'valor_total', 'acoes'];

  itemEmEdicaoIndex: number | null = null; // Variável para rastrear qual item está sendo editado

  constructor(
    private pedidoService: PedidoService,
    private saldoEstoqueService: SaldoEstoqueService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarIgrejas();
    this.carregarProdutos();
  }

  carregarIgrejas() {
    this.pedidoService.getIgrejas().subscribe((dados: any[]) => {
      this.igrejas = dados;
    }, error => {
      console.error("Erro ao carregar igrejas: ", error);
    });
  }

  carregarProdutos() {
    this.pedidoService.getProdutos().subscribe((dados: any[]) => {
      this.produtos = dados;
    }, error => {
      console.error("Erro ao carregar produtos: ", error);
    });
  }

  adicionarItem() {
    if (!this.pedido.produto_id || !this.pedido.quantidade) {
      this.snackBar.open('Por favor, preencha os campos Produto e Quantidade para adicionar um item.', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    const produtoSelecionado = this.produtos.find(produto => produto.id === this.pedido.produto_id);
    if (produtoSelecionado) {
      const valorTotal = this.pedido.valor_unitario * this.pedido.quantidade;

      const novoItem: PedidoItem = {
        produto_nome: produtoSelecionado.nome,
        quantidade: this.pedido.quantidade,
        valor_unitario: this.pedido.valor_unitario,
        valor_total: valorTotal,
        produto_id: produtoSelecionado.id
      };

      if (this.itemEmEdicaoIndex !== null) {
        // Se estamos editando um item, atualizamos o item existente
        this.pedido.pedido_itens[this.itemEmEdicaoIndex] = novoItem;
        this.itemEmEdicaoIndex = null; // Finaliza o modo de edição
      } else {
        // Caso contrário, adicionamos um novo item
        this.pedido.pedido_itens.push(novoItem);
      }

      this.atualizarDataSource();
      this.limparCamposItensPedido();
    }
  }

  limparCamposItensPedido() {
    this.pedido.produto_id = null;
    this.pedido.quantidade = null;
    this.pedido.valor_unitario = null;
  }

  atualizarDataSource() {
    this.dataSource = [...this.pedido.pedido_itens];
  }

  async finalizarPedido() {
    this.pedido.valor_total = this.pedido.pedido_itens.reduce((acc, item) => acc + item.valor_total, 0);
  
    // Gerar o recibo em PDF antes de enviar ao backend
    this.gerarReciboPDF();
  
    const pedidoParaEnviar = {
      ...this.pedido,
      data_pedido: this.formatDateToMySQL(this.pedido.data_pedido)
    };
  
    try {
      await this.pedidoService.registrarPedido(pedidoParaEnviar).toPromise();
      await Promise.all(
        this.pedido.pedido_itens.map(item => {
          return this.saldoEstoqueService.updateSaldoEstoque(item.produto_id, item.quantidade).toPromise();
        })
      );
  
      this.snackBar.open('Pedido finalizado com sucesso!', 'Fechar', {
        duration: 3000,
      });
  
      this.limparCampos();
    } catch (error) {
      console.error('Erro ao salvar o pedido ou atualizar o saldo de estoque:', error);
    }
  }
  

  limparCampos() {
    this.pedido = {
      igreja_id: 0,
      data_pedido: new Date(),
      status: 'Pendente',
      valor_total: 0,
      recebedor: '',
      pedido_itens: []
    };

    this.dataSource = [];

    if (this.pedidoForm) {
      this.pedidoForm.resetForm();
    }

    this.cdr.detectChanges();
  }

  formatDateToMySQL(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }

  atualizarValorUnitario(event: any) {
    const produtoId = event.value;
    this.saldoEstoqueService.getPrecoUnitario(produtoId).subscribe((response: any) => {
      this.pedido.valor_unitario = response.preco_unitario;
    }, (error: any) => {
      console.error("Erro ao buscar o valor unitário: ", error);
    });
  }

  // Método para deletar o item do pedido
  onDelete(element: PedidoItem) {
    const index = this.pedido.pedido_itens.indexOf(element);
    if (index !== -1) {
      this.pedido.pedido_itens.splice(index, 1); // Remove o item da lista
      this.atualizarDataSource(); // Atualiza a tabela
    }
  }

  // Método para editar o item do pedido
  onEdit(element: PedidoItem) {
    const index = this.pedido.pedido_itens.indexOf(element);
    if (index !== -1) {
      // Preencher o formulário com os dados do item selecionado
      this.pedido.produto_id = element.produto_id;
      this.pedido.quantidade = element.quantidade;
      this.pedido.valor_unitario = element.valor_unitario;

      // Armazena o índice do item que está sendo editado
      this.itemEmEdicaoIndex = index;
    }
  }

 
  async gerarReciboPDF() {
    try {
      const doc = new jsPDF();
  
      // Largura da página A4 em jsPDF (210mm)
      const pageWidth = doc.internal.pageSize.getWidth();
  
      // Cabeçalho - Informações da empresa e data (dados fixos)
      doc.setFontSize(14);
      
      // Centralizar o nome da empresa
      const nomeEmpresa = 'Congregação - Parque São Jorge';
      const nomeEmpresaWidth = doc.getTextWidth(nomeEmpresa);
      doc.text(nomeEmpresa, (pageWidth - nomeEmpresaWidth) / 2, 10);
  
      // Centralizar o endereço
      doc.setFontSize(12);
      const enderecoEmpresa = 'R. Antônio Paiva Catalão, 548';
      const enderecoEmpresaWidth = doc.getTextWidth(enderecoEmpresa);
      doc.text(enderecoEmpresa, (pageWidth - enderecoEmpresaWidth) / 2, 20);
  
      // Centralizar o CNPJ
      const cnpjEmpresa = 'CNPJ: 25.648.510/0009-58';
      const cnpjEmpresaWidth = doc.getTextWidth(cnpjEmpresa);
      doc.text(cnpjEmpresa, (pageWidth - cnpjEmpresaWidth) / 2, 30);
  
      // Centralizar a data
      const dataAtual = `Data: ${new Date().toLocaleDateString()}`;
      const dataAtualWidth = doc.getTextWidth(dataAtual);
      doc.text(dataAtual, (pageWidth - dataAtualWidth) / 2, 40);
  
      // Tabela de itens do pedido
      let yPosition = 60;
      doc.setFontSize(12);
      doc.text('Itens do Pedido:', 10, yPosition);
  
      yPosition += 10;
  
      // Cabeçalho da tabela
      doc.text('Codigo', 10, yPosition);
      doc.text('Nome', 30, yPosition);
      doc.text('Quantidade', 100, yPosition);
      doc.text('Valor Unitário', 130, yPosition);
      doc.text('Total', 160, yPosition);
  
      // Desenhar uma linha abaixo do cabeçalho
      doc.line(10, yPosition + 2, 200, yPosition + 2);
  
      // Listar os itens do pedido
      this.pedido.pedido_itens.forEach((item, index) => {
        yPosition += 10;
        doc.text(`${index + 1}`, 10, yPosition);
        doc.text(item.produto_nome, 30, yPosition);
        doc.text(`${item.quantidade}`, 100, yPosition);
        doc.text(`R$ ${item.valor_unitario.toFixed(2)}`, 130, yPosition);
        doc.text(`R$ ${item.valor_total.toFixed(2)}`, 160, yPosition);
      });
  
      // Total Geral
      yPosition += 20;
      doc.text(`Total: R$ ${this.pedido.valor_total.toFixed(2)}`, 160, yPosition);
  
      // Rodapé - Recebedor
      yPosition += 30;
      doc.text('Recebedor: ___________________________', 10, yPosition + 10);
      doc.text(`Nome: ${this.pedido.recebedor}`, 10, yPosition + 20);
  
      // Visualizar PDF no navegador
      window.open(doc.output('bloburl'), '_blank');
    } catch (error) {
      console.error('Erro ao gerar recibo:', error);
    }
  }
  
  
}  