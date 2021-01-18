import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


const routes: Routes = [
  {path:'',redirectTo:'registration',pathMatch:'full'},
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'users',component:UserProfileComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'employee-list',component:EmployeeListComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
