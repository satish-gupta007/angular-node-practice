import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  formData = new FormData();
  image;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toast: ToastrService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profile: ['']
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(data) {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      // console.log(data);
      data.profile = this.image;
      // console.log(data);
      data.password=btoa(data.password);
      this.userService.postUserData(data).subscribe((res: any) => {
        if (res) {
          this.toast.success("Registration Successfull!!", "Success")
          this.router.navigate(['/login']);
        }
        else {
          Swal.fire('Opps', 'Something Went Wrong', 'error')
        }
      }, (err) => {
        Swal.fire('Opps', 'Something Went Wrong', 'error')
      })
    }
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      console.log(this.image)
      // this.

    }
  }
  // onSubmit() {


  //   this.formData.append('file', this.image);
  //   this.formData.append("firstName", "John");

  //   console.log('formData', this.formData);
  //   let url = "http://localhost:4000/users";

  //   this.http.post(url, this.formData).subscribe(res => {
  //     console.log(res)
  //   }, (err) => {
  //     console.log(err)
  //   })
  // }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
