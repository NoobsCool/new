import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from "@angular/material/table";
import {MainNavComponent} from './main-nav/main-nav.component';
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";
import {TabsComponent} from './tabs/tabs.component';
import {MatTabsModule} from "@angular/material/tabs";
import {HttpClientModule} from '@angular/common/http';
import {UsersServices} from "./users/users.services";
import {UsersComponent} from './users/users.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {CustomersComponent} from './customers/customers.component';
import {CustomersServices} from "./customers/customers.services";
import {OrdersService} from "./orders/orders.service";
import {ProductsServices} from "./products/products.services";
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {ProductsformComponent} from "./products/products-form/productsform.component";
import {CustomerformComponent} from "./customers/customer-form/customerform.component";
import {UserformComponent} from "./users/users-form/userform.component";
import {OrderformComponent} from "./orders/orders-form/orderform.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TabsComponent,
    UsersComponent,
    OrdersComponent,
    ProductsComponent,
    CustomersComponent,
    ProductsformComponent,
    CustomerformComponent,
    UserformComponent,
    OrderformComponent,
    ConfirmDialogComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatTabsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    RouterModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule

  ],
  providers: [UsersServices,CustomersServices,OrdersService,ProductsServices,ProductsformComponent,CustomerformComponent,UserformComponent,OrderformComponent,MatDatepickerModule],
  bootstrap: [AppComponent],
  entryComponents: [ProductsformComponent,CustomerformComponent,UserformComponent,OrderformComponent]
})
export class AppModule {
}
