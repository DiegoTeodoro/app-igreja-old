import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent {
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      nome: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      this.usuarioService.createUsuario(this.usuarioForm.value).subscribe({
        next: (response) => {
          console.log('Usuário cadastrado com sucesso', response);
          this.resetForm(); // Chama a função para limpar o formulário
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário', error);
        }
      });
    }
  }

  // Função para resetar o formulário
  resetForm() {
    this.usuarioForm.reset(); // Limpa todos os campos do formulário
  }
}

