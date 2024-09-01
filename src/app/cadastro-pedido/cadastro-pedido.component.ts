import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { IgrejaService } from '../igreja.service';
import { Produto } from '../models/produto';
import { Igreja } from '../models/igreja';
import { Pedido, PedidoItem } from '../models/pedido';
import { PedidoService } from '../pedido.service';
import { SaldoEstoqueService } from '../Saldo_Estoque.service';  // Novo serviço para buscar o preço unitário

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

  constructor(
    private igrejaService: IgrejaService, 
    private produtoService: ProdutoService, 
    private pedidoService: PedidoService,
    private saldoEstoqueService: SaldoEstoqueService  // Novo serviço para pegar preço unitário
  ) {}

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
      const produtoId = this.produtoSelecionado.id;  // Aqui não precisamos mais do operador opcional porque já garantimos que produtoSelecionado não é null.
  
      if (produtoId !== null && produtoId !== undefined) {  // Verifica explicitamente se o produtoId é válido
        // Buscar preço unitário da tabela saldo_estoque
        this.saldoEstoqueService.getPrecoUnitario(produtoId).subscribe(precoUnitario => {
          const item: PedidoItem = {
            pedido_id: this.pedido.id || 0,  // Use 0 como valor padrão até que o id seja definido
            produto_id: produtoId,
            quantidade: this.quantidade,
            preco_unitario: precoUnitario,
            desconto: 0,
            valor_total: this.quantidade * precoUnitario  // Calcula o valor total do item
          };
          this.pedido.pedido_itens.push(item);  // Adiciona o item ao array de itens do pedido
          this.calcularValorTotal();  // Atualiza o valor total do pedido
        });
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
      // Limpar o formulário ou fazer outras ações após o sucesso
    });
  }
}
