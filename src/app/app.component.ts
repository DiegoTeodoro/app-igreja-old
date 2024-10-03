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

  // Verifica se o usuário está logado ao inicializar a aplicação (inclusive após F5)
  this.isLoggedIn = this.authService.isAuthenticated();
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