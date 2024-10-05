import { Component, HostListener } from '@angular/core';
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
  currentDate: string | undefined;

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
        { title: 'Usuário', route: '/cadastro-usuario', requiredRole: 'admin' } // Somente para administradores
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

  isLoggedIn: boolean;
  userRole: string | null = null; // Certifique-se de declarar a variável aqui
  sidenav: any;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userRole = this.authService.getUserRole(); // Agora `userRole` pode ser acessado corretamente
  }

  canAccess(routeRole: string): boolean {
    return this.userRole === routeRole; // Lógica para checar o perfil do usuário
  }

  // Atualiza o título da página
  updateTitle(title: string) {
    this.pageTitle = title;
  }

  // Função de logout
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redireciona para login
  }

  // Função chamada após sucesso no login
  onLoginSuccess() {
    this.isLoggedIn = true;
    this.router.navigate(['/home']); // Redireciona para a home após login
  }

  // Listener para fechar aba ou navegador (desloga apenas ao fechar)
  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: Event) {
    if (event.type === 'beforeunload') {
      // Aqui, removemos apenas no caso de fechar a aba ou navegador
      this.authService.logout(); // Remove o estado de autenticação ao fechar a aba
    }
  }
}
