import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioSaldoEstoqueComponent } from './relatorio-saldo-estoque.component';

describe('RelatorioSaldoEstoqueComponent', () => {
  let component: RelatorioSaldoEstoqueComponent;
  let fixture: ComponentFixture<RelatorioSaldoEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioSaldoEstoqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioSaldoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
