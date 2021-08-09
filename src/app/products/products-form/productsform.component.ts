import {Component, Inject, OnInit} from '@angular/core';
import {ProductsServices} from "../products.services";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-productsform',
  templateUrl: 'productsform.component.html',
  styleUrls: ['productsform.component.css']
})
export class ProductsformComponent implements OnInit {


  productForm!: FormGroup;
  isAddMode!: boolean;

  constructor(private service: ProductsServices,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<ProductsformComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {

    const id = this.data.id;
    this.isAddMode = !id;

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      default_price: ['', Validators.required],
      description: ['', Validators.required],
      product_category: [[], Validators.required],
    })

    if (!this.isAddMode) {
      this.service.getByID(id)
        .pipe(first())
        .subscribe(x => this.productForm.patchValue(x));

    }

  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValues = Object.assign({}, this.productForm.value)
      formValues["product_category"] = formValues.product_category.split(',').map(e => e.trim());
      if (!this.isAddMode) {
        if ('id' in this.data) {
          formValues['id'] = this.data.id;
          return this.service.putProduct(formValues).subscribe(
            response => {
              this.dialogRef.close()
            },
            error => console.log('HTTP error', error))
        }
      } else {
        formValues["product_category"] = formValues.product_category.split(',').map(e => e.trim());
        return this.service.postProducts(formValues).subscribe(
          response => {
            this.dialogRef.close()
          },
          error => console.log('HTTP error', error)
        )
      }
    }
  }

}

