import { Component, OnInit } from '@angular/core';
import { FornecedorService } from './fornecedor.service';
import { Fornecedor } from './fornecedor';
import { FormControl } from '@angular/forms';
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
  options: string[] = ['One', 'Two', 'Three'];
  fornecedorCtrl: FormControl;
  filteredOptions: Observable<string[]>;

  constructor(private fornecedorService:FornecedorService) {
    this.fornecedorCtrl = new FormControl();
   }

  ngOnInit() {
    /*
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
    */
    //this.getFornecedoresList()
    this.filteredOptions = this.fornecedorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public getFornecedoresList() {
    this.fornecedorService.getFornecedores().subscribe(
      response => {
        this.fornecedores = response
      },
      error => {
        console.log("************* getFornecedores ERROR.")
      }
    )
  }
}
