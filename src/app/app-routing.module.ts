import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SetorComponent } from './setor/setor.component';
import { IgrejaComponent } from './igreja/igreja.component';
import { UserComponent } from './usuario/usuario.component' 
import { CategoriaComponent } from './categoria/categoria.component';
import { EstadoComponent } from './estados/estados.component';
import { CidadeComponent } from './cidades/cidades.component';
import { LoginComponent } from './login/login.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ConsultaProdutoComponent } from './consulta-produto/consulta-produto.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CadastroTransportadoraComponent } from './cadastro-transportadora/cadastro-transportadora.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'setor', component: SetorComponent },
  { path: 'igreja', component: IgrejaComponent },
  { path: 'cadastro-produto', component: CadastroProdutoComponent },
  { path: 'cadastro-produto/:id', component: CadastroProdutoComponent }, // Aqui é onde você adiciona a rota com ID
  { path: 'consulta-produto', component: ConsultaProdutoComponent },
  { path: 'usuario', component: UserComponent },
  { path: 'fornecedor', component: FornecedorComponent },
  { path: 'cidade', component: CidadeComponent},
  { path: 'estado', component: EstadoComponent},
  { path: 'categoria', component: CategoriaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-transportadora', component: CadastroTransportadoraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
