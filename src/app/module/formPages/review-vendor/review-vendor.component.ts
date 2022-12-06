import { Component, OnInit } from '@angular/core';
import { StarRatingColor } from '../../commonPages/star-rating/star-rating.component';

@Component({
  selector: 'app-review-vendor',
  templateUrl: './review-vendor.component.html',
  styleUrls: ['./review-vendor.component.scss']
})
export class ReviewVendorComponent implements OnInit {

  
  rating:number = 0;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  starRating = 0;
  constructor() { }

  ngOnInit(): void {
  }

  onRatingChanged(rating){
    this.rating = rating;
  }

}
