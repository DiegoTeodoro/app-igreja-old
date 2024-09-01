export interface PedidoItem {
    id?: number;
    pedido_id: number | null | undefined;
    produto_id: number | null | undefined;
    quantidade: number;
    preco_unitario: number;
    desconto: number;
    valor_total: number;
  }