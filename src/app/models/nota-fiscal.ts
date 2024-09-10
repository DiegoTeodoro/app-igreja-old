export interface NotaFiscal {
    get(arg0: string): unknown;
    value: NotaFiscal;
    id?: number;
    numero_nota: string;
    serie: string;
    chave_acesso?: string;
    data_emissao: Date;
    valor_total: number;
    valor_total_produtos?: number;
    valor_total_nota?: number;
    fornecedor_id?: number;
    transportadora_id?: number;
    observacoes?: string;
    created_at?: Date;
    updated_at?: Date;
}