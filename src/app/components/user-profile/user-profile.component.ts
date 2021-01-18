import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  userList: any = [];
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: ToastrService
  ) {
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      name: ['', Validators.required],
      userCode: ['', Validators.required],
      salary: ['', Validators.required],
      address: new FormArray([])
    });
    this.getUsers();
  }
  get g() { return this.dynamicForm.controls; }

  addNewAddressGroup() {
    this.submitted = false;

    const add = this.dynamicForm.get('address') as FormArray;
    add.push(this.formBuilder.group({
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      pin: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required]
    }))
  }

  deleteAddressGroup(index: number) {
    const add = this.dynamicForm.get('address') as FormArray;
    add.removeAt(index)
  }

  onSubmit() {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
      return;
    }
    else {
      console.log(this.dynamicForm.value);
      this.userService.postNewUserData(this.dynamicForm.value).subscribe((res: any) => {
        console.log(res);
        this.toast.success("User Registered Successfull!!", "success");
        this.submitted = false;
        this.dynamicForm.reset();
        this.getUsers();

      }, (err) => {
        this.toast.error("Something Went Wrong", "Opps");
        this.dynamicForm.reset();
      })
    }
  }
  OnEditEmployee(data) {

  }

  deleteEmployeeDetails(id) {

  }
  userLists: any = [];
  getUsers() {
    this.userService.getUsersList().subscribe((response: any) => {
      // let result = _.uniqBy(res.data, 'Usercode');
      let result = response.data;
      console.log("Response:::", result);
      this.userList = result;
      let r_grouped = [];
      let commondata = this.userList
      commondata.forEach(function (a, i) {
        if (!this[a.Usercode]) {
          this[a.Usercode] = { Usercode: a.Usercode, Name: a.Name, Salary: a.Salary, City: [], Address1: [], Address2: [], Pincode: [], State: [], Country: [] };
          r_grouped.push(this[a.Usercode]);
          r_grouped.push(this[a.Name]);
          r_grouped.push(this[a.Salary]);
        }
        // console.log("a.City.replace(/\,/g,",a.City.replace(/\,/g,""));
        
        this[a.Usercode].City.push(a.City);
        this[a.Usercode].Address1.push(a.Address1);
        this[a.Usercode].Address2.push(a.Address2);
        this[a.Usercode].Pincode.push(a.Pincode);
        this[a.Usercode].State.push(a.State);
        this[a.Usercode].Country.push(a.Country);
      }, Object.create(null));
      r_grouped = r_grouped.filter(function (element) {
        return element !== undefined;
      });
      console.log(r_grouped);

    })
  }
}
