import { Component, OnInit } from '@angular/core';
import { SetorService } from '../setor.service';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'acoes'];
  setores: any[] = [];
  setor: any = { nome: '' };

  constructor(private setorService: SetorService) { }

  ngOnInit(): void {
    this.loadSetores();
  }

  loadSetores(): void {
    this.setorService.getSetores().subscribe(data => {
      this.setores = data;
    });
  }

  onSubmit(): void {
    if (this.setor.codigo) {
      this.setorService.updateSetor(this.setor.codigo, this.setor).subscribe(() => {
        this.loadSetores();
        this.setor = { nome: '' };
      });
    } else {
      this.setorService.createSetor(this.setor).subscribe(() => {
        this.loadSetores();
        this.setor = { nome: '' };
      });
    }
  }

  editSetor(setor: any): void {
    this.setor = { ...setor };
  }

  deleteSetor(id: number): void {
    this.setorService.deleteSetor(id).subscribe(() => {
      this.loadSetores();
    });
  }
}
