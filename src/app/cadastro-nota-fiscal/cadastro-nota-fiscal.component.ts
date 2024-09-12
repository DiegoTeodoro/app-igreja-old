import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { NotaFiscal } from '../models/nota-fiscal';
import { ItemNotaFiscal } from '../models/itens-nota-fiscal';
import { FornecedorService } from '../fornecedor.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-cadastro-nota-fiscal',
  templateUrl: './cadastro-nota-fiscal.component.html',
  styleUrls: ['./cadastro-nota-fiscal.component.css']
})
export class CadastroNotaFiscalComponent implements OnInit {
onProdutoSelect($event: MatSelectChange,_t89: AbstractControl<any,any>) {
throw new Error('Method not implemented.');
}
  // Mantém o restante da classe igual...
  
  notaFiscalForm!: FormGroup;
  fornecedores: { id: number; nome_fantasia: string }[] = [];
  produtos: { id: number; nome: string }[] = [];
  displayedColumns: string[] = ['produto', 'quantidade', 'valor_unitario', 'valor_total', 'actions'];
  dataSource: any = [];

  constructor(private fb: FormBuilder, private fornecedorService: FornecedorService) {}

  // Getter para acessar o FormArray de itens no template
  get itens(): FormArray {
    return this.notaFiscalForm.get('itens') as FormArray;
  }

  ngOnInit(): void {
    this.notaFiscalForm = this.fb.group({
      numero_nota: ['', Validators.required],
      serie: ['', Validators.required],
      data_emissao: ['', Validators.required],
      chave_acesso: ['', Validators.required],
      fornecedor_id: [0, Validators.required],
      cnpj: ['', Validators.required],
      observacoes: [''],
      itens: this.fb.array([this.createItem()]) // Adiciona um item inicial
    });

    // Carregar fornecedores
    this.fornecedorService.getFornecedores().subscribe((data: any) => {
      this.fornecedores = data;
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      produto_id: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(1)]],
      valor_unitario: ['', Validators.required],
      valor_total: [{ value: '', disabled: true }]
    });
  }

  addItem() {
    const newItem = this.itens.at(0); // Pega o primeiro item do FormArray (apenas um item é necessário)
    const itemData = {
      produto_id: newItem.get('produto_id')?.value,
      quantidade: newItem.get('quantidade')?.value,
      valor_unitario: newItem.get('valor_unitario')?.value,
      valor_total: newItem.get('valor_total')?.value,
    };

    // Adiciona os dados do item no dataSource
    this.dataSource = [...this.dataSource, itemData];

    // Limpa o formulário após adicionar o item
    newItem.reset();
  }

  calculateTotal(index: number) {
    const item = this.itens.at(index);
    const quantidade = item.get('quantidade')?.value;
    const valorUnitario = item.get('valor_unitario')?.value;
    const total = quantidade * valorUnitario;
    item.get('valor_total')?.setValue(total); // Calculando o total
  }

  calcularTotalNota(): number {
    return this.dataSource.reduce((acc: number, item: any) => acc + (item.quantidade * item.valor_unitario), 0);
  }
  
  onSubmit() {
    if (this.notaFiscalForm.valid) {
      // Cria uma nova instância de NotaFiscal garantindo que os tipos sejam corretamente atribuídos
      const notaFiscal: NotaFiscal = {
        numero_nota: this.notaFiscalForm.get('numero_nota')?.value,
        serie: this.notaFiscalForm.get('serie')?.value,
        chave_acesso: this.notaFiscalForm.get('chave_acesso')?.value,
        data_emissao: new Date(this.notaFiscalForm.get('data_emissao')?.value), // Converte a data para o tipo Date
        valor_total: 0, // Inicializa com 0
        valor_total_produtos: 0, // Inicializa com 0
        fornecedor_id: this.notaFiscalForm.get('fornecedor_id')?.value,
        cnpj: this.notaFiscalForm.get('cnpj')?.value,
        observacoes: this.notaFiscalForm.get('observacoes')?.value,
      };
  
      // Calcular os valores totais dos itens
      notaFiscal.valor_total_produtos = this.dataSource.reduce((sum: number, item: { valor_total: number | undefined }) => {
        return sum + Number(item.valor_total ?? 0); // Converte o valor para number e garante que não seja undefined
      }, 0);
  
      // Usa o operador de coalescência nula para garantir que o valor atribuído seja um número
      notaFiscal.valor_total = notaFiscal.valor_total_produtos ?? 0;
  
      // Enviar os dados da nota e itens para o backend (adicione aqui a lógica de envio)
      console.log('Nota Fiscal submetida', notaFiscal);
    } else {
      console.error('Formulário inválido');
    }
  }
  
}  