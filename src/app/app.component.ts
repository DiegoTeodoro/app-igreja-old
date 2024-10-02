import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'CCLIMP';
  isSidenavOpen = true;
  currentDate: string;

  menuSections = [
    {
      title: 'Cadastros',
      links: [
        { title: 'Empresa', route: '/empresa' },
        { title: 'Igreja', route: '/igreja' },
        { title: 'Setor', route: '/setor' },
        { title: 'Categoria', route: '/categoria' },
        { title: 'Fornecedor', route: '/fornecedor' },
        { title: 'Cidade', route: '/cidade' },
        { title: 'Estado', route: '/estado' },
        { title: 'Usuário', route: '/cadastro-usuario' }
      ]
    },
    {
      title: 'Produtos',
      links: [
        { title: 'Cadastro de Produto', route: '/cadastro-produto' },
        { title: 'Produto-consulta', route: '/consulta-produto' }
      ]
    },
    {
      title: 'Pedidos',
      links: [
        { title: 'Pedido', route: '/cadastro-pedido' },
        { title: 'Consulta Pedido', route: '/consulta-pedido' }
      ]
    },
    {
      title: 'Notas Fiscais',
      links: [
        { title: 'Entrada de Nota', route: '/cadastro-nota-fiscal' }
      ]
    },
    {
      title: 'Relatórios',
      links: [
        { title: 'Saldo estoque', route: '/relatorio-saldo-estoque' },
        { title: 'Produtos', route: '/relatorio-produto' } 
      ]
    }
  ];
  isLoggedIn: any;
sidenav: any;
  
  constructor(private router: Router, private authService: AuthService) {
    const today = new Date();
    this.currentDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    // Verifique se o usuário está logado
    this.isLoggedIn = this.authService.isAuthenticated(); // Função no serviço de autenticação para verificar login
  }

  updateTitle(title: string) {
    this.pageTitle = title;
  }

  logout() {
    this.authService.logout(); // Serviço de logout
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  // Função para alterar o estado de login após autenticação
  onLoginSuccess() {
    this.isLoggedIn = true;
    this.router.navigate(['/home']);
  }
}