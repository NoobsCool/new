import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthServiceService} from "./auth/auth-service.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'


})
export class LoginComponent implements OnInit {

  form!:FormGroup

  constructor(private fb:FormBuilder,
              private authService:AuthServiceService,
              private router:Router) {

    this.form=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnInit(): void {

    }



}
