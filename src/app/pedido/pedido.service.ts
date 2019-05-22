import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from './pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url = environment.host + 'api/pedidos'

  constructor(private http:HttpClient) { }

  getPedidoByNrSiscdb(nrSiscdb: number): Observable<Pedido> {
    return this.http.get<Pedido>(this.url + '/' + nrSiscdb + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  createPedido(pedido: Pedido){
    return this.http.post(this.url + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, pedido);
  }
}
