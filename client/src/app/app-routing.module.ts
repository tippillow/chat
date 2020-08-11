import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PathConfig} from "./config/routing/path.routing";
import {AuthGuard} from "./guards/auth/auth.guard";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: PathConfig.CHATS,
    },
    {
        path: PathConfig.CHATS,
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule),
    },
    {
        path: PathConfig.AUTH,
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: PathConfig.ANY,
        redirectTo: PathConfig.AUTH,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: false,
        relativeLinkResolution: 'corrected'
    })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
