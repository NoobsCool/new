import { Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {first} from "rxjs/operators";
import {OrderData} from "../orders.model";
import {OrdersService} from "../orders.service";

@Component({
  selector: 'app-orderform',
  templateUrl: 'orderform.component.html',
  styleUrls: ['orderform.component.css']
})
export class OrderformComponent implements OnInit {


  orderForm!: FormGroup;
  isAddMode!: boolean;
  selectedOrder?: OrderData[]
  orderList: OrderData[] = [];

  constructor(private service: OrdersService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<OrderformComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {

    const id = this.data.id;
    this.isAddMode = !id;

    this.orderForm = this.fb.group({
      code_year: ['', Validators.required],
      date_registered: [new Date()],
      customer: ['', Validators.required],
      creator: ['', Validators.required],
      orderunits: this.fb.group({
        product: ['', Validators.required],
        amount: ['', Validators.required],
        price: ['', Validators.required],
      })
    })

    if (!this.isAddMode){
      this.service.getByID(id)
        .pipe(first())
        .subscribe(x=>this.orderForm.patchValue(x));

    }

  }

  onSubmit() {
    if(this.orderForm.valid){
      const formValues=Object.assign({},this.orderForm.value)
      return this.service.postOrders(formValues)
          .pipe(first())
          .subscribe(
            response=>{
              this.dialogRef.close()},
            error => console.log('HTTP error',error)
          )
      }
    }

}
