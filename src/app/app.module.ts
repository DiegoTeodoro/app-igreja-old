import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { EstadoService } from './estado.service';
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
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CadastroPedidoComponent } from './cadastro-pedido/cadastro-pedido.component';
import { CadastroNotaFiscalComponent } from './cadastro-nota-fiscal/cadastro-nota-fiscal.component';




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
    CadastroUsuarioComponent,
    CadastroPedidoComponent,
    CadastroNotaFiscalComponent


    
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
    MatTooltipModule
  ],

  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [ EstadoService,
    CidadeService,
    FornecedorService],
  bootstrap: [AppComponent]


})
export class AppModule { }
