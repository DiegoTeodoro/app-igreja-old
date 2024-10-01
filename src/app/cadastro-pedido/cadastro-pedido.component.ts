import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../Pedido.Service'; // Importar o serviço de pedidos
import { Pedido, PedidoItem } from '../models/Pedido'; // Modelo do pedido e itens
import { SaldoEstoqueService } from '../Saldo_Estoque.service'; // Importar o serviço de Saldo Estoque
import { NgForm } from '@angular/forms'; // Importar NgForm para resetar o formulário
import { ChangeDetectorRef } from '@angular/core'; // Importar ChangeDetectorRef
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  displayedColumns: string[] = ['produto', 'quantidade', 'valor_unitario', 'valor_total', 'acoes'];


  constructor(
    private pedidoService: PedidoService,
    private saldoEstoqueService: SaldoEstoqueService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar // Injetando MatSnackBar
  ) {}
  

  ngOnInit(): void {
    this.pedido.status = 'Processando'; // Definir o status como Processando ao iniciar
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
    // Verificar se o produto e a quantidade foram selecionados
    if (!this.pedido.produto_id || !this.pedido.quantidade) {
      this.snackBar.open('Por favor, preencha os campos Produto e Quantidade para adicionar um item.', 'Fechar', {
        duration: 3000,  // Duração da mensagem em milissegundos
      });
      return;  // Não adiciona o item se a validação falhar
    }
  
    // Sempre definir o status como "Processando"
    this.pedido.status = 'Processando';
  
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
        produto_id: produtoSelecionado.id
      };
  
      this.pedido.pedido_itens.push(novoItem);
      this.atualizarDataSource();
  
      // Limpar os campos da seção de itens do pedido
      this.limparCamposItensPedido();
    }
  }
  

  limparCamposItensPedido() {
    this.pedido.produto_id = null;  // Limpar o campo de produto
    this.pedido.quantidade = null;  // Limpar o campo de quantidade
    this.pedido.valor_unitario = null;  // Limpar o campo de valor unitário
  }
  
  atualizarDataSource() {
    this.dataSource = [...this.pedido.pedido_itens];  // Clonar o array para atualizar a tabela
  }

  finalizarPedido() {
    this.pedido.valor_total = this.pedido.pedido_itens.reduce((acc, item) => acc + item.valor_total, 0);
  
    // Alterar o status para "Entregue"
    this.pedido.status = 'Entregue';
  
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
  
      console.log('Recarregando a página...');
      window.location.reload();  // Recarregar a página
  
    }, error => {
      console.error('Erro ao salvar o pedido:', error);
    });
  }
  
  
  onEdit(element: PedidoItem) {
    // Preencher os campos do formulário com os dados do item a ser editado
    this.pedido.produto_id = element.produto_id;
    this.pedido.quantidade = element.quantidade;
    this.pedido.valor_unitario = element.valor_unitario;
  
    // Remover o item da lista para edição
    const index = this.pedido.pedido_itens.indexOf(element);
    if (index !== -1) {
      this.pedido.pedido_itens.splice(index, 1);
    }
  
    // Atualizar a tabela
    this.atualizarDataSource();
  }
  
  onDelete(element: PedidoItem) {
    const index = this.pedido.pedido_itens.indexOf(element);
    if (index !== -1) {
      this.pedido.pedido_itens.splice(index, 1);
    }
  
    // Atualizar a tabela
    this.atualizarDataSource();
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

  // Limpar o formulário após salvar o pedido
  limparFormulario() {
    // Verificar se o formulário existe antes de resetá-lo
    if (this.pedidoForm) {
      // Reseta os campos do formulário para seus valores padrão
      this.pedidoForm.reset({
        igreja_id: '',
        data_pedido: '',
        status: 'Pendente',
        recebedor: '',
        produto_id: '',
        quantidade: '',
        valor_unitario: '',
        pedido_itens: []
      });
  
      // Limpar os itens da tabela
      this.dataSource = [];
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