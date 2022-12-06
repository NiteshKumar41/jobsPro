import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.scss']
})
export class EditDashboardComponent implements OnInit {
  editPostedForm: FormGroup
  public allCategoryServices;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) {
    this.allCategoryServices = data?.allCategoryServices
  }

  ngOnInit(): void {
    this.editPostedForm = new FormGroup({
      serviceTypeId: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      currency: new FormControl(),
      weekDay: new FormControl(),
      fromTime: new FormControl(),
      toTime: new FormControl(),
      city: new FormControl(),
    })
    this.editPostedForm.patchValue(this.data?.data)
  }
  updatePostedService() {
   this.editPostedForm.value.id= this.data?.data?.id
    this.userService.editPostedService(this.editPostedForm.value).subscribe(res => {
      console.log(res);
      this.dialog.closeAll();
    })


  }

}
