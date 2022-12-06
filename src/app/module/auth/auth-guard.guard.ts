import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public router:Router){
  } 
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if(!token){
        this.router.navigateByUrl('/login'); 
    }
    return !!token ? true : false;
     
  }
  
  
}
