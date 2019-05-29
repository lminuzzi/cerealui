import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Pedido } from './pedido';
import { PedidoService } from './pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(private router: Router,
              private pedidoService:PedidoService,
              private formBuilder: FormBuilder) { }

  public formPedido: FormGroup
  public pedido:Pedido = new Pedido()

  empresas: string[] = ['CEREAIS SUL', 'BOA SAFRA SEMENTES', 'NOBRE ALIMENTOS']

  locaisDestino: string[] = [
    'FOB - LUZIANIA', 'FOB - LAZA', 'FOB - UBERLANDIA', 'FOB - CEREAIS SUL', 'FOB - BOA SAFRA',
    'FOB - ARAGUARI', 'FOB - PIRAPORA', 'FOB - ANAPOLIS', 'FOB - UBERABA', 'FOB - RIO VERDE',
    'FOB - PORTO', 'CIF - PORTO', 'CIF - ARAGUARI', 'CIF - PIRAPORA', 'CIF - ANAPOLIS',
    'CIF - UBERLANDIA', 'CIF - BOA SAFRA', 'CIF - CEREAIS SUL', 'CIF - LUZIANIA', 'CIF - LAZA'
  ]

  email = new FormControl('', [Validators.required, Validators.email]);

  step = 0;

  anoAtual = new Date().getFullYear()
  safraValorInicial = (this.anoAtual-1) + "/" + this.anoAtual
  safraValorFinal = this.anoAtual + "/" + (this.anoAtual+1)

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Campo e-mail deve ser preenchido' :
        this.email.hasError('email') ? 'E-mail não é válido' :
            '';
  }

  ngOnInit() {
    //TODO retirar comentário
    /*
    if(!window.sessionStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    */
    this.formPedido = this.formBuilder.group({
      nrSiscdb: [''],
      nrPedido: [''],
      codComprador: [''],
      banco: this.formBuilder.group({
        titularBanco: [''],
        cpfBanco: [''],
        contaBanco: [''],
        agenciaBanco: [''],
        nomeBanco: ['']
      }),
      fornecedor: this.formBuilder.group({
        idFornecedor: [''],
        nomeFornecedor: [''],
        local: [''],
        cpf: [''],
        cnpj: [''],
        regiao: [''],
        rua: [''],
        bairro: [''],
        inscEst: [''],
        tipoPessoa: ['']
      }),
      cliente: this.formBuilder.group({
        idCliente: [''],
        nomeCliente: [''],
        local: [''],
        cpf: [''],
        cnpj: [''],
        regiao: [''],
        rua: [''],
        bairro: [''],
        inscEst: [''],
        tipoPessoa: ['']
      }),
      compra: this.formBuilder.group({
        compraCorret: [''],
        compraCorretTotal: [''],
        compraCusto: [''],
        compraCustoTotal: [''],
        compraFrete: [''],
        compraFreteTotal: [''],
        compraImpostos: [''],
        compraImpostosTotal: [''],
        compraDataPagamento: [''],
        compraPossuiFrete: ['N'],
        compraPossuiCorretor: ['N'],
        compraTipoFrete: ['PF'],
        nomeComprador: [''],
        produtorCidade: [''],
        produtorEstado: [''],
        produtorRazaoNome: [''],
        empresa: [''],
        safra: [''],
        tipoAtividadeCompra: [''],
        possuiProRural: [''],
        periodoEntrega: [''],
        localEmbarque: [''],
        estadoSaida: [''],
        filialCompra: [''],
        funrural: [''],
        obsMod: ['']
      }),
      venda: this.formBuilder.group({
        vendaCorret: [''],
        vendaCorretTotal: [''],
        vendaCusto: [''],
        vendaCustoTotal: [''],
        vendaFrete: [''],
        vendaFreteTotal: [''],
        vendaImpostos: [''],
        vendaImpostosTotal: [''],
        vendaValorReal: [''],
        vendaDataPagamento: [''],
        vendaPossuiFrete: ['N'],
        vendaTipoFrete: ['PF'],
        vendaPossuiCorretor: ['N'],
        tradingRazaoNome: [''],
        tradingCidade: [''],
        tradingEstado: [''],
        tipoAtividadeVenda: [''],
        destGrao: [''],
        tpPedido: [''],
        localDestino: ['']
      }),
      vendaValorRealTotal: [''],
      dataPedido: [''],
      custosAdicionais: [''],
      diasDeJuros: [''],
      funruralTotal: [''],
      juros: [''],
      jurosTotal: [''],
      margem: [''],
      margemTotal: [''],
      peso: [''],
      produto: [''],
      qtSacos: [''],
      status: [''],
      valorLiq: [''],
      valorLiqTotal: ['']
    });
  }

  public analisarPedido() {
    console.log(this.formPedido.value)
  }

  onSubmit() {
    alert('submit')
    this.pedidoService.createPedido(this.formPedido.value);
    /*
    this.pedidoService.createPedido(this.formPedido.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });
    */
  }
}
