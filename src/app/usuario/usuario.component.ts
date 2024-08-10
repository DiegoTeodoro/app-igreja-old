import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  newUser: User = { username: '', password: '' };
 

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.newUser.username && this.newUser.password) {
      this.userService.createUser(this.newUser).subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso', response);
          this.loadUsers();
          this.resetForm(); 
          this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          console.error('Erro ao criar usuário', error);
          this.snackBar.open('Erro ao criar usuário!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });
    } else {
      this.snackBar.open('Dados do formulário inválidos', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }
  }
  
  // Definição da função resetForm para limpar o formulário
  resetForm() {
    this.newUser = { username: '', password: '' };  // Reset the newUser object to its initial state
  }

  editUser(user: User) {
    this.newUser = { ...user };
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
