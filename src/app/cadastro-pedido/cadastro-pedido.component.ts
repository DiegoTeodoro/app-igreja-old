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

  // Método para finalizar o pedido e atualizar o saldo de estoque
  finalizarPedido(): void {
    if (!this.pedido.igreja_id || !this.pedido.data_pedido || !this.pedido.recebedor || this.pedido.pedido_itens.length === 0) {
      console.error('Por favor, preencha todos os campos obrigatórios e adicione pelo menos um item ao pedido.');
      return;
    }

    const dataFormatada = this.pedido.data_pedido.toISOString().slice(0, 10);

    const pedidoParaEnvio = {
      ...this.pedido,
      data_pedido: dataFormatada
    };

    // Verificar o pedido antes do envio
    console.log('Pedido para envio:', pedidoParaEnvio);

    this.pedidoService.createPedido(pedidoParaEnvio).subscribe(
      (response: any) => {
        const pedidoId = response.id;
        const itensParaSalvar = this.pedido.pedido_itens.map(item => ({
          ...item,
          pedido_id: pedidoId  // Atribua o pedido_id correto
        }));

        // Verificar os itens antes do envio
        console.log('Itens do pedido para salvar:', itensParaSalvar);

        // Enviar cada item do pedido e atualizar o saldo de estoque
        itensParaSalvar.forEach(item => {
          this.pedidoService.createPedidoItem(item).subscribe(
            () => {
              console.log('Item do pedido salvo com sucesso:', item);
              this.atualizarSaldoEstoque(item.produto_id!, item.quantidade); // Atualizar o saldo de estoque
            },
            (error) => console.error('Erro ao salvar item do pedido:', error)
          );
        });

        console.log('Pedido finalizado com sucesso');
        this.limparFormulario();
      },
      (error) => {
        console.error('Erro ao finalizar pedido:', error);
      }
    );
  }

  // Método para atualizar o saldo de estoque
  atualizarSaldoEstoque(produtoId: number, quantidade: number): void {
    this.saldoEstoqueService.getSaldoEstoque().subscribe((saldos) => {
      const saldo = saldos.find(s => s.produto_id === produtoId);
      if (saldo) {
        const novaQuantidade = saldo.quantidade - quantidade;
  
        if (novaQuantidade >= 0) {
          // Atualize o saldo de estoque no banco de dados
          const novoSaldo = { ...saldo, quantidade: novaQuantidade };
  
          this.saldoEstoqueService.updateSaldoEstoque(novoSaldo).subscribe(
            () => console.log('Saldo de estoque atualizado com sucesso para o produto:', produtoId),
            (error: any) => console.error('Erro ao atualizar saldo de estoque:', error)
          );
        } else {
          console.error('Quantidade em estoque insuficiente para o produto:', produtoId);
        }
      } else {
        console.error('Produto não encontrado no saldo de estoque:', produtoId);
      }
    });
  }
  
  // Função para limpar o formulário após finalizar o pedido
  limparFormulario(): void {
    this.pedido = {
      igreja_id: 0,
      data_pedido: new Date(),
      status: 'Pendente',
      preco: 0,
      valor_total: 0,
      pedido_itens: [],
      recebedor: ''
    };
    this.dataSource.data = []; // Limpar a tabela de itens
    this.produtoSelecionado = null;
    this.quantidade = 0;
    this.precoUnitario = 0;
  }

  // Método auxiliar para buscar o nome do produto
  obterNomeProduto(produtoId: number): string {
    const produto = this.produtos.find(p => p.id === produtoId);
    return produto ? produto.nome : 'Produto não encontrado';
  }
}
