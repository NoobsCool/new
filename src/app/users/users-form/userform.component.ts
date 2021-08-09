import { Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {first} from "rxjs/operators";
import {UserData} from "../users.model";
import {UsersServices} from "../users.services";

@Component({
  selector: 'app-userform',
  templateUrl: 'userform.component.html',
  styleUrls: ['userform-component.css']
})
export class UserformComponent implements OnInit {


  userForm!: FormGroup;
  isAddMode!: boolean;
  user?: UserData[]

  constructor(private service: UsersServices,
              private fb: FormBuilder,
              public dialogRef:MatDialogRef<UserformComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {

    const id = this.data.id;
    this.isAddMode = !id;

    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
    })

    if (!this.isAddMode) {
      this.service.getByID(id)
        .pipe(first())
        .subscribe(x => this.userForm.patchValue(x));

    }

  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValues = Object.assign({}, this.userForm.value)
      if (!this.isAddMode) {
        if ('id' in this.data) {
          formValues['id'] = this.data.id;
          return this.service.putUsers(formValues).subscribe(
            response => {
              this.dialogRef.close()
            },
            error => console.log('HTTP error', error))
        }
      } else {
        return this.service.postUsers(formValues).subscribe(
          response => {
            this.dialogRef.close()
          },
          error => console.log('HTTP error', error)
        )
      }
    }

  }
}
