import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensNotaFiscalComponent } from './itens-nota-fiscal.component';

describe('ItensNotaFiscalComponent', () => {
  let component: ItensNotaFiscalComponent;
  let fixture: ComponentFixture<ItensNotaFiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensNotaFiscalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensNotaFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
