import {NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";
import {ProductsComponent} from "./products.component";
import {ProductsformComponent} from "./products-form/productsform.component";

const routes: Routes=[
  {path: '',component:ProductsComponent},
  {path: 'products-create',component:ProductsformComponent},
  {path: 'edit/:id',component:ProductsformComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{
}

