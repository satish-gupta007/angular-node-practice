import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  UserInfo: any;
  hide: boolean = true;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpensenModal') closeAddExpensenModal: ElementRef;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('logged-user')));
    this.UserInfo = JSON.parse(localStorage.getItem('logged-user'));
    this.registerForm = this.formBuilder.group({
      firstName: [this.UserInfo.firstName, Validators.required],
      lastName: [this.UserInfo.lastName, Validators.required],
      username: [this.UserInfo.username, Validators.required],
      password: [atob(this.UserInfo.password), [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() { return this.registerForm.controls; }

  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
  onUserEdit() {
  }
  


  onSubmit(data) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.registerForm.value.password = btoa(this.registerForm.value.password)
      this.userService.updateUserData(this.registerForm.value, this.UserInfo.UserID).subscribe((res: any) => {
        if (res) {
          this.toast.success("User Profile Updated Successfull!!", "Success");
          this.getUserinfoAfterUpdate(this.UserInfo['UserID']);
          this.closeAddExpenseModal.nativeElement.click();
        }
        else {
          Swal.fire('Opps', 'Something Went Wrong', 'error');
        }
      }, (err) => {
        Swal.fire('Opps', 'Something Went Wrong', 'error');
      })
    }
  }
  getUserinfoAfterUpdate(id) {
    this.userService.getUserDataById(id).subscribe((res: any) => {
      let loggrduser = res.result;
      if (loggrduser.length > 0) {
        console.log(res.data[0]);

        localStorage.setItem("logged-user", JSON.stringify(res.data[0]));
        this.UserInfo = JSON.parse(localStorage.getItem('logged-user'));
      }
      else {
        Swal.fire("Opps", "Something Went Wrong", "error");
      }
    })
  }
  onLogout() {
    // localStorage.removeItem("logged-user");
    // localStorage.removeItem("token");

    // this.router.navigate(['/login']);
  }
  fileChange(eve){

  }
  AddEmployee() {

  }


  gotoEmployeeList(){
    this.router.navigate(['/employee-list']);
  }
}
