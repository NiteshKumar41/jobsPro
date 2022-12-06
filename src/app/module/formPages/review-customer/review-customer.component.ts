import { Component, OnInit } from '@angular/core';
import { StarRatingColor } from '../../commonPages/star-rating/star-rating.component';

@Component({
  selector: 'app-review-customer',
  templateUrl: './review-customer.component.html',
  styleUrls: ['./review-customer.component.scss']
})
export class ReviewCustomerComponent implements OnInit {

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
