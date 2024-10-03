import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  empresaForm: FormGroup = this.fb.group({});
  isEditMode = false;
  empresaId: number | null = null;
  empresas: any[] = [];
  isSearchMode = false;
  displayedColumns: string[] = ['razao_social', 'endereco', 'numero', 'bairro'];

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.empresaForm = this.fb.group({
      razao_social: ['', Validators.required],
      cnpj: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      bairro: ['', Validators.required],
      telefone: ['', Validators.required],
      ativo: ['true', Validators.required],
    });
  }

  pesquisarEmpresa() {
    const formData = this.empresaForm.value;
    this.empresaService.pesquisarEmpresa(formData).subscribe(
      (empresas: any[]) => {
        this.empresas = empresas;
        this.isSearchMode = true; // Ativa o modo de pesquisa
      },
      (error: any) => {
        console.error('Erro ao buscar empresas:', error);
      }
    );
  }

  voltarCadastro() {
    this.isSearchMode = false; // Volta ao modo de cadastro
  }

  // Método para popular os campos de cadastro quando uma linha da tabela é clicada
  selectEmpresa(empresa: any) {
    this.isSearchMode = false; // Retorna ao formulário de cadastro
    this.empresaForm.patchValue({
      razao_social: empresa.razao_social,
      cnpj: empresa.cnpj,
      endereco: empresa.endereco,
      numero: empresa.numero,
      bairro: empresa.bairro,
      telefone: empresa.telefone,
      cep: empresa.cep,
    });
  }
}
