import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductsData} from "./products.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsServices {

  PRODUCTS_URL=`${environment.BASE_URL}/products/`;
  EDIT_PRODUCTS_URL= `${environment.BASE_URL}/products-edit/`;

  constructor(private http:HttpClient) { }

  getProducts(): Observable<ProductsData[]> {
    return this.http.get<ProductsData[]>(`${this.PRODUCTS_URL}`)
  }

  getByID(id): Observable<ProductsData>{
    return this.http.get<ProductsData>(`${this.PRODUCTS_URL}${id}`)
  }

  postProducts(data):Observable<ProductsData>{
    return this.http.post<ProductsData>(this.PRODUCTS_URL,data)
  }

  putProduct(data):Observable<ProductsData>{
    return this.http.put<ProductsData>(`${this.EDIT_PRODUCTS_URL}${data.id}`,data)
  }

  deleteProduct(id):Observable<ProductsData>{
    return this.http.delete<ProductsData>(`${this.EDIT_PRODUCTS_URL}${id}`)
  }
}


