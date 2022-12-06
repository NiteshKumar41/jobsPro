import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchTerm:any
  signedIn:boolean=false
  collapsed = true;
    @Input()isLoggedIn
  public signIn:boolean=true
  constructor(public dialog: MatDialog,private router:Router) { 
    if(localStorage.getItem('token')){
      this.signedIn=true
    }
  }

  ngOnInit(): void {
    if(this.isLoggedIn){
      this.router.navigateByUrl['/home'];
    }
  }
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  openDialog() {
    this.dialog.open(LoginComponent, {
      // data: {
      //   animal: 'panda',
      // },
    });
  }
  signOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.signedIn=false
  }
  profile(){
    this.router.navigateByUrl('/profile')
  }
  dashboard(){
    this.router.navigateByUrl('/dashboard')
  }
  message(){
    this.router.navigateByUrl('/messages')
  }
  postNewService(){
    this.router.navigateByUrl('/dashboard')
  }
  services(){
    this.router.navigateByUrl('/services')
  }
}
