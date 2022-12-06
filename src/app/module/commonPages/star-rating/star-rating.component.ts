import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit, OnChanges {

  @Input('rating')  rating: number = 3;
  @Input('starCount')  starCount: number = 5;
  @Input('color')  color: string = '#ff8800';
  @Output() ratingUpdated = new EventEmitter();
  ratinger;
  @Input() data;
  ratingArr = [];
	currentRate = 8;
  serviceId;
  reviewList=[]
  reviewList2=[]
  reviewerImage: any;
  constructor(private userService:UserService) {
    
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'data': {
            if (changes['data'].currentValue) {
              this.serviceId = changes['data'].currentValue;
              this.getReviewList();
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    console.log("a " + this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  getReviewList(){
  this.userService.getReviewByService(btoa(this.serviceId)).subscribe(res=>{
  this.reviewList=res.data
  this.reviewList.forEach(element => {
  let imageUrl=this.getUserProfile(element.reviewerImage);
  let image={imageUrl:imageUrl}
  this.reviewList2.push({...element,...image})
  });
  console.log(this.reviewList2);
  })
  }
  onClick(rating: number) {
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  getUserProfile(data){
    console.log(data)
    this.userService.getReviewerImage(data).subscribe(res=>{
      const reader = new FileReader();
        reader.onloadend = () => {
          this.reviewerImage = reader.result;      
        }
        reader.readAsDataURL(res); 
      });
      setTimeout(() => {
      }, 1000);
      console.log(this.reviewerImage)
    return this.reviewerImage
  }

}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
