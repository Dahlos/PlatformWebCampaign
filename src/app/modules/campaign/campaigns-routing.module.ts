import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { HomepageComponent } from 'src/app/modules/campaign/pages/homepage/homepage.component';

const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    // {
    //     path: ':id',
    //     component: AddBooksComponent
    // },
    // {
    //     path: 'detail/:id',
    //     component: BookDetailComponent
    // },
    {
        path: '**',
        pathMatch: 'full', redirectTo: ''
    }
];

// const routes: Routes = [
//     {
//       path: '',
//       component: AddBooksComponent
//     },
//     {
//       path: ':id',
//       component: AddBooksComponent
//     },
//     {
//       path: 'detail/:id',
//       component: BookDetailComponent
//     },
//     {
//       path: '**',
//       pathMatch: 'full', redirectTo: ''
//     }
//   ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampaignsRoutingModule { }