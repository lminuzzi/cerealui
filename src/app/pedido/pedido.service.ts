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

  createPedido(pedido: Pedido) {
    console.log(pedido)
    return '';
    //return this.http.post(this.url + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, pedido);
  }

  analisarPedido(pedido: Pedido): Observable<Pedido> {
    pedido = JSON.parse(
      '{"cliente": {"bairro": "","cnpj": "","cpf": "","idCliente": "100128","inscEst": "","local": "","nomeCliente": "","regiao": "","rua": "","tipoPessoa": ""},"codComprador": "","compra": {"compraCorret": 0.20,"compraCorretTotal": "","compraCusto": "","compraCustoTotal": "","compraDataPagamento": "Fri May 31 2019 00:00:00 GMT+0200 (Horário de Verão da Europa Central)","compraFrete": "35","compraFreteTotal": "","compraImpostos": "","compraImpostosTotal": "","compraPossuiCorretor": true,"compraPossuiFrete": true,"compraTipoFrete": "PESSOA_FISICA","empresa": "BOA SAFRA SEMENTES","filialCompra": "CS06","funrural": true,"localEmbarque": "FAZ BOA SAFRA","nomeComprador": "","obsMod": "SEM CARGA EXTRA","periodoEntrega":"De 20/03 a 30/03","possuiProRural": false,"produtorCidade": "","produtorEstado": "GO","produtorRazaoNome": "RENNAN VALADARES PRODUTOR","safra": "2018/2019","tipoAtividadeCompra": "CEREALISTA"},"custosAdicionais": "","dataPedido": "","diasDeJuros": "","fornecedor": {"bairro": "","cnpj": "","cpf": "","idFornecedor":"401076","inscEst": "","local": "","nomeFornecedor": "","regiao": "","rua": "","tipoPessoa": ""},"funruralTotal": "","juros": "","jurosTotal": "","margem": "","margemTotal": "","nrPedido": "","nrSiscdb": "","pedidoDadoBancario": {"agenciaBanco": "123","contaBanco": "123123","cpfBanco": "123123123","nomeBanco": "nomeBAncoABC","titularBanco": "titularcontaabc"},"peso":"","produto": "SOJA","qtSacos": 10000,"status": "","valorLiq": 50,"valorLiqTotal": "","venda": {"destGrao": "MERCADO INTERNO","localDestino": "BUNGUE PORTO","tipoAtividadeVenda": "OUTROS","tpPedido": "COMERCIAL","tradingCidade": "","tradingEstado":"GO","tradingRazaoNome": "","vendaCorret": "0.1","vendaCorretTotal": "","vendaCusto": "","vendaCustoTotal": "","vendaDataPagamento": "Fri May 31 2019 00:00:00 GMT+0200 (Horário de Verão daEuropa Central)","vendaFrete": 50,"vendaFreteTotal": "","vendaImpostos": "","vendaImpostosTotal": "","vendaPossuiCorretor": true,"vendaPossuiFrete": true,"vendaTipoFrete": "PESSOA_FISICA","vendaValorReal": "","estadoCliente": "OUTROSESTADOS"},"vendaValorRealTotal": "","valorVenda": "75"}'
    )
    console.log(pedido)
    return this.http.post<Pedido>(this.url + '/analisar?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, pedido);
  }
}
