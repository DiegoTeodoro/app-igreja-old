export interface Produto {
  preco: number;
  id?: number | null;
  nome: string;
  marca: string;
  codigo_barras: string;
  volume: string;
  categoria_id?: number | null;
  fornecedor_id?: number | null;
  observacao?: string;
}
