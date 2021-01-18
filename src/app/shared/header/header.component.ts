import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onLogOut(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to want to logout from this session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I want it!',
      cancelButtonText: 'No, I not want it'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("logged-user");
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
        Swal.fire(
          'Logout!',
          'You have Successfull Logout from this session',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'You are safe :)',
          'error'
        )
      }
    })
  
  }
}
