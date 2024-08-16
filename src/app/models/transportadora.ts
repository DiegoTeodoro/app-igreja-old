export interface Transportadora {
    id?: number;
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
    inscricao_estadual?: string;
    telefone_fixo?: string;
    telefone_celular?: string;
    email?: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cep: string;
    cidade_codigo: string;
    uf_codigo: string;
}
