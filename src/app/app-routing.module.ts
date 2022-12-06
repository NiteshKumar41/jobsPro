import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './module/auth/auth-guard.guard';
import { SearchComponent } from './module/commonPages/search/search.component';
import { ChatComponent } from './module/components/chat/chat.component';
import { CustomerReviewComponent } from './module/components/customer-review/customer-review.component';
import { DashboardComponent } from './module/components/dashboard/dashboard.component';
import { ProfileComponent } from './module/components/profile/profile.component';
import { StartJobshatchComponent } from './module/components/start-jobshatch/start-jobshatch.component';
import { StartSearchComponent } from './module/components/start-search/start-search.component';
import { VendorReviewComponent } from './module/components/vendor-review/vendor-review.component';

const routes: Routes = [
  {path:'',redirectTo: "/login", pathMatch: 'full'},
  {path:'login',component:StartJobshatchComponent},
  {path:'home', component:StartSearchComponent,canActivate:[AuthGuardGuard]},
  {path:'services',component:StartSearchComponent,canActivate:[AuthGuardGuard]},
  {path:'profile', component:ProfileComponent,canActivate:[AuthGuardGuard]},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuardGuard]},
  {path:'messages', component:ChatComponent, canActivate:[AuthGuardGuard]},
  {path:'vendor-review', component:VendorReviewComponent, canActivate:[AuthGuardGuard]},
  {path:'customer-review', component:CustomerReviewComponent, canActivate:[AuthGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
