import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../../Services/profile/profile.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-start-search',
  templateUrl: './start-search.component.html',
  styleUrls: ['./start-search.component.scss'],
})
export class StartSearchComponent implements OnInit {
  isLogin: boolean;
  recommendedServices: any;
  public serviceID: any;
  public singleService: boolean = false;
  carouselData = [];
  carouselvalue = [];
  imageUrl = 'http://159.65.9.6:8080/jh/public/images/services/type/';
  filteredOptions:any=[];
  locationOptions:any=[]
  searchText;
  totalElements:any=[];
  totalPages:any=[];
  newtotal:any=[];
  pageNumber:any=[];
  pagination:any=[];
  paginationFormData:any = {
    CurrentPageTotal: 0,
    pageNumber: 0,
    totalPages: 0,
    size: 0
};
  constructor(private spinnerService: NgxSpinnerService,private userService: UserService,private profileService:ProfileService) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    this.userService.getPopular().subscribe((res) => {
      if (res.message === 'success') {
        res.data.forEach((element) => {
          element.thumbImage = this.imageUrl + element.image;
          element.title = element.ms;
          this.carouselvalue.push(element);
          
        });
        this.carouselData = this.carouselvalue;
        
      }
    });
  }
  
  ngOnInit(): void {
    this.userService.getAllRecomdServices(this.paginationFormData.pageNumber).subscribe((res) => {
      if (res.message === 'success') {
        console.log(res);
        this.recommendedServices = res.data.elements;
        this.totalElements = res.data.totalElements;
        this.totalPages = res.data.totalPages;
        this.newtotal = this.totalPages - 1;
        this.pageNumber = res.data.pageNumber;
        this.pagination = this.profileService.pagination(this.newtotal, this.pageNumber);
        res.data.elements.forEach(element => {
          this.filteredOptions.push(element.serviceType.en)
        });
        
      }
    });
  }
  sendOffer(id) {
    this.singleService = true;
    this.serviceID = id;
    console.log(this.serviceID);
  }
  searchPage(pageNum:any) {
    this.paginationFormData.pageNumber = pageNum;
    this.ngOnInit();
}

searchNextPage () {
    let pageNum = this.pageNumber;
    pageNum++;
    this.searchPage(pageNum);
};


searchPerviousPage  () {
    let pageNum = this.pageNumber;
    pageNum--;
    if (pageNum < 0) {
        pageNum = 0;
    }
    this.searchPage(pageNum);
}
}
