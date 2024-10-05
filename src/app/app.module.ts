import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetorComponent } from './setor/setor.component';
import { HomeComponent } from './home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CidadeService } from './cidade.service';
import { FornecedorService } from './fornecedor.service';
import { EstadoComponent } from './estados/estados.component';
import { CidadeComponent } from './cidades/cidades.component';
import { IgrejaComponent } from './igreja/igreja.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConfirmDialog, ConsultaProdutoComponent } from './consulta-produto/consulta-produto.component';
import { DeleteDialogComponent } from './categoria/delete-dialog.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CadastroNotaFiscalComponent } from './cadastro-nota-fiscal/cadastro-nota-fiscal.component';
import { NgxMaskModule } from 'ngx-mask';
import { RelatorioSaldoEstoqueComponent } from './relatorio-saldo-estoque/relatorio-saldo-estoque.component';
import { RelatorioProdutoComponent } from './relatorio-produto/relatorio-produto.component';
import { CadastroPedidoComponent } from './cadastro-pedido/cadastro-pedido.component';
import { ConsultaPedidoComponent } from './consulta-pedido/consulta-pedido.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './login/login.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    SetorComponent,
    HomeComponent,
    CategoriaComponent,
    EstadoComponent,
    CidadeComponent,
    IgrejaComponent,
    ConfirmDialogComponent,
    FornecedorComponent,
    ConsultaProdutoComponent,
    DeleteDialogComponent,
    CadastroProdutoComponent,
    ConfirmDialog,
    CadastroNotaFiscalComponent,
    RelatorioSaldoEstoqueComponent,
    RelatorioProdutoComponent,
    CadastroPedidoComponent,
    ConsultaPedidoComponent,
    CadastroUsuarioComponent,
    LoginComponent,
    CadastroEmpresaComponent,
   


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSnackBarModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
    MatRadioModule,  // Certifique-se de incluir MatRadioModule
 
  
  ],

  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pt-BR' }, 
    CidadeService,
    FornecedorService],
  bootstrap: [AppComponent],
})
export class AppModule { }
