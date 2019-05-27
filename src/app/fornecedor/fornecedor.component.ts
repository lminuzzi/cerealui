import { Component, OnInit } from '@angular/core';
import { FornecedorService } from './fornecedor.service';
import { Fornecedor } from './fornecedor';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  public fornecedores:Fornecedor[]
  public fornecedor:Fornecedor = new Fornecedor()
  options: string[] = [];
  fornecedorCtrl: FormControl;
  filteredOptions: Observable<string[]>;
  mostrarDetalhesFornecedor = false;
  public buscaForm: FormGroup

  constructor(private fornecedorService:FornecedorService, private formBuilder: FormBuilder) {
    this.fornecedorCtrl = new FormControl();
  }

  ngOnInit() {
    this.buscaForm = this.formBuilder.group({
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
    });

    this.getFornecedoresList()

    this.filteredOptions = this.fornecedorCtrl.valueChanges
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

  public getFornecedoresList() {
    this.fornecedorService.getFornecedores().subscribe(
      response => {
        this.fornecedores = response
        this.fornecedores.forEach(val => {
          this.options.push(val.idFornecedor + ' - ' + val.nomeFornecedor)
        })
      },
      error => {
        console.log("************* getFornecedores ERROR.")
      }
    )
  }

  public getFornecedorById(value: string) {
    console.log(value)
    const idFornec: number = this.parseId(value);
    console.log("idFornec: "+idFornec)
    this.fornecedor = this.fornecedores.filter(val => val.idFornecedor == idFornec)[0]
    this.mostrarDetalhesFornecedor = true;
  }

  private parseId(value: string) {
    var parsedId: number
    if (value.includes('-')) {
      parsedId = Number.parseInt(value.split('-')[0].trim());
    } else {
      parsedId = Number.parseInt(value);
    }
    return parsedId;
  }
}
