import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-transportadora',
  templateUrl: './cadastro-transportadora.component.html',
  styleUrls: ['./cadastro-transportadora.component.css']
})
export class CadastroTransportadoraComponent implements OnInit {
  transportadoraForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transportadoraForm = this.fb.group({
      razao_social: [''],
      nome_fantasia: [''],
      cnpj: [''],
      inscricao_estadual: [''],
      telefone_fixo: [''],
      telefone_celular: [''],
      email: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cep: [''],
      cidade_codigo: [''],
      uf_codigo: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.transportadoraForm.valid) {
      console.log(this.transportadoraForm.value);
      // Aqui você pode adicionar a lógica para salvar os dados no banco de dados.
    }
  }
}
