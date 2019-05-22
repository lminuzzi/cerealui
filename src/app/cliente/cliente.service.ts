import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = environment.host + 'api/clientes'

  constructor(private http:HttpClient) { }

  public getClientes():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url)
  }

  getClienteById(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.url + '/' + idCliente + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
}
