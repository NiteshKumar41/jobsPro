import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeleteComponent } from '../../dialogBoxPages/delete/delete.component';
import { WithdrawComponent } from '../../dialogBoxPages/withdraw/withdraw.component';
import { AcceptComponent } from '../../dialogBoxPages/accept/accept.component';
import { RejectComponent } from '../../dialogBoxPages/reject/reject.component';
import { CompleteComponent } from '../../dialogBoxPages/complete/complete.component';
import { CancelComponent } from '../../dialogBoxPages/cancel/cancel.component';
import { OfferFormComponent } from '../../dialogBoxPages/offer-form/offer-form.component';

@Component({
  selector: 'app-app-show',
  templateUrl: './app-show.component.html',
  styleUrls: ['./app-show.component.scss']
})
export class AppShowComponent implements OnInit, OnDestroy {

  @Input() value: number;
  dialogSubscription: Subscription;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.value > 0) {
      this.openDialog(this.value)
    }
  }

  openDialog(index: number) {
    if (index === 14) {
      const dialogRef = this.dialog.open(WithdrawComponent, {});
      if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
      this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result == null || result == undefined) {
          return
        }
      });
    } else if (index === 17) {
      const dialogRef = this.dialog.open(DeleteComponent, {});
      if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
      this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result == null || result == undefined) {
          return
        }
      });
    } else if (index === 23) {
      const dialogRef = this.dialog.open(AcceptComponent, {});
      if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
      this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result == null || result == undefined) {
          return
        }
      });
    } else if (index === 24) {
      const dialogRef = this.dialog.open(RejectComponent, {});
      if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
      this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result == null || result == undefined) {
          return
        }
      });
    } else if (index === 26) {
      const dialogRef = this.dialog.open(CompleteComponent, {});
      if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
      this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result == null || result == undefined) {
          return
        }
      });
    } else if (index === 27) {
      const dialogRef = this.dialog.open(CancelComponent, {});
      if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
      this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result == null || result == undefined) {
          return
        }
      });
    } else if (index === 46) {
      const dialogRef = this.dialog.open(OfferFormComponent, {});
      if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
      this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result == null || result == undefined) {
          return
        }
      });
    }

  }

  ngOnDestroy() {
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
  }
}
