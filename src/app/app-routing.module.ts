import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AppAuthGuard } from './utility/app.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((module) => module.HomeModule),
    //  canActivate: [AppAuthGuard],
  },
  {
    path: 'lista-marcas',
    loadChildren: () =>
      import('./marcas/marcas.module').then(
        (module) => module.ListaMarcasModule
      ),
    //  canActivate: [AppAuthGuard],
  },
  {
    path: 'lista-clientes',
    loadChildren: () =>
      import('./clientes/clientes.module').then(
        (module) => module.ClientesModule
      ),
    //  canActivate: [AppAuthGuard],
  },
  {
    path: 'lista-modelos',
    loadChildren: () =>
      import('./modelo/modelo.module').then((modulo) => modulo.ModeloModule),
    //  canActivate: [AppAuthGuard],
  },
  {
    path: 'lista-ordem-servicos',
    loadChildren: () =>
      import('./ordem-servico/ordem-servico.module').then(
        (modulo) => modulo.OrdemServicoModule
      ),
      // canActivate: [AppAuthGuard],
  },
  {
    path: 'lista-mecanicos',
    loadChildren: () =>
      import('./mecanicos/mecanico.module').then(
        (modulo) => modulo.MecanicoModule
      ),
    //  canActivate: [AppAuthGuard],
  },
  {
    path: 'lista-servicos',
    loadChildren: () =>
      import('./servicos/servicos.module').then(
        (modulo) => modulo.ServicosModule
      ),
    //  canActivate: [AppAuthGuard],
  },
  {
    path: 'lista-produto',
    loadChildren: () =>
      import('./produto/produto.module').then((modulo) => modulo.ProdutoModule),
    //  canActivate: [AppAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // providers: [AppAuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
