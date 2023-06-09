import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/pisos/nivel1';
import { Sotano1Component } from './components/pisos/sotano1/sotano1.component';
import { Sotano2Component } from './components/pisos/sotano2/sotano2.component';
import { AuthGuard } from './helpers';

const accountModule = () => import('./components/account/rutas/account.module').then(x => x.AccountModule);
const usersModule = () => import('./components/users/rutas/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'sotano1', component:Sotano1Component},
    { path: 'sotano2', component:Sotano2Component},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
