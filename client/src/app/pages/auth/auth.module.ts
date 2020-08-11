import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {AuthFormComponent} from './components/dumb/auth-form/auth-form.component';
import {AuthRoutingModule} from "./auth.routing";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [AuthComponent, AuthFormComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule {
}
