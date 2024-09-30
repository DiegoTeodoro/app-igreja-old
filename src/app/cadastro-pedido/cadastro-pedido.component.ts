import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../Pedido.Service'; // Importar o serviço de pedidos
import { Pedido, PedidoItem } from '../models/Pedido'; // Modelo do pedido e itens
import { SaldoEstoqueService } from '../Saldo_Estoque.service'; // Importar o serviço de Saldo Estoque
import { NgForm } from '@angular/forms'; // Importar NgForm para resetar o formulário

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {

  @ViewChild('pedidoForm') pedidoForm!: NgForm; // Referência ao formulário

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
  displayedColumns: string[] = ['produto', 'quantidade', 'valor_unitario', 'valor_total'];

  constructor(
    private pedidoService: PedidoService,
    private saldoEstoqueService: SaldoEstoqueService
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
    const produtoSelecionado = this.produtos.find(produto => produto.id === this.pedido.produto_id);
    if (produtoSelecionado) {
      const valorUnitario = this.pedido.valor_unitario;
      const quantidade = this.pedido.quantidade;
      const valorTotal = valorUnitario * quantidade;
  
      const novoItem: PedidoItem = {
        produto_nome: produtoSelecionado.nome,
        quantidade: quantidade,
        valor_unitario: valorUnitario,
        valor_total: valorTotal,
        produto_id: produtoSelecionado.id // Corrigir o ID do produto selecionado
      };
  
      this.pedido.pedido_itens.push(novoItem);
      this.atualizarDataSource();
    }
  }

  atualizarDataSource() {
    this.dataSource = [...this.pedido.pedido_itens];  // Clonar o array para atualizar a tabela
  }

  finalizarPedido() {
    this.pedido.valor_total = this.pedido.pedido_itens.reduce((acc, item) => acc + item.valor_total, 0);
  
    const dataPedidoMySQL = this.formatDateToMySQL(this.pedido.data_pedido);
  
    const pedidoParaEnviar = {
      ...this.pedido,
      data_pedido: dataPedidoMySQL
    };
  
    // Enviar o pedido e os itens para o serviço
    this.pedidoService.registrarPedido(pedidoParaEnviar).subscribe(response => {
      console.log('Pedido salvo com sucesso!', response);
  
      // Atualizar o saldo de estoque para cada item do pedido
      this.pedido.pedido_itens.forEach(item => {
        this.saldoEstoqueService.updateSaldoEstoque(item.produto_id, item.quantidade).subscribe(res => {
          console.log(`Saldo de estoque atualizado para o produto ${item.produto_id}: diminuiu ${item.quantidade} unidades.`);
        }, error => {
          console.error(`Erro ao atualizar saldo de estoque para o produto ${item.produto_id}:`, error);
        });
      });
  
      // Limpar o formulário após salvar o pedido
      this.limparFormulario();
    }, error => {
      console.error('Erro ao salvar o pedido:', error);
    });
  }
  

  formatDateToMySQL(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  limparFormulario() {
    // Reset the pedido object
    this.pedido = {
      igreja_id: 0,
      data_pedido: new Date(),
      status: 'Pendente',
      valor_total: 0,
      recebedor: '',
      pedido_itens: []
    };
  
    // Clear the DataSource for the table
    this.dataSource = [];
  
    // Reset the form itself if it's available
    if (this.pedidoForm) {
      this.pedidoForm.resetForm();
    }
  }
  

  atualizarValorUnitario(event: any) {
    const produtoId = event.value;

    this.saldoEstoqueService.getPrecoUnitario(produtoId).subscribe((response: any) => {
      this.pedido.valor_unitario = response.preco_unitario;
    }, (error: any) => {
      console.error("Erro ao buscar o valor unitário: ", error);
    });
  }
}