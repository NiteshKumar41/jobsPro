import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  url= environment.apiUrl;
  private chatData= new BehaviorSubject({userIdOne:'',userIdTwo:'',type:'SERVICES',jobId:''});
  currentChatData = this.chatData.asObservable();
  constructor(private http: HttpClient) { }
  public signUp(data):Observable<any>{
    return this.http.post(this.url +`jh/public/services/register`,data);
  }
  public login(data):Observable<any>{
    return this.http.post(this.url +`jh/public/services/login`, data)
  }
  public getAllServices():Observable<any>{
    return this.http.get(this.url +`jh/services/type/getAll?page=0&size=10`)
  }
  public getAllRecomdServices(data):Observable<any>{
    return this.http.get(this.url +`jh/services/recomended?page=${data}&size=10`)
  }
  public getSingleServiceByid(id):Observable<any>{
    return this.http.get(this.url+`jh/services/getServiceById/${id}`)
  }
  public getPopular():Observable<any>{
    return this.http.get(this.url +`jh/public/services/popular`)
  }
  public getDashboardData():Observable<any>{
    return this.http.get(this.url + `jh/services/dashboard`)
  }
  public postNewService(data):Observable<any>{
    return this.http.post(this.url + `jh/services/newAds`, data)
  }
  public editPostedService(data):Observable<any>{
    return this.http.post(this.url + `jh/services/updateAds`, data)
  }
  public deletePostedService(id):Observable<any>{
    return this.http.delete(this.url + `jh/services/deleteAds/${id}`)
  }
  public getAllCategoryService():Observable<any>{
    return this.http.get(this.url + `jh/services/category/type/getAll?page=0&size=40`)
  }
  public getPostedServices():Observable<any>{
    return this.http.get(this.url +`jh/services/getUserRecentServices?page=0&size=40`)
  }
  public getSentOffer(status):Observable<any>{
    return this.http.get(this.url+ `jh/services/offer/sent?page=0&size=20&status=${status}`)
  }
  public getReceivedOffer(status):Observable<any>{
    return this.http.get(this.url+ `jh/services/receivedOffers?page=0&size=20&status=${status}`)
  }
  public sendOffer(data):Observable<any>{
    return this.http.post(this.url+ `jh/services/offer/send`,data)
  }
  public accceptReceivedOffer(data):Observable<any>{
    return this.http.post(this.url+ `jh/services/offer/accept`,data)
  }
  public rejectReceivedOffer(data):Observable<any>{
    return this.http.post(this.url+ `jh/services/offer/reject`,data)
  }
  public completeReceivedOffer(data):Observable<any>{
    return this.http.post(this.url+ `jh/services/complete`,data)
  }
  public cancelReceivedOffer(data):Observable<any>{
    return this.http.post(this.url+ `jh/services/offer/cancel`,data)
  }
  public withdrawOffer(data):Observable<any>{
    return this.http.post(this.url + `jh/services/offer/withdraw`,data)
  }
  public updateCurrentChatData(data){
    this.chatData.next({
      userIdOne:data?.userIdOne,userIdTwo:data?.userIdTwo,type:'SERVICES',jobId:data?.jobId
    })
  }
  public sendReview(data):Observable<any>{
    return this.http.post(this.url + `jh/services/review/save`,data);
  }
  public getReview(id):Observable<any>{
    return this.http.get(this.url + `jh/services/review/getReviewByServiceId/${id}`);
  }
  public getReviewByService(id):Observable<any>{
    return this.http.get(this.url + `jh/services/review/getReviewByServiceId/${id}`);
  }
  public getReviewerImage(data):Observable<any>{
    return this.http.get(this.url + `jh/public/images/services?filename=${data}`,{ responseType: 'blob' });
  }
}
