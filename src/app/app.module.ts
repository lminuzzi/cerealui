import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PedidoComponent } from './pedido/pedido.component';
import { ContratoComponent } from './contrato/contrato.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { PedidoAnaliseComponent } from './pedido/pedido-analise/pedido-analise.component';

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PedidoComponent,
    ContratoComponent,
    FornecedorComponent,
    ClienteComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    DialogConfirmComponent,
    PedidoAnaliseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogConfirmComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: LOCALE_ID, useValue: 'pt'},
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
