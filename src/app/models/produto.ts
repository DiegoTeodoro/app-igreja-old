export interface Produto {
  id?: number;
  nome: string;
  codigo_barra: string;
  categoria_id: number;
  volume: string;         // Adicionando a propriedade volume
  observacao?: string;    // Adicionando a propriedade observacao
}