import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomersData} from "./customers.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersServices {

  CUSTOMERS_URL = `${environment.BASE_URL}/customers/`;
  EDIT_CUSTOMERS_URL = `${environment.BASE_URL}/customers-edit/`;

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<CustomersData[]> {
    return this.http.get<CustomersData[]>(this.CUSTOMERS_URL)
  }

  getByID(id): Observable<CustomersData>{
    return this.http.get<CustomersData>(`${this.CUSTOMERS_URL}${id}`)
  }

  postCustomers(data):Observable<CustomersData>{
    return this.http.post<CustomersData>(this.CUSTOMERS_URL,data)
  }

  putCustomers(data):Observable<CustomersData>{
    return this.http.put<CustomersData>(`${this.EDIT_CUSTOMERS_URL}${data.id}`,data)
  }

  deleteCustomers(id):Observable<CustomersData>{
    return this.http.delete<CustomersData>(`${this.EDIT_CUSTOMERS_URL}${id}`)
  }


}

