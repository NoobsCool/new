import {Component, OnInit} from '@angular/core';
import {OrdersService} from "./orders.service";
import {OrderData} from "./orders.model";
import {MatDialog} from "@angular/material/dialog";
import {OrderformComponent} from "./orders-form/orderform.component";
import {first} from "rxjs/operators";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  selectedUser?: OrderData;

  orderList: OrderData[] = [];

  constructor(private ordersService: OrdersService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getOrderList()
  }

  getOrderList() {
    this.ordersService.getOrders().subscribe(
      response => {
        this.orderList = response
      },
      error => console.log('HTTP Error', error),
      () => console.log('HTTP request completed.')
    )
  }


  createOrder() {
    const dialogRef = this.dialog.open(OrderformComponent, {
      width: '1000px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getOrderList();
    })
  }

  deleteOrder(id) {
    this.ordersService.deleteOrder(id)
      .pipe(first())
      .subscribe(result => this.getOrderList());
  }

  onDelete(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOrder(id)
      }
    })

  }
}

