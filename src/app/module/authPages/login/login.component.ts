import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../Services/auth/authservice.service';
import { UserService } from '../../Services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,public auth: AuthserviceService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailAddress: new FormControl(),
      password: new FormControl(),
    });
  }
  openDialog() {
    this.dialog.open(SignupComponent, {});
  }
  login() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe((res) => {
      if (res.message === 'login_success') {
        this.router.navigateByUrl('/home');
        this.dialog.closeAll();
        localStorage.setItem('token', res.jobBossToken);
        localStorage.setItem('userId', res.userId);
      }
      else{
        console.log('error');
        
      }
    });
  }
}
