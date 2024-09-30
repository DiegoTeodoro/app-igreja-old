import { Component, NgModule } from '@angular/core';
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
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroNotaFiscalComponent } from './cadastro-nota-fiscal/cadastro-nota-fiscal.component';
import { RelatorioSaldoEstoqueComponent } from './relatorio-saldo-estoque/relatorio-saldo-estoque.component';
import { RelatorioProdutoComponent } from './relatorio-produto/relatorio-produto.component';
import { CadastroPedidoComponent } from './cadastro-pedido/cadastro-pedido.component';




const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'setor', component: SetorComponent },
  { path: 'igreja', component: IgrejaComponent },
  { path: 'cadastro-produto', component: CadastroProdutoComponent },
  { path: 'cadastro-produto/:id', component: CadastroProdutoComponent },
  { path: 'consulta-produto', component: ConsultaProdutoComponent },
  { path: 'fornecedor', component: FornecedorComponent },
  { path: 'cidade', component: CidadeComponent },
  { path: 'estado', component: EstadoComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'cadastro-nota-fiscal', component: CadastroNotaFiscalComponent },
  { path: 'cadastro-pedido', component: CadastroPedidoComponent },
  { path: 'relatorio-saldo-estoque', component: RelatorioSaldoEstoqueComponent},
  { path: 'relatorio-produto', component: RelatorioProdutoComponent },
  { path: '**', redirectTo: '/home' } // Página não encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
