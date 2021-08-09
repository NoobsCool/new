import { Component, OnInit} from '@angular/core';
import {ProductsServices} from "./products.services";
import {ProductsData} from "./products.model";
import {MatDialog} from "@angular/material/dialog";
import {ProductsformComponent} from "./products-form/productsform.component";
import {first} from "rxjs/operators";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedProduct?: ProductsData;

  productList: ProductsData[]=[];

  constructor(public service:ProductsServices,
              private dialog: MatDialog,) { }

  ngOnInit(){
    this.getProductList();
  }

  getProductList(){
    this.service.getProducts().subscribe(
      response=>{this.productList=response})
  }

  createProduct(){
    const dialogRef=this.dialog.open(ProductsformComponent, {
      width:'700px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getProductList();
    })
  }
  deleteProduct(id){
    this.service.deleteProduct(id)
      .pipe(first())
      .subscribe(result=>this.getProductList());
  }

  sort(colName){

  }

  onDelete(id){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      width:'350px',
      data:{
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deleteProduct(id)
      }
    })
  }

  updateProduct(pk){
    const dialogRef=this.dialog.open(ProductsformComponent, {
      width:'700px',
      data:{
        id:pk,
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.getProductList()});
  }

}
