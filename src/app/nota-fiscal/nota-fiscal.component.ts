import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nota-fiscal',
  templateUrl: './nota-fiscal.component.html',
})
export class NotaFiscalComponent implements OnInit {
  notaFiscalForm!: FormGroup; // Garante que será inicializado no ngOnInit

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.notaFiscalForm = this.fb.group({
      numero_nota: ['', Validators.required],
      serie: ['', Validators.required],
      chave_acesso: ['', [Validators.required, Validators.minLength(44), Validators.maxLength(44)]],
      data_emissao: ['', Validators.required],
      data_saida: [''],
      hora_saida: [''],
      natureza_operacao: [''],
      modalidade_frete: [''],
      valor_total: ['', Validators.required],
      valor_frete: [''],
      valor_seguro: [''],
      valor_desconto: [''],
      observacoes: ['']
    });
  }

  onSave(): void {
    if (this.notaFiscalForm.valid) {
      // Lógica para salvar o formulário
      console.log(this.notaFiscalForm.value);
    } else {
      // Exibir mensagem de erro se o formulário estiver inválido
      console.log('Formulário inválido');
    }
  }
}
