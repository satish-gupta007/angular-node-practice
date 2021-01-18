import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  EmployeeList: any;
  employeeForm: FormGroup;
  submitted = false;
  UpdateButton = false;
  @ViewChild('closeAddExpensenModal') closeAddExpensenModal: ElementRef;

  get g() { return this.employeeForm.controls; }

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private toast: ToastrService

  ) { }

  ngOnInit(): void {
    this.employeeFormInit();
    this.getEmployeeList();
  }
  employeeFormInit() {
    this.employeeForm = this.formBuilder.group({
      empID: [''],
      name: ['', Validators.required],
      empCode: ['', Validators.required],
      salary: ['', Validators.required],

    })
  }
  getEmployeeList() {
    this.userService.getEmployeeListData().subscribe((data: any) => {
      console.log(data);
      this.EmployeeList = data['data'];
      console.log(this.EmployeeList);

    })
  }
  OnEditEmployee(user) {
    this.employeeForm.setValue({
      empID: user.EmpID,
      name: user.Name,
      empCode: user.EmpCode,
      salary: user.Salary,
    })
    this.UpdateButton = true;
  }
  addEmployee(data) {
    this.UpdateButton = false;
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    else {
      console.log(data);
      this.userService.postEmployeeData(data).subscribe((res: any) => {
        if (res) {
          this.toast.success("Employee Registered Successfull!!", "Success");
          this.closeAddExpensenModal.nativeElement.click();
          this.employeeForm.reset();
          this.getEmployeeList();
        }
        else {
          Swal.fire('Opps', 'Something Went Wrong', 'error');
        }
      }, (err) => {
        Swal.fire('Opps', 'Something Went Wrong', 'error');
      })
    }
  }


  updateEmployee(data) {
    this.userService.updateEmployeeData(data, data.empID).subscribe((res: any) => {
      if (res) {
        this.toast.success("Employee-Details Updated Successfull!!", "Success");
        this.closeAddExpensenModal.nativeElement.click();
        this.getEmployeeList();
      }
      else {
        Swal.fire('Opps', 'Something Went Wrong', 'error');
      }
    },(err) => {
      Swal.fire('Opps', 'Something Went Wrong', 'error');
    })
  }
  onCancel() {
    this.UpdateButton = false;
    this.closeAddExpensenModal.nativeElement.click();
  }
  addNewEmployee() {
    this.UpdateButton = false;
    this.employeeForm.reset();
  }

  deleteEmployeeDetails(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteEmployeeData(id).subscribe((res:any)=>{
          console.log(res)
        })
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      this.getEmployeeList();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  
  }
}
