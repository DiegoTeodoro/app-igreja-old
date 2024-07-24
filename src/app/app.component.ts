import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string = 'Tela Principal';

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavOpen: boolean = false;

  close() {
    this.isSidenavOpen = false;
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  updateTitle(newTitle: string) {
    this.pageTitle = newTitle;
    this.close(); // Fecha o sidenav após clicar no link
  }
}