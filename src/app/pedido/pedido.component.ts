import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Pedido } from './pedido';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(private pedidoService:PedidoService, private formBuilder: FormBuilder) { }

  public formPedido: FormGroup
  public pedido:Pedido = new Pedido()

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
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  ngOnInit() {
    this.formPedido = this.formBuilder.group({
      nrSiscdb: [''],
      nrPedido: [''],
      codComprador: [''],
      fornecedor: [{
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
      }],
      cliente: [{
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
      }],
      compra: [{
        compraCorret: [''],
        compraCorretTotal: [''],
        compraCusto: [''],
        compraCustoTotal: [''],
        compraFrete: [''],
        compraFreteTotal: [''],
        compraImpostos: [''],
        compraImpostosTotal: [''],
        nomeComprador: [''],
        produtorCidade: [''],
        produtorEstado: [''],
        produtorRazaoNome: [''],
        empresa: [''],
        safra: [''],
        tipoAtividadeCompra: [''],
        possuiProRural: ['']
      }],
      venda: [{
        vendaCorret: [''],
        vendaCorretTotal: [''],
        vendaCusto: [''],
        vendaCustoTotal: [''],
        vendaFrete: [''],
        vendaFreteTotal: [''],
        vendaImpostos: [''],
        vendaImpostosTotal: [''],
        vendaValorReal: [''],
        vendaValorRealTotal: [''],
        tradingRazaoNome: [''],
        tradingCidade: [''],
        tradingEstado: [''],
        tipoAtividadeVenda: ['']
      }],
      dataPedido: [''],
      tpPedido: [''],
      custosAdicionais: [''],
      destGrao: [''],
      diasDeJuros: [''],
      funrural: [''],
      funruralTotal: [''],
      juros: [''],
      jurosTotal: [''],
      margem: [''],
      margemTotal: [''],
      obsMod: [''],
      peso: [''],
      produto: [''],
      qtSacos: [''],
      status: [''],
      valorLiq: [''],
      valorLiqTotal: ['']
    });
  }

}
