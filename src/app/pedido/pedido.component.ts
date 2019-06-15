import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Pedido } from './pedido';
import { PedidoService } from './pedido.service';
import { Router } from '@angular/router';
import { Fornecedor } from '../fornecedor/fornecedor';
import { provideLocationStrategy } from '@angular/router/src/router_module';
import { User } from '../user/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(private router: Router,
              private pedidoService:PedidoService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) { }

  public formPedido: FormGroup
  public pedido:Pedido = new Pedido()
  public fornecedor:Fornecedor = new Fornecedor()
  user: User = JSON.parse(window.sessionStorage.getItem('user'));

  empresas: string[] = ['CEREAIS SUL', 'BOA SAFRA SEMENTES', 'NOBRE ALIMENTOS']

  produtorEstados: string[] = ['DF', 'GO', 'MG']

  prodEst;

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
    if(!window.sessionStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.prodEst = this.produtorEstados[1]

    this.formPedido = this.formBuilder.group({
      nrSiscdb: [''],
      nrPedido: [''],
      codComprador: [this.user.id],
      nomeComprador: [this.user.username],
      pedidoDadoBancario: this.formBuilder.group({
        titularBanco: ['', [Validators.required]],
        cpfBanco: ['', [Validators.required]],
        contaBanco: ['', [Validators.required]],
        agenciaBanco: ['', [Validators.required]],
        nomeBanco: ['', [Validators.required]]
      }),
      fornecedor: this.formBuilder.group({
        idFornecedor: ['', [Validators.required]],
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
        idCliente: ['', [Validators.required]],
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
        compraPossuiFrete: ['false', [Validators.required]],
        compraPossuiCorretor: ['false', [Validators.required]],
        compraTipoFrete: ['PESSOA_FISICA', [Validators.required]],
        produtorCidade: [''],
        produtorEstado: [''],
        produtorRazaoNome: [''],
        empresa: ['', [Validators.required]],
        safra: ['', [Validators.required]],
        tipoAtividadeCompra: ['', [Validators.required]],
        possuiProRural: ['false', [Validators.required]],
        periodoEntrega: [''],
        localEmbarque: [''],
        filialCompra: ['', [Validators.required]],
        funrural: ['false'],
        valorFunRural: [''],
        valorSenar: [''],
        valorPat: [''],
        valorBrutoCompra: ['']
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
        vendaPossuiFrete: ['false', [Validators.required]],
        vendaTipoFrete: ['PESSOA_FISICA', [Validators.required]],
        vendaPossuiCorretor: ['false', [Validators.required]],
        tradingRazaoNome: [''],
        tradingCidade: [''],
        tradingEstado: [''],
        tipoAtividadeVenda: ['', [Validators.required]],
        destGrao: [''],
        tpPedido: ['', [Validators.required]],
        estadoCliente: ['', [Validators.required]],
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
      produto: ['SOJA', [Validators.required]],
      qtSacos: ['', [Validators.required]],
      status: [''],
      valorLiq: ['', [Validators.required]],
      valorLiqTotal: [''],
      valorVenda: ['', [Validators.required]]
    });

    //this.analisarPedido();
  }

  public analisarPedido() {
    this.pedidoService.analisarPedido(this.formPedido.value)
      .subscribe( data => {
        console.log('***** retorno analise data = ' + JSON.stringify(data));
        this.pedido = data;
      });
  }

  onFornecedorSelected(fornecedorParam: Fornecedor) {
    this.formPedido.value.fornecedor.idFornecedor = fornecedorParam.idFornecedor;
    this.prodEst = fornecedorParam.regiao;
    this.fornecedor = fornecedorParam;
  }

  onClienteSelected(idClienteParam: number) {
    this.formPedido.value.cliente.idCliente = idClienteParam;
  }

  onSubmit() {
    //alert('submit')
    this.pedidoService.createPedido(this.formPedido.value)
      .subscribe( data => {
        console.log('***** retorno salvar data = ' + JSON.stringify(data));
        //this.router.navigate(['list-user']);
        this.snackBar.open('Pedido salvo com sucesso!', 'Fechar', {duration: 3000})
      });

  }
}
