import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent {
  usuarioForm: FormGroup;
  hide = true;
  sucesso: boolean = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      login: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  onSubmit() {
    if (this.usuarioForm.valid) {
      const novoUsuario: Usuario = this.usuarioForm.value;
      this.usuarioService.createUsuario(novoUsuario).subscribe(
        response => {
          console.log('Usuário salvo com sucesso:', response);
          this.sucesso = true; // Exibir mensagem de sucesso
          this.usuarioForm.reset(); // Limpar o formulário
          setTimeout(() => this.sucesso = false, 3000); // Esconder a mensagem de sucesso após 3 segundos
        },
        error => {
          console.error('Erro ao salvar o usuário:', error);
          // Lógica de tratamento de erro
        }
      );
    }
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();  // Prevenir o comportamento padrão
    this.hide = !this.hide;
  }
  
}
