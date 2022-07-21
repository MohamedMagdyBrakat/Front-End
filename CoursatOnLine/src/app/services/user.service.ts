import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_TYPE } from '../_models/login';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router:Router,private httpclient: HttpClient) { }
  setUser(data:LOGIN_TYPE):void{
    window.localStorage.setItem('token',`Bearer ${data.token}`);
    window.localStorage.setItem('userId',JSON.stringify(data.id));
    window.localStorage.setItem('user',JSON.stringify(data) )
    console.log('from userLogin',data);
  }
  getUser(): LOGIN_TYPE|null{
    const userData = window.localStorage.getItem('user')
    if(!userData){
      return null;
    }
    return JSON.parse(userData);
  }

  getUserToken():string{
    return window.localStorage.getItem('token') || '';
  }

  getUserId():number|null{
    let userId = window.localStorage.getItem('userId');
    if(!userId){
      return null;
    }
    return JSON.parse(userId);
  }

  userExist():boolean{
    return this.getUser() !==  null;
  }

  clear(){
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  public getInsById(url: string,id: number): Observable<any>{
    return this.httpclient.get(url + id);
  }


}
