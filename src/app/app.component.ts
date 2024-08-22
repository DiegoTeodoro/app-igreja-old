import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Meu Aplicativo';
  isSidenavOpen = true;
  currentDate: string;

  menuSections = [
    {
      title: 'Cadastros',
      links: [
        { title: 'Igreja', route: '/igreja' },
        { title: 'Setor', route: '/setor' },
        { title: 'Cadastro de Produto', route: '/cadastro-produto' },
        { title: 'Produto-consulta', route: '/consulta-produto' },
        { title: 'Categoria', route: '/categoria' },
        { title: 'Fornecedor', route: '/fornecedor' },
        { title: 'Cidade', route: '/cidade' },
        { title: 'Estado', route: '/estado' },
        { title: 'Usuário', route: '/cadastro-usuario' }
      ]
    },
    {
      title: 'Financeiro',
      links: [
        { title: 'Entrada de Nota', route: '/financeiro/entrada' },
        { title: 'Transportadora', route: '/cadastro-transportadora' }
      ]
    }
  ];

  constructor(private router: Router) {
    const today = new Date();
    this.currentDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  }

  updateTitle(title: string) {
    this.pageTitle = title;
  }
  logout() {
    this.router.navigate(['/login']);
  }
}