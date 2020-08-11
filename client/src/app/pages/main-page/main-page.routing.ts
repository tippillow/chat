import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {MessagesComponent} from "./components/messages/messages.component";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MainPageComponent,
    },
    {
        path: ':work',
        component: MainPageComponent,
        children: [
            {
                path: '',
                component: MessagesComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPageRoutingModule {
}
