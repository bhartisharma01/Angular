import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;
  constructor(private HttpCLient: HttpClient) {}

  // signup
  signup(data: any) {
    // console.log('checking signup dtaa', this.url + '/user/signup', data);
    return this.HttpCLient.post(this.url + '/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  // forgot password
  forgotPassword(data: any) {
    return this.HttpCLient.post(this.url + '/user/forgotPassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  //login

  login(data: any) {
    return this.HttpCLient.post(this.url + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  //checkToken
  checkToken() {
    return this.HttpCLient.get(this.url + '/user/checkToken');
  }

  // changePassword
  changePassword(data: any) {
    return this.HttpCLient.post(this.url + '/user/changePassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
