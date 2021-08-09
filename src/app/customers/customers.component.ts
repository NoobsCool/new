import {Component, OnInit} from '@angular/core';
import {CustomersServices} from "./customers.services";
import {CustomersData} from "./customers.model";
import {CustomerformComponent} from "./customer-form/customerform.component";
import {first} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-customers',
  templateUrl: 'customers.component.html',
  styleUrls: ['customers.component.css']
})
export class CustomersComponent implements OnInit {

  selectedUser?: CustomersData;

  customerList: CustomersData[] = [];

  constructor(private service: CustomersServices,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCustomerList();
  }

  getCustomerList(){
    this.service.getCustomers().subscribe(
      response => {this.customerList = response},
      error => console.log('HTTP Error', error),
      () => console.log('HTTP request completed.'))
  }

  createCustomer(){
    const dialogRef=this.dialog.open(CustomerformComponent, {
      width:'700px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getCustomerList();
    })
  }

  deleteCustomer(id){
    this.service.deleteCustomers(id)
      .pipe(first())
      .subscribe(result=>this.getCustomerList());
  }

  onDelete(id){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      width:'350px',
      data:{
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deleteCustomer(id)
      }
    })
  }

  updateCustomer(pk){
    const dialogRef=this.dialog.open(CustomerformComponent, {
      width:'700px',
      data:{
        id:pk,
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.getCustomerList()});
  }

}

