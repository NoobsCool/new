import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData} from "./users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersServices {

  USERS_URL = `${environment.BASE_URL}/users/`;
  USERS_EDIT_URL = `${environment.BASE_URL}/users-edit/`;

  constructor(private http:HttpClient) { }

  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.USERS_URL)
  }

  getByID(id): Observable<UserData>{
    return this.http.get<UserData>(`${this.USERS_URL}${id}`)
  }

  postUsers(data):Observable<UserData>{
    return this.http.post<UserData>(this.USERS_URL,data)
  }

  putUsers(data):Observable<UserData>{
    return this.http.put<UserData>(`${this.USERS_EDIT_URL}${data.id}`,data)
  }

  deleteUsers(id):Observable<UserData>{
    return this.http.delete<UserData>(`${this.USERS_EDIT_URL}${id}`)
  }
}

