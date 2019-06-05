import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cliente } from './cliente';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClienteService } from './cliente.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clientes:Cliente[]
  public cliente:Cliente = new Cliente()
  options: string[] = [];
  clienteCtrl: FormControl;
  filteredOptions: Observable<string[]>;
  mostrarDetalhesCliente = false;
  public buscaForm: FormGroup

  @Output() clienteSelected: EventEmitter<number>;

  constructor(private clienteService:ClienteService, private formBuilder: FormBuilder) {
    this.clienteCtrl = new FormControl();
    this.clienteSelected = new EventEmitter();
  }

  ngOnInit() {
    this.buscaForm = this.formBuilder.group({
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
    });

    this.getClientesList()

    this.filteredOptions = this.clienteCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(filterValue.length <= 3) {
      return;
    }

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public getClientesList() {
    this.clienteService.getClientes().subscribe(
      response => {
        this.clientes = response
        this.clientes.forEach(val => {
          this.options.push(val.idCliente + ' - ' + val.nomeCliente)
        })
      },
      error => {
        console.log("************* getClientees ERROR.")
      }
    )
  }

  public getClienteById(value: string) {
    const idCli: number = this.parseId(value);
    this.cliente = this.clientes.filter(val => val.idCliente == idCli)[0]
    this.clienteSelected.emit(idCli);
    this.mostrarDetalhesCliente = true;
  }

  private parseId(value: string) {
    var parsedId: number
    if (value.includes('-')) {
      parsedId = Number.parseInt(value.split('-')[0].trim());
    }
    else {
      parsedId = Number.parseInt(value);
    }
    return parsedId;
  }

}
