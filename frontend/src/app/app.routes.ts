import { Routes } from '@angular/router';

import { LoginComponent } from './user/login.component';
import { CadastroComponent } from './user/cadastro.component';
import { ListTasksComponent } from './tasks/list-task.component';
import { LogoutComponent } from './user/logout.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'tasks', component: ListTasksComponent },
    { path: 'logout', component: LogoutComponent }
];
