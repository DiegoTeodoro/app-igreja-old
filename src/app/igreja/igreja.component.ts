import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Igreja, IgrejaComDetalhes, IgrejaDetalhes } from '../models/igreja';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-igreja',
  templateUrl: './igreja.component.html',
  styleUrls: ['./igreja.component.css']
})
export class IgrejaComponent implements OnInit {
  igrejas = new MatTableDataSource<IgrejaDetalhes>();
  displayedColumns: string[] = ['nome', 'logradouro', 'numero', 'setor', 'ativo', 'acoes'];
  igreja: Igreja = this.createEmptyIgreja();
  setores: any[] = [];
  cidades: any[] = [];
  estados: any[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getSetores();
    this.getCidades();
    this.getEstados();
    this.loadIgrejas();
  }

  createEmptyIgreja(): Igreja {
    return {
      codigo: undefined,
      nome: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade_codigo: undefined,
      uf_codigo: undefined,
      codigo_setor: undefined,
      ativo: false
    };
  }

  getSetores() {
    this.http.get('http://localhost:3000/setores').subscribe((data: any) => {
      this.setores = data;
    }, error => {
      console.error('Erro ao buscar setores:', error);
    });
  }

  getCidades() {
    this.http.get('http://localhost:3000/cidades').subscribe((data: any) => {
      this.cidades = data;
    }, error => {
      console.error('Erro ao buscar cidades:', error);
    });
  }

  getEstados() {
    this.http.get('http://localhost:3000/estados').subscribe((data: any) => {
      this.estados = data;
    }, error => {
      console.error('Erro ao buscar estados:', error);
    });
  }

  loadIgrejas() {
    this.http.get<any[]>('http://localhost:3000/igrejas').subscribe((data: any[]) => {
      this.igrejas.data = data.map(igreja => {
        const setor = this.setores.find(s => s.codigo === igreja.codigo_setor);
        const cidade = this.cidades.find(c => c.id === igreja.cidade_codigo);
        const uf = this.estados.find(e => e.id === igreja.uf_codigo);
        return {
          ...igreja,
          setor: setor ? setor.nome : 'Setor não encontrado',
          cidade_nome: cidade ? cidade.nome : 'Cidade não encontrada',
          uf_nome: uf ? uf.nome : 'UF não encontrada'
        } as IgrejaDetalhes;
      });
    }, error => {
      console.error('Erro ao carregar igrejas:', error);
    });
  }

  onSubmit() {
    const igrejaToSave: Igreja = { ...this.igreja };

    if (igrejaToSave.codigo) {
      this.http.put(`http://localhost:3000/igrejas/${igrejaToSave.codigo}`, igrejaToSave).subscribe(response => {
        this.loadIgrejas();
        this.resetForm();
        this.showSuccessMessage('Igreja atualizada com sucesso!');
      }, error => {
        console.error('Erro ao atualizar igreja:', error);
      });
    } else {
      this.http.post('http://localhost:3000/igrejas', igrejaToSave).subscribe(response => {
        this.loadIgrejas();
        this.resetForm();
        this.showSuccessMessage('Igreja criada com sucesso!');
      }, error => {
        console.error('Erro ao criar igreja:', error);
      });
    }
  }

  resetForm() {
    this.igreja = this.createEmptyIgreja();
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000
    });
  }

  onEdit(igreja: IgrejaDetalhes) {
    this.igreja = { 
      codigo: igreja.codigo,
      nome: igreja.nome,
      logradouro: igreja.logradouro,
      numero: igreja.numero,
      complemento: igreja.complemento,
      bairro: igreja.bairro,
      cep: igreja.cep,
      cidade_codigo: igreja.cidade_codigo,
      uf_codigo: igreja.uf_codigo,
      codigo_setor: igreja.codigo_setor,
      ativo: igreja.ativo
    };
  }

  onDelete(igreja: Igreja) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir esta igreja?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`http://localhost:3000/igrejas/${igreja.codigo}`).subscribe(response => {
          this.loadIgrejas();
        }, error => {
          console.error('Erro ao deletar igreja:', error);
        });
      }
    });
  }
}
