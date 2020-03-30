import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardGuard } from './guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './modules/auth/login/login.module#LoginModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: './modules/auth/register/register.module#RegisterModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './modules/list/list.module#ListModule',
    canActivate: [DashboardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
