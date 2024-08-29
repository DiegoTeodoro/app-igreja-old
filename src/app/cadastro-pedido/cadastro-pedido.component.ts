import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { IgrejaService } from '../igreja.service';
import { Produto } from '../models/produto';
import { Igreja } from '../models/igreja';
import { Pedido, PedidoItem } from '../models/pedido';
import { PedidoService } from '../pedido.service';

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
    pedido_itens: []
  };
  produtoSelecionado: Produto | null = null;
  quantidade: number = 0;
  displayedColumns: string[] = ['produto', 'quantidade', 'preco_unitario', 'valor_total'];

  constructor(private igrejaService: IgrejaService, private produtoService: ProdutoService, private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carregarIgrejas();
    this.carregarProdutos();
  }

  carregarIgrejas(): void {
    this.igrejaService.getIgrejas().subscribe(igrejas => this.igrejas = igrejas);
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(produtos => this.produtos = produtos);
  }

  // Método para buscar o nome do produto com base no produto_id
  obterNomeProduto(produtoId: number): string {
    const produto = this.produtos.find(p => p.id === produtoId);
    return produto ? produto.nome : 'Produto não encontrado';
  }

  // Método para adicionar um produto à lista de itens do pedido
  adicionarProduto(): void {
    if (this.produtoSelecionado && this.quantidade > 0) {
      const item: PedidoItem = {
        pedido_id: this.pedido.id!,
        produto_id: this.produtoSelecionado.id,
        quantidade: this.quantidade,
        preco_unitario: this.produtoSelecionado.preco,
        desconto: 0
      };
      this.pedido.pedido_itens.push(item);
      this.calcularValorTotal();
    }
  }

  // Método para calcular o valor total do pedido
  calcularValorTotal(): void {
    this.pedido.valor_total = this.pedido.pedido_itens.reduce((total, item) => {
      return total + (item.quantidade * item.preco_unitario);
    }, 0);
  }

  // Método para finalizar o pedido
  finalizarPedido(): void {
    this.pedidoService.createPedido(this.pedido).subscribe(() => {
      console.log('Pedido finalizado');
      // Limpar o formulário ou fazer outras ações após o sucesso
    });
  }
}