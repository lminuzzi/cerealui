import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';

@Component({
  selector: 'app-pedido-analise',
  templateUrl: './pedido-analise.component.html',
  styleUrls: ['./pedido-analise.component.css']
})
export class PedidoAnaliseComponent implements OnInit {
  public pedido:Pedido = new Pedido()

  constructor() { }

  ngOnInit() {
  }

}
