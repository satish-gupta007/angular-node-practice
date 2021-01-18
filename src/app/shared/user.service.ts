import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:4000/users";
  Employeeurl = "http://localhost:4000/employeelist";
  userlist = "http://localhost:4000/user-info";

  constructor(private http: HttpClient) { }

  getUserData(data) {
    return this.http.get(this.url, { params: data })
  }


  getUserDataById(id) {
    return this.http.get(this.url + '/' + id)
  }

  postUserData(data) {
    return this.http.post(this.url, data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }


  updateUserData(data, id) {
    return this.http.put(this.url + '/' + id, data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }


  uploadImage(data) {
    return this.http.post(this.url + '/upload', data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }


  postEmployeeData(data) {
    return this.http.post(this.Employeeurl, data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  getEmployeeListData() {
    return this.http.get(this.Employeeurl);
  }

  updateEmployeeData(data, id) {
    return this.http.put(this.Employeeurl + '/' + id, data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  deleteEmployeeData(id) {
    return this.http.delete(this.Employeeurl + '/' + id)
  }


  postNewUserData(data) {
    return this.http.post(this.userlist, data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }
  getUsersList(){
    return this.http.get(this.userlist);
  }
}
