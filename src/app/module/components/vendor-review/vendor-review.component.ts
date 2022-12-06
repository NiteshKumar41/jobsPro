import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-vendor-review',
  templateUrl: './vendor-review.component.html',
  styleUrls: ['./vendor-review.component.scss']
})
export class VendorReviewComponent implements OnInit {
  vendorRatingForm:FormGroup
  
  constructor(private route:ActivatedRoute, private router:Router, private userService:UserService) { }
sub;
serviceId;
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
    this.vendorRatingForm = new FormGroup({
      skills: new FormControl(),
      quality: new FormControl(),
      friendliness: new FormControl(),
      deadlines: new FormControl(),
      communication: new FormControl(),
      cooperation: new FormControl(),
      description: new FormControl()
    })
  }
  postVendorRating(){
    console.log(this.vendorRatingForm.value);
    this.vendorRatingForm.value.serviceOfferId = this.serviceId
    this.userService.sendReview(this.vendorRatingForm.value).subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl('dashboard');
    })
    this.router.navigateByUrl('dashboard');
  }
}
