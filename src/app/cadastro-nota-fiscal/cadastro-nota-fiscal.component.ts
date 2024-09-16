import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from "@angular/forms";
import { ProdutoService } from "../produto.service";
import { Produto } from "../models/produto";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from "rxjs/operators";
import { FornecedorService } from "../fornecedor.service";

@Component({
  selector: "app-cadastro-nota-fiscal",
  templateUrl: "./cadastro-nota-fiscal.component.html",
  styleUrls: ["./cadastro-nota-fiscal.component.css"],
})
export class CadastroNotaFiscalComponent implements OnInit {
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
      outros: [0], // Inicializa o campo "Outros" com valor 0
      descontos: [0], // Inicializa o campo "Descontos" com valor 0
      itens: this.fb.array([]), // Inicializa o FormArray para itens
    });

    // Escuta mudanças nos campos "Outros" e "Descontos"
    this.notaFiscalForm
      .get("outros")
      ?.valueChanges.subscribe(() => this.calcularTotalNota());
    this.notaFiscalForm
      .get("descontos")
      ?.valueChanges.subscribe(() => this.calcularTotalNota());

    this.filteredProdutos = this.produtoControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this._filter(value || ""))
    );
  }

  updateValorTotal() {
    const quantidade = this.notaFiscalForm.get("quantidade")?.value || 0;
    const valorUnitario = this.notaFiscalForm.get("valor_unitario")?.value || 0;

    // Calcula o valor total
    const valorTotal = quantidade * valorUnitario;

    // Atualiza o campo valor_total com o valor formatado
    this.notaFiscalForm.patchValue({ valor_total: valorTotal.toFixed(2) });
  }

  // Método para converter string formatada para número
  parseToNumber(value: string): number {
    if (!value) return 0;
    // Remove o símbolo de moeda e outros caracteres não numéricos
    const numericValue = value.replace(/[^\d,.-]/g, "").replace(",", ".");
    return parseFloat(numericValue) || 0;
  }

  // Método para formatar número para moeda
  formatToCurrency(value: number): string {
    return value
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&.")
      .replace(".", ",");
  }

  addItem() {
    const produto = this.produtoControl.value;
    const quantidade = this.notaFiscalForm.get("quantidade")?.value;
    const valorUnitario = this.notaFiscalForm.get("valor_unitario")?.value;
    const valorTotal = quantidade * valorUnitario;

    if (produto && quantidade && valorUnitario) {
      const newItem = {
        produto_id: produto.id,
        produto_nome: produto.nome,
        quantidade: quantidade,
        valor_unitario: valorUnitario,
        valor_total: valorTotal,
        quantidadeControl: new FormControl(quantidade, [
          Validators.required,
          Validators.min(1),
        ]),
        valorUnitarioControl: new FormControl(
          valorUnitario,
          Validators.required
        ),
      };

      this.dataSource.push(newItem);
      this.dataSource = [...this.dataSource];

      // Limpa os campos após adicionar
      this.produtoControl.setValue("");
      this.notaFiscalForm.get("quantidade")?.setValue("");
      this.notaFiscalForm.get("valor_unitario")?.setValue("");
      this.notaFiscalForm.get("valor_total")?.setValue("");

      // Recalcula o total da nota
      this.calcularTotalNota();

      // Força a redefinição da lista de produtos filtrados
      this.filteredProdutos = this.produtoService.getProdutos();
    } else {
      console.error("Preencha todos os campos do item");
    }
  }

  calculateTotal(index: number) {
    if (
      typeof index === "number" &&
      index >= 0 &&
      index < this.dataSource.length
    ) {
      const item = this.dataSource[index];
      const quantidade = item.quantidadeControl.value;
      const valorUnitario = item.valorUnitarioControl.value;
      const total = quantidade * valorUnitario;

      item.valor_total = total;

      this.dataSource = [...this.dataSource];

      // Recalcula o total da nota
      this.calcularTotalNota();
    } else {
      console.error("Índice inválido passado para calculateTotal:", index);
    }
  }

  calcularTotalNota(): number {
    const totalProdutos = this.dataSource.reduce(
      (acc, item) => acc + item.valor_total,
      0
    );
    const outros =
      this.parseToNumber(this.notaFiscalForm.get("outros")?.value) || 0;
    const descontos =
      this.parseToNumber(this.notaFiscalForm.get("descontos")?.value) || 0;
    const total = totalProdutos + outros - descontos;

    // Atualiza o campo "valor_total" do formulário com o valor calculado
    this.notaFiscalForm.patchValue({ valor_total: total.toFixed(2) });

    return total;
  }

  onSubmit() {
    if (this.notaFiscalForm.valid) {
      console.log(this.notaFiscalForm.value);
    } else {
      console.error("Formulário inválido");
    }
  }

  private _filter(value: string): Observable<Produto[]> {
    const filterValue = typeof value === "string" ? value.toLowerCase() : "";

    return this.produtoService
      .getProdutos()
      .pipe(
        map((produtos) =>
          produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(filterValue)
          )
        )
      );
  }

  displayProduto(produto: Produto): string {
    return produto && produto.nome ? produto.nome : "";
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

  formatToCurrencyInput(fieldName: string) {
    const fieldControl = this.notaFiscalForm.get(fieldName);
    if (fieldControl) {
      let value = fieldControl.value;
  
      // Remove todos os caracteres que não sejam números ou vírgulas
      value = value.replace(/[^\d,]/g, '');
  
      // Substitui vírgulas por pontos para a conversão
      const numericValue = parseFloat(value.replace(',', '.'));
  
      if (!isNaN(numericValue)) {
        // Atualiza o valor formatado como moeda
        fieldControl.setValue(numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), { emitEvent: false });
      }
    }
  }
  
}
