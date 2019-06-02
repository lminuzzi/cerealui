import { Fornecedor } from '../fornecedor/fornecedor';
import { Cliente } from '../cliente/cliente';
import { Compra } from './compra';
import { Venda } from './venda';
import { PedidoDadoBancario } from './pedido-dado-bancario';

export class Pedido {
    nrSiscdb: number;
    nrPedido: number;
    codComprador: number;
    fornecedor: Fornecedor;
    cliente: Cliente;
    pedidoDadoBancario: PedidoDadoBancario;
    compra: Compra;
    venda: Venda;
    vendaValorRealTotal: string;
    dataPedido: string;
    custosAdicionais: string;
    diasDeJuros: string;
    funruralTotal: string;
    juros: string;
    jurosTotal: string;
    margem: string;
    margemTotal: string;
    peso: string;
    produto: string;
    qtSacos: string;
    status: string;
    valorLiq: string;
    valorLiqTotal: string;
    valorVenda: string;
}
