import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transportadora } from '../models/transportadora';

@Component({
  selector: 'app-cadastro-transportadora',
  templateUrl: './cadastro-transportadora.component.html',
  styleUrls: ['./cadastro-transportadora.component.css']
})
export class CadastroTransportadoraComponent implements OnInit {
  transportadoraForm: FormGroup;
  transportadoraService: any;

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
      const transportadora: Transportadora = this.transportadoraForm.value;
      this.transportadoraService.createTransportadora(transportadora).subscribe((response: any) => {
        console.log('Transportadora criada com sucesso!', response);
        this.transportadoraForm.reset(); // Limpa o formulário após o sucesso
      });
    }
  }
}
