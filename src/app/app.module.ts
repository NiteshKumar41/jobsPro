import { NgModule } from '@angular/core';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FcqComponent } from './module/formPages/fcq/fcq.component';
import { LoginComponent } from './module/authPages/login/login.component';
import { SignupComponent } from './module/authPages/signup/signup.component';
import { AboutUsComponent } from './module/formPages/about-us/about-us.component';
import { DeleteComponent } from './module/dialogBoxPages/delete/delete.component';
import { AcceptComponent } from './module/dialogBoxPages/accept/accept.component';
import { RejectComponent } from './module/dialogBoxPages/reject/reject.component';
import { CancelComponent } from './module/dialogBoxPages/cancel/cancel.component';
import { AppShowComponent } from './module/dummyPages/app-show/app-show.component';
import { HeaderComponent } from './module/authPages/common/header/header.component';
import { FooterComponent } from './module/authPages/common/footer/footer.component';
import { ContactUsComponent } from './module/formPages/contact-us/contact-us.component';
import { WithdrawComponent } from './module/dialogBoxPages/withdraw/withdraw.component';
import { CompleteComponent } from './module/dialogBoxPages/complete/complete.component';
import { StarRatingComponent } from './module/commonPages/star-rating/star-rating.component';
import { OfferFormComponent } from './module/dialogBoxPages/offer-form/offer-form.component';
import { ReviewVendorComponent } from './module/formPages/review-vendor/review-vendor.component';
import { InsideHeaderComponent } from './module/commonPages/inside-header/inside-header.component';
import { PrivacyPolicyComponent } from './module/formPages/privacy-policy/privacy-policy.component';
import { ReviewCustomerComponent } from './module/formPages/review-customer/review-customer.component';
import { PostNewServiceComponent } from './module/formPages/post-new-service/post-new-service.component';
import {MatMenuModule} from '@angular/material/menu';
import { StartJobshatchComponent } from './module/components/start-jobshatch/start-jobshatch.component';
import { StartSearchComponent } from './module/components/start-search/start-search.component';
import { SearchComponent } from './module/commonPages/search/search.component';
import { ImageCarosualComponent } from './module/commonPages/image-carosual/image-carosual.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HouseRenovationComponent } from './module/components/house-renovation/house-renovation.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ProfileComponent } from './module/components/profile/profile.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './module/Services/Interceptor/token-interceptor.service';
import { DashboardComponent } from './module/components/dashboard/dashboard.component';
import { ReportComponent } from './module/dialogBoxPages/report/report.component';
import { ChatComponent } from './module/components/chat/chat.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { EditDashboardComponent } from './module/components/edit-dashboard/edit-dashboard.component';
import { VendorReviewComponent } from './module/components/vendor-review/vendor-review.component';
import { CustomerReviewComponent } from './module/components/customer-review/customer-review.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterPipe } from './module/pipes/filter.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DeleteComponent,
    AcceptComponent,
    RejectComponent,
    CancelComponent,
    AppShowComponent,
    CompleteComponent,
    WithdrawComponent,
    OfferFormComponent,
    InsideHeaderComponent,
    PostNewServiceComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    AboutUsComponent,
    FcqComponent,
    ReviewCustomerComponent,
    StarRatingComponent,
    ReviewVendorComponent,
    StartJobshatchComponent,
    StartSearchComponent,
    SearchComponent,
    ImageCarosualComponent,
    HouseRenovationComponent,
    ProfileComponent,
    DashboardComponent,
    ReportComponent,
    ChatComponent,
    EditDashboardComponent,
    VendorReviewComponent,
    CustomerReviewComponent,
    FilterPipe
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    AppRoutingModule,
    NgxCaptchaModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSlideToggleModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSnackBarModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  exports:[
    FilterPipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}
    },
    FilterPipe,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
