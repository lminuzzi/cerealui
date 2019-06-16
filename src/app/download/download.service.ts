import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private url = environment.host + 'api/pedidos'

  constructor(private http:HttpClient) { }

  downloadPDFPedido(nrSiscdb: number): Observable<Blob> {
    console.log('***** download do pedido = ' + JSON.stringify(nrSiscdb));
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get<Blob>(this.url + '/pdf/' + nrSiscdb + '?access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token,
        { headers: headers, responseType: 'blob' as 'json'});
  }

  downloadPDFContrato(nrSiscdb: number): Observable<Blob> {
    console.log('***** download do contrato = ' + JSON.stringify(nrSiscdb));
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get<Blob>(this.url + '/pdfcontrato/' + nrSiscdb + '?access_token=' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token,
        { headers: headers, responseType: 'blob' as 'json'});
  }
}
