import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SetorComponent } from './setor/setor.component';
import { IgrejaComponent } from './igreja/igreja.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EstadoComponent } from './estados/estados.component';
import { CidadeComponent } from './cidades/cidades.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ConsultaProdutoComponent } from './consulta-produto/consulta-produto.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CadastroTransportadoraComponent } from './cadastro-transportadora/cadastro-transportadora.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';




const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'setor', component: SetorComponent},
  { path: 'igreja', component: IgrejaComponent },
  { path: 'cadastro-produto', component: CadastroProdutoComponent },
  { path: 'cadastro-produto/:id', component: CadastroProdutoComponent}, // Rota para edição com ID
  { path: 'consulta-produto', component: ConsultaProdutoComponent },
  { path: 'fornecedor', component: FornecedorComponent },
  { path: 'cidade', component: CidadeComponent},
  { path: 'estado', component: EstadoComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'cadastro-transportadora', component: CadastroTransportadoraComponent},
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}