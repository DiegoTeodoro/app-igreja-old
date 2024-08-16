import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
  newUser: Usuario = {
    nome: '',
    senha: ''
  };
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['nome', 'senha', 'acoes'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  onSubmit() {
    this.usuarioService.createUsuario(this.newUser).subscribe(
      response => {
        console.log('Usuário salvo com sucesso!', response);
        this.loadUsuarios();
        this.newUser = { nome: '', senha: '' }; // Limpar o formulário após o salvamento
      },
      error => {
        console.error('Erro ao salvar o usuário!', error);
      }
    );
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      data => {
        this.usuarios = data;
      },
      error => {
        console.error('Erro ao carregar os usuários!', error);
      }
    );
  }

  editarUsuario(usuario: Usuario) {
    this.newUser = { ...usuario }; // Preenche o formulário com os dados do usuário
  }

  deletarUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(
      () => {
        console.log('Usuário deletado com sucesso!');
        this.loadUsuarios(); // Recarrega a lista de usuários após a exclusão
      },
      error => {
        console.error('Erro ao deletar o usuário!', error);
      }
    );
  }
}
