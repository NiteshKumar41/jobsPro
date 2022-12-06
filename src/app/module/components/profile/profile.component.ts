import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { StarRatingColor } from '../../commonPages/star-rating/star-rating.component';
import { ProfileService } from '../../Services/profile/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,AfterViewInit{
  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  profileData:any;
  isEditProfile:boolean=false;
  isUploadPhoto:boolean=false;
  profilePage:boolean=true;
  thumbnail: any;
  editProfileForm:FormGroup
  profileImageUrl;
  icFrontUrl;
  icBackUrl;
  url:any
  myFiles: string[] = []; 
  mediaFile:string[]=[]
  profileImage: any;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  uploadMedia:boolean=false
  constructor(private spinnerService: NgxSpinnerService,private http: HttpClient, private profileService:ProfileService,private sanitizer: DomSanitizer) { 
    this.getProfilePicture()
  }

  ngOnInit(): void {
  this.getProfile();
  this.getProfilePicture();
  this.editProfileForm= new FormGroup({
    name: new FormControl(),
    gender: new FormControl(),
    dob: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    countryCode: new FormControl(),
    phone: new FormControl(),
    about: new FormControl(),
  })
  }
  ngAfterViewInit() {
   
  }
  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }
  getProfile(){
    this.spinnerService.show();
    this.profileService.getProfile().subscribe(res=>{
      if(res.message === 'success'){
        this.profileData=res.data;
      }
    })
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }
 getProfilePicture(){
  this.spinnerService.show();
    this.profileService.getProfileImage().subscribe(res=>{
      const reader = new FileReader();
        reader.onloadend = () => {
          this.profileImage = reader.result;      
        }
        reader.readAsDataURL(res); 
      });
      setTimeout(() => {
        this.spinnerService.hide();
      }, 1000);
  }
  
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event) => { 
        this.url = event.target.result;
      }
    }
  }
  verifyProfile(){
    // this.isEditProfile=true
    this.profilePage=false
    this.isUploadPhoto=true
  }
  editProfile(profileData){
    this.isEditProfile=true
    this.isUploadPhoto=false
    this.editProfileForm.patchValue(profileData)
  }
  updateProfile(){
    this.spinnerService.show();
    console.log(this.editProfileForm.value);
    this.isEditProfile=false
    this.isUploadPhoto=true
    if(this.editProfileForm.value.name != 'null' ||this.editProfileForm.value.name != ''){
    this.profileService.updateProfile(this.editProfileForm.value).subscribe(res=>{
      if(res.message === 'success'){
        console.log(res.data);
      }
    })

    }
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }
  
  uploadDocument($event) {
    for (const droppedFile of $event.target.files) {
      console.log("droppedFile: " + JSON.stringify(droppedFile));
      this.sendFileRequest(
        droppedFile,
        droppedFile.name,
        droppedFile.relativePath
      );
    }
  }
  sendFileRequest(droppedFile, fileName, relativePath) {
    this.spinnerService.show();
   const formData = new FormData();
   formData.append("file", droppedFile, relativePath);
   console.log(formData);
   this.profileService.updateProfilePhoto(formData).subscribe(res=>{
    // this.toaster.success("Profile Image Uploaded successfully !!", "Profile Image Uploaded successfully !!");
    this.getProfilePicture();
   })
   setTimeout(() => {
    this.spinnerService.hide();
  }, 1000);
  }
  getFileDetails(e) {  
    for (var i = 0; i < e.target.files.length; i++) {  
      this.myFiles.push(e.target.files[i]);  
     }   
  } 
  uploadFiles() {  
    this.spinnerService.show();
    this.isUploadPhoto=false
    this.profilePage=true
    const formData = new FormData();  
    for (var i = 0; i < this.myFiles.length; i++) {  
      if (i == 0) {  
        formData.append("file", this.myFiles[i]);  
      }else if(i == 1){
        formData.append("file2", this.myFiles[i]); 
      }
    }  
    this.profileService.uploadIdImage(formData).subscribe(res=>{
      console.log(res);
    })
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
    this.myFiles =[]
  }  
  getMediaFile(e){
    for (var i = 0; i < e.target.files.length; i++) {  
      this.mediaFile.push(e.target.files[i]);  
     } 
  }
  updateProfileMedia(){
    this.spinnerService.show();
    const formData = new FormData(); 
    for (var i = 0; i < this.mediaFile.length; i++) {  
        formData.append("file", this.mediaFile[i]);   
    } 
    this.profileService.uploadProfileMedia(formData).subscribe(res=>{
      if(res.message === 'file_uploaded'){
        console.log(res);
        
      }
    })
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
    this.uploadMedia=false
    this.mediaFile =[]
  }
  editMedia(){
    this.uploadMedia=true
  }
  
}
