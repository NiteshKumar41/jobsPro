import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-start-jobshatch',
  templateUrl: './start-jobshatch.component.html',
  styleUrls: ['./start-jobshatch.component.scss']
})
export class StartJobshatchComponent implements OnInit {
  imageUrl = 'http://159.65.9.6:8080/jh/public/images/services/type/';
  carouselData = [];
  carouselvalue = [];
  constructor(private spinnerService: NgxSpinnerService,private userService: UserService) { 
    this.spinnerService.show();
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
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  ngOnInit(): void {
  }

}
