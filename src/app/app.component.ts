import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Meu Aplicativo';
  isSidenavOpen = true;

  menuSections = [
    {
      title: 'Cadastros',
      links: [
        { title: 'Igreja', route: '/igreja' },
        { title: 'Setor', route: '/setor' },
        { title: 'Usuário', route: '/usuario' },
        { title: 'Fornecedor', route: '/fornecedor' },
        { title: 'Cidade', route: '/cidade' },
        { title: 'Estado', route: '/estado' }
      ]
    },
    {
      title: 'Produto',
      links: [
        { title: 'Cadastro de Produto', route: '/produto/cadastro' },
        { title: 'Consulta de Produto', route: '/produto/consulta' }
      ]
    },
    {
      title: 'Financeiro',
      links: [
        { title: 'Entrada de Nota', route: '/financeiro/entrada' }
      ]
    }
  ];

  updateTitle(title: string) {
    this.pageTitle = title;
  }
}