import {Component, OnInit} from '@angular/core';
import {UsersServices} from "./users.services";
import {UserData} from "./users.model";
import {UserformComponent} from "./users-form/userform.component";
import {first} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  selectedUser?: UserData;

  userList: UserData[] = [];

  constructor(private userService: UsersServices,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
    this.userService.getUsers().subscribe(
      response => {this.userList = response},
      error => console.log('HTTP Error', error),
      () => console.log('HTTP request completed.'))
  }

  deleteUser(id){
    this.userService.deleteUsers(id)
      .pipe(first())
      .subscribe(result=>this.getUserList());
  }


  createUser(){
    const dialogRef=this.dialog.open(UserformComponent, {
      width:'700px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getUserList();
    })
  }

  onDelete(id){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      width:'350px',
      data:{
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deleteUser(id)
      }
    })
  }

  updateUser(pk){
    const dialogRef=this.dialog.open(UserformComponent, {
      width:'700px',
      data:{
        id:pk,
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.getUserList()});
  }

}
