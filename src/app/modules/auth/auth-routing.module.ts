import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from 'src/app/modules/auth/pages/loginpage/loginpage.component';

const routes: Routes = [
    {
        path: '',
        component: LoginpageComponent
    },
    {
        path: '**',
        pathMatch: 'full', redirectTo: ''
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }