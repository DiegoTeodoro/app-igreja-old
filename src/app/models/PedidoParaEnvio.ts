import { Pedido } from "./pedido";

export interface PedidoParaEnvio extends Omit<Pedido, 'data_pedido'> {
  data_pedido: string;
}
