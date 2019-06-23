import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  downloadTeste(): Observable<Blob> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    var caminho = 'webapps/cerealsulapp/WEB-INF/classes/static/pdftemplates/htmlPedido_428.pdf';
    let body = new HttpParams();
    body = body.set('caminho', caminho);
    console.log(caminho);
    return this.http.post<Blob>(this.url + '/pdfcontrato', body,
        { headers: headers, responseType: 'blob' as 'json'});
  }

  listaArquivos() {
    //var caminho = "src/main/resources/static/pdftemplates/";
    var caminho = "webapps/cerealsulapp/WEB-INF/classes/static/pdftemplates/";
    let body = new HttpParams();
    body = body.set('caminho', caminho);
    console.log(caminho);
    return this.http.post(this.url + '/listaarquivos', body);
  }
}
