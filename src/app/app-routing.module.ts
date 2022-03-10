import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { InserirComponent } from './views/inserir/inserir.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'editar', component: HomeComponent },
  { path: 'listar', component: HomeComponent },
  { path: 'inserir', component: InserirComponent },
  { path: 'excluir', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
