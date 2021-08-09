import {NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes=[
  {path: 'login', component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{
}

