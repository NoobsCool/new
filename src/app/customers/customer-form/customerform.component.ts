import { Component, Inject, OnInit} from '@angular/core';
import {CustomersServices} from "../customers.services";
import {FormGroup, FormBuilder, Form, Validators} from "@angular/forms";
import {CustomersData} from "../customers.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-customersform',
  templateUrl: 'customerform.component.html',
  styleUrls: ['customerform.component.css']
})
export class CustomerformComponent implements OnInit {


  customerForm!: FormGroup;
  isAddMode!: boolean;
  customer?: CustomersData[]


  constructor(private service: CustomersServices,
              private fb: FormBuilder,
              public dialogRef:MatDialogRef<CustomerformComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {

    const id = this.data.id;
    this.isAddMode = !id;

    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company_name: ['', Validators.required],
    })

    if (!this.isAddMode){
      this.service.getByID(id)
        .pipe(first())
        .subscribe(x=>this.customerForm.patchValue(x));

    }

  }

  onSubmit() {
    if(this.customerForm.valid){
      const formValues=Object.assign({},this.customerForm.value)
      if(!this.isAddMode){
        if('id' in this.data){
          formValues['id']=this.data.id;
          return this.service.putCustomers(formValues).subscribe(
            response => {this.dialogRef.close()},
            error=> console.log('HTTP error',error))
        }
      }
      else{
        return this.service.postCustomers(formValues)
          .pipe(first())
          .subscribe(
          response=>{
            this.dialogRef.close()},
          error => console.log('HTTP error',error)
        )
      }
    }

  }
}

