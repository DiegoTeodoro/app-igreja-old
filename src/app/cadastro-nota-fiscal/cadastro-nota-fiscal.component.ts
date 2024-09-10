import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotaFiscal } from '../models/nota-fiscal';
import { ItemNotaFiscal } from '../models/itens-nota-fiscal';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-cadastro-nota-fiscal',
  templateUrl: './cadastro-nota-fiscal.component.html',
  styleUrls: ['./cadastro-nota-fiscal.component.css']
})
export class CadastroNotaFiscalComponent implements OnInit {
  notaFiscalForm!: FormGroup;  // FormGroup para o formulário
  itensNotaFiscal: ItemNotaFiscal[] = [];
  fornecedores: { id: number; nome_fantasia: string }[] = [];
  produtos: { id: number; nome: string }[] = [];
  displayedColumns: string[] = ['produto', 'quantidade', 'valor_unitario', 'valor_total', 'actions'];
notaFiscal: any;
  itens: any;

  constructor(
    private fornecedorService: FornecedorService,
    private fb: FormBuilder  // Injeção do FormBuilder
  ) {}

  ngOnInit(): void {
    this.notaFiscalForm = this.fb.group({
      numero_nota: ['', Validators.required],
      serie: ['', Validators.required],
      data_emissao: ['', Validators.required],
      fornecedor_id: [0, Validators.required],
      transportadora_id: [0, Validators.required],
      observacoes: [''],
      itens: this.fb.array([
        this.fb.group({
          produto_id: ['', Validators.required],
          quantidade: [0, Validators.required],
          valor_unitario: [0, Validators.required],
          valor_total: [{ value: 0, disabled: true }] // Desativado aqui
        })
      ])
    });

    // Carregar fornecedores
    this.fornecedorService.getFornecedores().subscribe((data: any) => {
      this.fornecedores = data;
    });

    // Carregar produtos (de forma semelhante)
    // this.produtoService.getProdutos().subscribe((data: any) => {
    //   this.produtos = data;
    // });
  }

  addItem() {
    const itemForm = this.fb.group({
      produto_id: [null, Validators.required],
      quantidade: [0, Validators.required],
      valor_unitario: [0, Validators.required],
      valor_total: [{ value: 0, disabled: true }]
    });
    this.itens.push(itemForm);
  }

  removeItem(index: number) {
    this.itens.removeAt(index);
  }

  onProdutoSelect(event: any, item: ItemNotaFiscal) {
    item.produto_id = event.value;
  }

  calculateTotal(index: number) {
    const item = this.itens.at(index);
    const quantidade = item.get('quantidade')?.value;
    const valorUnitario = item.get('valor_unitario')?.value;
    const total = quantidade * valorUnitario;
    item.get('valor_total')?.setValue(total);
  }

  onSubmit() {
    if (this.notaFiscalForm.valid) {
      const notaFiscal: NotaFiscal = this.notaFiscalForm.value;

      // Converter data_emissao para o tipo Date
      notaFiscal.data_emissao = new Date(this.notaFiscalForm.get('data_emissao')?.value);

      // Calcular os valores totais dos itens
      notaFiscal.valor_total_produtos = this.itensNotaFiscal.reduce((sum, item) => sum + (item.valor_total || 0), 0);
      notaFiscal.valor_total = notaFiscal.valor_total_produtos;

      // Enviar os dados da nota e itens para o backend (adicione aqui a lógica de envio)
      console.log('Nota Fiscal submetida', notaFiscal);
    } else {
      console.error('Formulário inválido');
    }
  }
}
