import { Component, OnInit } from '@angular/core';
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

  constructor(private clienteService:ClienteService, private formBuilder: FormBuilder) {
    this.clienteCtrl = new FormControl();
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

    this.getClienteesList()

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

  public getClienteesList() {
    this.clienteService.getClientes().subscribe(
      response => {
        this.clientes = response
        this.clientes.forEach(val => {
          this.options.push(val.nomeCliente)
        })
      },
      error => {
        console.log("************* getClientees ERROR.")
      }
    )
  }

  public getClienteByNome(value: string) {
    this.cliente = this.clientes.filter(val => val.nomeCliente == value)[0]
    this.mostrarDetalhesCliente = true;
  }

}
