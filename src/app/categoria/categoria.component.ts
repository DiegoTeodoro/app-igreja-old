import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  categoria: Categoria = { id: 0, nome: '' };

  constructor(private categoriaService: CategoriaService) {}

  onSubmit() {
    this.categoriaService.createCategoria(this.categoria).subscribe(response => {
      console.log('Categoria criada com sucesso!', response);
      this.categoria = { id: 0, nome: '' }; // Resetando o formulário
    });
  }
}
