import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { authGuard } from './guards/auth-guard';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Publish } from './pages/demand/publish/publish';
import { Demand } from './pages/demand/index';
import { Details } from './pages/demand/details/details';

export const routes: Routes = [
    {path:'', component: Homepage, pathMatch: 'full', canActivate: [authGuard]},
    {path: 'login', component: Login, data: {hideHeader: true}},
    {path: 'register', component: Register, data: {hideHeader: true}},
    {path: 'demand', component: Demand,   children: []},
    {path: 'demendDetail/:id', data: { renderMode: 'ssr' } ,loadChildren: () => import('./pages/demand/details/details').then(m => m.Details)},
    {path: 'publish', component: Publish},
];
