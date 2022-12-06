import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../../Services/profile/profile.service';
import { UserService } from '../../Services/user.service';
import { EditDashboardComponent } from '../edit-dashboard/edit-dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  serviceImageUrl = 'http://159.65.9.6:8080/jh/public/images/services/type/';
  postedServices = []
  subtab = 1;
  activeTab = 1;
  dashBoardData: any = [];
  addNewService: FormGroup;
  editPostedForm: FormGroup;
  allCategoryServices = []
  ServiceType: any
  sentOfferPendings = []
  sentOnGoing = []
  sentCompleted = []
  receivedOfferPendings = []
  receivedOnGoing = []
  receivedCompleted = []
  closeResult: string;
  profileImage;
  profileData:any;
  userId;
  constructor(private spinnerService: NgxSpinnerService,private userService: UserService, public dialog: MatDialog, private router: Router, private modalService: NgbModal,private profileService:ProfileService) { }

  ngOnInit(): void {
    this.userId= localStorage.getItem('userId')
    this.getDashBoardData();
    this.getProfile();
    this.getProfilePicture();
    this.addNewService = new FormGroup({
      serviceTypeId: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      currency: new FormControl(),
      weekDay: new FormControl(),
      fromTime: new FormControl(),
      toTime: new FormControl(),
      city: new FormControl(),
    });
    this.getAllServices();
    this.getPostedServices();
    this.getSentOffersPending();
  }
  changeTab(value) {
    if (value == 2) {
      this.subtab = value;
      this.activeTab = 4;
    } else {
      this.subtab = value;
    }
  }
  activeSubTab(value) {
    this.spinnerService.show();
    this.activeTab = value;
    if (value === 2) {
      this.userService.getSentOffer('ACCEPTED').subscribe(res => {
        if (res.message === "success") {
          this.sentOnGoing = res?.data?.elements
        }
      })
    }
    if (value === 3) {
      this.userService.getSentOffer('COMPLETED').subscribe(res => {
        if (res.message === "success") {
          this.sentCompleted = res?.data?.elements
        }
      })
    }
    if (value === 6) {
      this.userService.getReceivedOffer('OFFER').subscribe(res => {
        if (res.message === "success") {
          this.receivedOfferPendings = res?.data?.elements
        }
      })
    }
    if (value === 7) {
      this.userService.getReceivedOffer('ACCEPTED').subscribe(res => {
        if (res.message === "success") {
          this.receivedOnGoing = res?.data?.elements
        }
      })
    }
    if (value === 8) {
      this.userService.getReceivedOffer('COMPLETED').subscribe(res => {
        if (res.message === "success") {
          this.receivedCompleted = res?.data?.elements
        }
      })
    }
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }
  getDashBoardData() {
    this.spinnerService.show();
    this.userService.getDashboardData().subscribe((res) => {
      if (res.message === 'success') {
        this.dashBoardData = res.data;
        console.log(this.dashBoardData);
      }
    });
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  postNewService() {
    this.spinnerService.show();
    console.log(this.addNewService.value);
    this.userService.postNewService(this.addNewService.value).subscribe(res => {
      console.log(res);
    })
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  getAllServices() {
    this.spinnerService.show();
    this.userService.getAllCategoryService().subscribe(res => {
      if (res.message === 'success') {
        res.data.elements.forEach(element => {
          element.masterServiceTypeList.forEach(el => {
            this.allCategoryServices.push(el)
          });
        });
      }
    })
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }
  getPostedServices() {
    this.spinnerService.show();
    this.userService.getPostedServices().subscribe(res => {
      if (res.message === "success") {
        this.postedServices = res?.data?.elements;
        console.log(this.postedServices);
      }
    })
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }
  editPostedService(data) {
    this.dialog.open(EditDashboardComponent, {
      data: {
        allCategoryServices: this.allCategoryServices,
        data: data
      }
    });
  }
  deletePostedOffer(id, modal) {
    let deleteId = btoa(id)
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.spinnerService.show();
        this.userService.deletePostedService(deleteId).subscribe(res => {
          console.log(res);
          setTimeout(() => {
            this.spinnerService.hide();
          }, 1000);
        })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }
  getSentOffersPending() {
    this.spinnerService.show();
    this.userService.getSentOffer('OFFER').subscribe(res => {
      if (res.message === "success") {
        this.sentOfferPendings = res?.data?.elements
      }
      console.log(res);
    })
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }
  acceptReceivedOffer(id, modal) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.spinnerService.show();
        this.userService.accceptReceivedOffer({ 'id': id }).subscribe(res => {
          console.log(res);
          setTimeout(() => {
            this.spinnerService.hide();
          }, 1000);
          this.ngOnInit();
        })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }
  completeOrder(data, modal) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.spinnerService.show();
        this.userService.completeReceivedOffer({ 'id': data?.service, 'offerId': data?.id }).subscribe(res => {
          console.log(res);
          setTimeout(() => {
            this.spinnerService.hide();
          }, 1000);
        })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  rejectReceivedOffer(id, modal) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.spinnerService.show();
        this.userService.rejectReceivedOffer({ 'id': id }).subscribe(res => {
          console.log(res);
          this.ngOnInit();
          setTimeout(() => {
            this.spinnerService.hide();
          }, 1000);
        })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }
  cancelReceivedOffer(id, modal) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.spinnerService.show();
        this.userService.cancelReceivedOffer({ 'id': id }).subscribe(res => {
          console.log(res);
          this.ngOnInit();
          setTimeout(() => {
            this.spinnerService.hide();
          }, 1000);
        }
        )
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  withdrawSentOffer(id, modal) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.spinnerService.show();
        this.userService.withdrawOffer({'id':id}).subscribe(res=>{
          console.log(res);
          setTimeout(() => {
            this.spinnerService.hide();
          }, 1000);
          
        })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getProfilePicture() {
    this.profileService.getProfileImage().subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.profileImage = reader.result;
      }
      reader.readAsDataURL(res);
      console.log('2', res);
    });
  }
  getProfile(){
    this.spinnerService.show();
    this.profileService.getProfile().subscribe(res=>{
      if(res.message === 'success'){
        this.profileData=res.data
      }
    })
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }
  chat(data){
    this.userService.updateCurrentChatData({
      "userIdOne": this.userId,
      "userIdTwo": data?.user,
      "type" :  "SERVICES",
      "jobId":  data?.id
    });
    this.router.navigateByUrl('/messages');
  }
  vendorReview(id){
    this.router.navigate(['/vendor-review'], { queryParams: { serviceId: id} });
  }
  cusotmerReview(id){
    this.router.navigate(['/customer-review'], { queryParams: { serviceId: id} });
  }
  addMedia(){
    
  }
}
