import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SetorComponent } from './setor/setor.component';
import { IgrejaComponent } from './igreja/igreja.component';
import { UserComponent } from './user/user.component';
import { ProdutoCadastroComponent } from './produto/produto-cadastro/produto-cadastro.component';
import { ProdutoConsultaComponent } from './produto/produto-consulta/produto-consulta.component';
import { CategoriaComponent } from './categoria/categoria.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'setor', component: SetorComponent },
  { path: 'igreja', component: IgrejaComponent },
  { path: 'usuario', component: UserComponent },
  { path: 'produto/cadastro', component: ProdutoCadastroComponent },
  { path: 'produto/consulta', component: ProdutoConsultaComponent },
  { path: 'categoria', component: CategoriaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
