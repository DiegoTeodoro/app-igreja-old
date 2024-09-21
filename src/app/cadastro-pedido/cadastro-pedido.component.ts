import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { IgrejaService } from '../igreja.service';
import { Produto } from '../models/produto';
import { Igreja } from '../models/igreja';
import { Pedido, PedidoItem } from '../models/pedido';
import { PedidoService } from '../pedido.service';
import { SaldoEstoqueService } from '../Saldo_Estoque.service'; // Serviço para pegar preço unitário
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {
  igrejas: Igreja[] = [];
  produtos: Produto[] = [];
  pedido: Pedido = {
    igreja_id: 0,
    data_pedido: new Date(),
    status: 'Pendente',
    preco: 0,
    valor_total: 0,
    pedido_itens: [],
    recebedor: ''
  };
  produtoSelecionado: Produto | null = null;
  quantidade: number = 0;
  precoUnitario: number = 0;
  displayedColumns: string[] = ['produto', 'quantidade', 'preco_unitario', 'valor_total'];
  dataSource = new MatTableDataSource(this.pedido.pedido_itens); // DataSource para a tabela

  constructor(
    private igrejaService: IgrejaService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private saldoEstoqueService: SaldoEstoqueService // Serviço para pegar preço unitário
  ) {}

  ngOnInit(): void {
    this.carregarIgrejas();
    this.carregarProdutos();
    this.pedido.data_pedido = new Date();
  }

  carregarIgrejas(): void {
    this.igrejaService.getIgrejas().subscribe(igrejas => this.igrejas = igrejas);
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(produtos => this.produtos = produtos);
  }

  // Método para carregar o preço unitário quando um produto é selecionado
  carregarValorUnitario(): void {
    if (this.produtoSelecionado && this.produtoSelecionado.id) {
      const produtoId = this.produtoSelecionado.id;

      // Buscar o valor unitário com base no produto selecionado
      this.saldoEstoqueService.getPrecoUnitario(produtoId).subscribe(
        (response: any) => {
          this.precoUnitario = response.preco_unitario;
        },
        (error) => {
          console.error("Erro ao buscar preço unitário:", error);
        }
      );
    }
  }

  // Método para adicionar um produto à lista de itens do pedido
  adicionarProduto(): void {
    if (this.produtoSelecionado && this.quantidade > 0 && this.precoUnitario > 0) {
      const produtoId = this.produtoSelecionado.id;

      if (produtoId !== null && produtoId !== undefined) {
        const item: PedidoItem = {
          pedido_id: this.pedido.id || 0,
          produto_id: produtoId,
          quantidade: this.quantidade,
          preco_unitario: this.precoUnitario,
          desconto: 0,
          valor_total: this.quantidade * this.precoUnitario
        };

        // Adiciona o item ao array de itens do pedido
        this.pedido.pedido_itens.push(item);
        
        // Atualiza o DataSource com os novos itens
        this.dataSource.data = [...this.pedido.pedido_itens];
        this.calcularValorTotal();
      } else {
        console.error("Produto selecionado não possui ID válido.");
      }
    }
  }

  // Método para calcular o valor total do pedido
  calcularValorTotal(): void {
    this.pedido.valor_total = this.pedido.pedido_itens.reduce((total, item) => {
      return total + item.valor_total;
    }, 0);
  }

  // Método para finalizar o pedido
  finalizarPedido(): void {
    this.pedidoService.createPedido(this.pedido).subscribe(() => {
      console.log('Pedido finalizado');
      // Limpar o formulário ou realizar outras ações
    });
  }

  // Método auxiliar para buscar o nome do produto
  obterNomeProduto(produtoId: number): string {
    const produto = this.produtos.find(p => p.id === produtoId);
    return produto ? produto.nome : 'Produto não encontrado';
  }
}
