import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-itens-nota-fiscal',
  templateUrl: './itens-nota-fiscal.component.html',
})
export class ItensNotaFiscalComponent implements OnInit {
  itensNotaFiscalForm!: FormGroup; // Garante que não seja undefined

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.itensNotaFiscalForm = this.fb.group({
      nota_fiscal_id: ['', Validators.required],
      produto_id: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(0)]],
      valor_unitario: ['', [Validators.required, Validators.min(0)]],
      codigo_ncm: [''],
      cfop: [''],
      base_calculo_icms: [''],
      valor_icms: [''],
      aliquota_icms: [''],
      valor_ipi: [''],
      aliquota_ipi: [''],
      valor_pis: [''],
      aliquota_pis: [''],
      valor_cofins: [''],
      aliquota_cofins: ['']
    });
  }

  onSave(): void {
    if (this.itensNotaFiscalForm.valid) {
      // Lógica de salvamento
      console.log(this.itensNotaFiscalForm.value);
    } else {
      // Mensagem de erro ou validação
      console.log('Formulário inválido');
    }
  }
}
