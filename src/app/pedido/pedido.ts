import { Fornecedor } from '../fornecedor/fornecedor';
import { Cliente } from '../cliente/cliente';
import { Compra } from './compra';
import { Venda } from './venda';

export class Pedido {
    nrSiscdb: number;
    nrPedido: number;
    codComprador: number;
    fornecedor: Fornecedor;
    cliente: Cliente;
    compra: Compra;
    venda: Venda;
    dataPedido: string;
    tpPedido: string;
    custosAdicionais: string;
    destGrao: string;
    diasDeJuros: string;
    funrural: string;
    funruralTotal: string;
    juros: string;
    jurosTotal: string;
    margem: string;
    margemTotal: string;
    obsMod: string;
    peso: string;
    produto: string;
    qtSacos: string;
    status: string;
    valorLiq: string;
    valorLiqTotal: string;
}
