import { SharedModule } from './shared/shared.module';
import { ServicosRoutingModule } from './servicos/servicos-routing.module';
import { MecanicoModule } from './mecanicos/mecanico.module';
import { OrdemServicoModule } from './ordem-servico/ordem-servico.module';
import { VeiculosRoutingModule } from './veiculos/veiculos-routing.module';
import { ModelosRoutingModule } from './modelo/modelo-routing.module';
import { ClientesRoutingModule } from './clientes/clientes-routing.module';
import { MarcasRoutingModule } from './marcas/marcas-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import ptBRExtra from '@angular/common/locales/extra/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPopper } from 'angular-popper';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import { ProdutoRoutingModule } from './produto/produto-routing.module';
import { ContentComponent } from './layout/content/content.component';
// import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
// import { initializeKeycloak } from './utility/app.init';
import { HeadersInterceptor } from './headers.interceptor';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
registerLocaleData(ptBr, ptBRExtra);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxPopper,
    MarcasRoutingModule,
    VeiculosRoutingModule,
    ClientesRoutingModule,
    ModelosRoutingModule,
    OrdemServicoModule,
    ServicosRoutingModule,
    ProdutoRoutingModule,
    MecanicoModule,
    SharedModule,
    // KeycloakAngularModule,
    NgxMaskModule.forRoot(options),
  ],
  // providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HeadersInterceptor,
    //   multi: true,
    // },
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
