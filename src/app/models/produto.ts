export interface Produto {
  id?: number;
  codigo: string;
  nome: string;
  marca: string;
  fornecedor: string;
  codigo_barra: string;
  categoria_id: number;
  volume: string;
  observacao: string;
}