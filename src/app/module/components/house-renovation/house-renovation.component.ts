import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StarRatingColor } from '../../commonPages/star-rating/star-rating.component';
import { RejectComponent } from '../../dialogBoxPages/reject/reject.component';
import { ReportComponent } from '../../dialogBoxPages/report/report.component';
import { UserService } from '../../Services/user.service';
import * as moment from 'moment'; 
import { ChatService } from '../../Services/chat/chat.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-house-renovation',
  templateUrl: './house-renovation.component.html',
  styleUrls: ['./house-renovation.component.scss']
})
export class HouseRenovationComponent implements OnInit,OnChanges {
  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  @Input() id;
  services:any=[]
  userId:number;
  reviewList:any=[]
  constructor(private router:Router, private userService:UserService,public dialog: MatDialog ,public chatService:ChatService) { }
  ngOnChanges(changes: SimpleChanges): void {
    // for (const propName in changes) {
    //   if (changes.hasOwnProperty(propName)) {
    //     switch (propName) {
    //       case "id": {     
    //         if (changes[this.id].currentValue) {
    //           console.log();
              
    //           // this.addStock();
    //         }
    //         break;
    //       }
    //     }
    //   }
    // }
  
  }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId'));
    const serviceId=btoa(this.id);
    this.userService.getSingleServiceByid(serviceId).subscribe(res=>{
      if(res.message === 'success')
      {
        this.services = res.data
        let d1= this.services.createdDate
      this.services.createdDate= moment(d1).utcOffset('+0100').format('YYYY-MM-DD ')
      }
      console.log(res);
      
    })
    this.userService.getReview(serviceId).subscribe(res=>{
      if(res.message === 'success'){
        this.reviewList = res.data
        console.log(this.reviewList.length);
        
      }
    })
  }
  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }
  openReportDialog() {
    this.dialog.open(ReportComponent, {
      // data: {
      //   animal: 'panda',
      // },
    });
  }
  sendOffer(id){
    this.userService.sendOffer({"amount":this.services?.amount,"description":this.services?.description,"serviceId":this.services?.id,"fromDate": moment(this.services?.createdDate).utcOffset('+0100').format('YYYY-MM-DD '),"fromTime":this.services?.fromTime}).subscribe(res=>{
      if(res.message === 'offer_sent'){
        this.router.navigateByUrl('/dashboard');
        console.log(res);
      }
    })
  }
  chat(data){
    this.chatService.chatStart({userIdOne:this.userId,userIdTwo:data?.createdUser,type:"SERVICES",jobId:data?.id}).subscribe(res=>{
      if(res.message === 'success'){
        console.log(res.data);
        this.router.navigateByUrl('messages');
      }
      
      
    })
  }
}
