import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private url = environment.host + 'api/fornecedores'

  constructor(private http:HttpClient) { }

  public getFornecedores():Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.url)
  }
}
