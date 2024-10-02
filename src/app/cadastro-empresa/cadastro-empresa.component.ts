import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {
  empresaForm: FormGroup = this.fb.group({}); // Inicializando o formulário para evitar indefinido
  isEditMode = false; // Defina se o formulário está no modo de edição ou criação
  empresaId: number | null = null; // ID da empresa, nulo se for uma nova empresa
  estados: any[] = []; // Armazena a lista de estados
  cidades: any[] = []; // Armazena a lista de cidades

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private route: ActivatedRoute, // Para acessar parâmetros de rota
    private router: Router // Para navegar entre as rotas
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Carregar lista de estados ao iniciar o componente
    this.loadEstados();

    // Verifica se está em modo de edição com base no parâmetro de rota
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.empresaId = +id; // Converte o 'id' para número
        this.loadEmpresa(); // Carregar os dados da empresa
      }
    });
  }

  // Inicializar o formulário
  initForm() {
    this.empresaForm = this.fb.group({
      razao_social: ['', Validators.required],
      cnpj: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade_id: ['', Validators.required],
      telefone: ['', Validators.required],
      ativo: ['true', Validators.required], // Radio button padrão
    });
  }

  // Função para carregar os estados
  loadEstados() {
    this.empresaService.getEstados().subscribe((estados: any[]) => {
      this.estados = estados;
    });
  }

  // Função para carregar as cidades com base no estado selecionado
  onEstadoChange(event: any): void {
    const estadoId = event.value;
    if (estadoId) {
      this.loadCidadesByEstado(estadoId); // Carregar cidades com base no estado selecionado
    }
  }

  // Função para carregar as cidades
  loadCidadesByEstado(estadoId: number) {
    this.empresaService.getCidadesByEstado(estadoId).subscribe((cidades: any[]) => {
      this.cidades = cidades;
    });
  }

  // Carrega os dados da empresa se estiver no modo de edição
  loadEmpresa() {
    if (this.empresaId) {
      this.empresaService.getEmpresa(this.empresaId).subscribe((empresa) => {
        this.empresaForm.patchValue(empresa); // Preenche o formulário com os dados da empresa
      });
    }
  }

  // Método onSubmit que você já escreveu
  onSubmit() {
    if (this.empresaForm && this.empresaForm.valid) {
      const empresaData = this.empresaForm.value;

      // Convertendo o valor do radio button para 1 (true) ou 0 (false)
      empresaData.ativo = empresaData.ativo === 'true' ? 1 : 0;

      if (this.isEditMode && this.empresaId) {
        this.empresaService.updateEmpresa(this.empresaId, empresaData).subscribe(
          () => {
            this.router.navigate(['/empresas']);
          },
          (error) => {
            console.error('Erro ao atualizar empresa:', error);
          }
        );
      } else {
        this.empresaService.createEmpresa(empresaData).subscribe(
          () => {
            this.router.navigate(['/empresas']);
          },
          (error) => {
            console.error('Erro ao criar empresa:', error);
          }
        );
      }
    }
  }
}
