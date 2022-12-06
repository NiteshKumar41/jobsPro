import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  public pagination(totalPages:any,pageNumber:any){ 
    var counteri=0;
    var pagination=[];               
    let startPage=pageNumber-2;
    if(startPage<0){
       startPage=0; 
    }
    let endPage=startPage+5;
    for(startPage;startPage<endPage;startPage++){
        pagination[counteri]=startPage;
        if(startPage==totalPages){
            break;
        }
        counteri++;
    }
    return pagination;
}
  public getProfile(): Observable<any> {
    return this.http.get(this.url + `jh/services/user/getProfile`);
  }
  public updateProfilePhoto(data): Observable<any> {
    return this.http.post(
      this.url + `jh/services/user/uploadProfilePicture`,
      data
    );
  }
  public getProfileImage():Observable<Blob>{
    const token = localStorage.getItem('token');
    return this.http.get(this.url + `jh/services/user/getProfilePicture?token=${token}`,{ responseType: 'blob' })
  }
  public uploadIdImage(data):Observable<any>{
    return this.http.post(this.url + `jh/services/user/uploadIdentityDocument`,data)
  }
  public updateProfile(data):Observable<any>{
    return this.http.post(this.url + `jh/services/user/updateProfile`,data)
  }
  public uploadProfileMedia(data):Observable<any>{
    return this.http.post(this.url + `jh/services/user/profile/media/upload`,data)
  }
}
