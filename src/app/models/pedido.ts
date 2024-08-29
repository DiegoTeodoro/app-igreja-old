import { PedidoItem } from "./PedidoItem";

export interface Pedido {
    id?: number;
    igreja_id: number;
    data_pedido: Date;
    status: 'Pendente' | 'Processando' | 'Entregue' | 'Cancelado';
    preco: number;
    valor_total: number;
    observacao?: string;
    pedido_itens: PedidoItem[];
  }

export { PedidoItem };
