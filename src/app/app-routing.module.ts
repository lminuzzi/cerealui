import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContratoComponent } from './contrato/contrato.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { DownloadComponent } from './download/download.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contratos', component: ContratoComponent },
  { path: 'pedidos', component: PedidoComponent },
  { path: 'downloads', component: DownloadComponent },
  { path: 'downloads/:nrSiscdb', component: DownloadComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path : '', component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
