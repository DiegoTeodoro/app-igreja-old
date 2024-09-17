import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { FornecedorService } from "../fornecedor.service";
import { ProdutoService } from "../produto.service";
import { debounceTime, switchMap, startWith, map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { Produto } from "../models/produto";

@Component({
  selector: "app-cadastro-nota-fiscal",
  templateUrl: "./cadastro-nota-fiscal.component.html",
  styleUrls: ["./cadastro-nota-fiscal.component.css"],
})
export class CadastroNotaFiscalComponent implements OnInit {
  
calculateTotal(_t159: any) {
throw new Error('Method not implemented.');
}
  notaFiscalForm!: FormGroup;
  fornecedores: { id: number; nome_fantasia: string }[] = [];
  produtos: { id: number; nome: string }[] = [];
  displayedColumns: string[] = [
    "produto",
    "quantidade",
    "valor_unitario",
    "valor_total",
    "actions",
  ];
  dataSource: any[] = []; // Mantenha como array para a tabela
  produtoControl = new FormControl();
  filteredProdutos: Observable<Produto[]> | undefined;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.notaFiscalForm = this.fb.group({
      numero_nota: ["", Validators.required],
      serie: [""],
      chave_acesso: [""],
      fornecedor_id: ["", Validators.required],
      cnpj: ["", Validators.required],
      data_emissao: ["", Validators.required],
      quantidade: ["", [Validators.required, Validators.min(1)]],
      valor_unitario: ["", Validators.required],
      valor_total: [{ value: "", disabled: true }],
      itens: this.fb.array([]), // Inicializa o FormArray para itens
    });

    this.fornecedorService.getFornecedores().subscribe((data: any) => {
      this.fornecedores = data;
    });

    // Configurar o filtro de produtos com auto-completar
    this.filteredProdutos = this.produtoControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => this._filter(value))
    );
  }

  private _filter(value: string): Observable<Produto[]> {
    const filterValue = typeof value === "string" ? value.toLowerCase() : "";

    return this.produtoService
      .getProdutos()
      .pipe(
        map((produtos: Produto[]) =>
          produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(filterValue)
          )
        )
      );
  }

  displayProduto(produto: Produto): string {
    return produto && produto.nome ? produto.nome : "";
  }

  addItem() {
    const produto = this.produtoControl.value;
    const quantidade = this.notaFiscalForm.get("quantidade")?.value;
    const valorUnitario = this.notaFiscalForm.get("valor_unitario")?.value;
    const valorTotal = quantidade * valorUnitario; // Calcula o valor total
  
    if (produto && quantidade && valorUnitario) {
      const newItem = {
        produto_id: produto.id,
        produto_nome: produto.nome,
        quantidade: quantidade,
        valor_unitario: valorUnitario,
        valor_total: valorTotal, // Atribui o valor total calculado
        quantidadeControl: new FormControl(quantidade, [
          Validators.required,
          Validators.min(1),
        ]),
        valorUnitarioControl: new FormControl(valorUnitario, Validators.required),
      };
  
      this.dataSource.push(newItem); // Adiciona o novo item à lista
      this.dataSource = [...this.dataSource]; // Atualiza a lista de itens para refletir na tabela
      this.calcularTotalNota(); // Atualiza o total da nota
    }
  
    // Limpar campos após adicionar o item
    this.notaFiscalForm.patchValue({
      quantidade: '',
      valor_unitario: '',
      valor_total: '',
    });
    this.produtoControl.setValue('');
  }
  
  
  updateValorTotal() {
    const quantidade = this.notaFiscalForm.get("quantidade")?.value || 0;
    const valorUnitario = this.notaFiscalForm.get("valor_unitario")?.value || 0;

    // Calcula o valor total
    const valorTotal = quantidade * valorUnitario;

    // Atualiza o campo valor_total com o valor formatado
    this.notaFiscalForm.patchValue({ valor_total: valorTotal.toFixed(2) });
  }

  calcularTotalNota(): number {
    const totalProdutos = this.dataSource.reduce(
      (acc, item) => acc + (item.valor_total || 0), // Garante que valor_total não seja undefined
      0
    );
    const total = totalProdutos;
  
    // Atualiza o campo "valor_total" do formulário com o valor calculado
    this.notaFiscalForm.patchValue({ valor_total: total.toFixed(2) });
  
    return total;
  }
  
  removeItem(index: number) {
    if (index >= 0 && index < this.dataSource.length) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];

      // Recalcula o total da nota
      this.calcularTotalNota();
    } else {
      console.error("Índice inválido para remoção:", index);
    }
  }
}
