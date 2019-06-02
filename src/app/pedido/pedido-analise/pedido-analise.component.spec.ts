import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAnaliseComponent } from './pedido-analise.component';

describe('PedidoAnaliseComponent', () => {
  let component: PedidoAnaliseComponent;
  let fixture: ComponentFixture<PedidoAnaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoAnaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
