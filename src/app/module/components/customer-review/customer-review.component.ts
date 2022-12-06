import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.scss']
})
export class CustomerReviewComponent implements OnInit {
  customerRatingForm:FormGroup
  sub;
  serviceId;
  constructor(private route:ActivatedRoute, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.serviceId = +params['serviceId'] || 0;
    });
    if(this.serviceId === 0){
      this.router.navigateByUrl('dashboard')
    }
    this.customerRatingForm= new FormGroup({
      skills: new FormControl(),
      quality: new FormControl(),
      friendliness: new FormControl(),
      deadlines: new FormControl(),
      communication: new FormControl(),
      cooperation: new FormControl(),
      description: new FormControl()
    })
  }
  postCustomerRating(){
    console.log(this.customerRatingForm.value);
    this.customerRatingForm.value.serviceOfferId = this.serviceId
    this.userService.sendReview(this.customerRatingForm.value).subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl('dashboard');
    })
    this.router.navigateByUrl('dashboard');
  }
  
}
