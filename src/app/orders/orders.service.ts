import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderData} from "./orders.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  ORDERS_URL=`${environment.BASE_URL}/orders/`;
  EDIT_ORDERS_URL=`${environment.BASE_URL}/orders-edit/`

  constructor(private http:HttpClient) { }

  getOrders(): Observable<OrderData[]> {
    return this.http.get<OrderData[]>(`${this.ORDERS_URL}`)
  }

  getByID(id): Observable<OrderData>{
    return this.http.get<OrderData>(`${this.ORDERS_URL}${id}`)
  }

  postOrders(data): Observable<OrderData>{
    return this.http.post<OrderData>(this.ORDERS_URL,data)
  }

  putOrder(data):Observable<OrderData>{
    return this.http.put<OrderData>(`${this.ORDERS_URL}${data.id}`,data)
  }

  deleteOrder(id):Observable<OrderData>{
    return this.http.delete<OrderData>(`${this.EDIT_ORDERS_URL}${id}`)
  }


}
