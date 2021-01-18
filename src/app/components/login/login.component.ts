import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService,
    private toast: ToastrService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(data) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    data.password = btoa(data.password);
    this.userservice.getUserData(data).subscribe((res: any) => {
      console.log(res);
      let loggrduser = res.result;
      if (loggrduser.length > 0) {
        localStorage.setItem("token",res.token)
        localStorage.setItem("logged-user", JSON.stringify(res.result[0]));
        this.router.navigate(['/dashboard']);
        this.toast.success("User Login Successfull!!", "Success");
      }
      else {
         Swal.fire("Failed", "username or password is wrong", "error");
      }

    }, (err) => {
      Swal.fire("Oops", "Something Went Wrong", "error")
    })
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
