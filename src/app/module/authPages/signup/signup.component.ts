import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthserviceService } from '../../Services/auth/authservice.service';
import { UserService } from '../../Services/user.service';
// export interface DialogData {
//   animal: 'panda' | 'unicorn' | 'lion';
// }
// @Inject(MAT_DIALOG_DATA) public data: DialogData,
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm:FormGroup
  aFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService:UserService,public auth: AuthserviceService)
   { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName:[''],
      email:[''],
      password:[''],
      confirmPassword:[]
    });
  }

  handleReset() {

  }

  handleExpire() {

  }

  handleLoad() {

  }

  handleSuccess(event: any) {

  }
  signUp(){
  console.log(this.signUpForm.value);
  this.userService.signUp(this.signUpForm.value).subscribe(res=>{
    if(res.message === 'registration_succcess'){
      console.log(res);
      localStorage.setItem('token', res.accessToken);
      this.ngOnInit();
    }
    
  })
  }

}
