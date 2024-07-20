import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tela Principal';  // Título padrão

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle(event.url);  // Atualiza o título quando a rota muda
      }
    });
  }

  updateTitle(url: string) {
    if(url.includes('users')){
      this.title = 'Cadastro de Usuario';
    }else if (url.includes('igreja')) {
      this.title = 'Cadastro de Igreja';
    } else if (url.includes('setor')) {
      this.title = 'Cadastro de Setor';
    }else if (url.includes('produto')) {
        this.title = 'Cadastro de produto'
    } else {
      this.title = 'Tela Principal';  // Define o título padrão
    }
  }
}
