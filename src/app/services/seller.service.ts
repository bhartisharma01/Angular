import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, product, signUp } from '../data-model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  sellerSignup(data: signUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((res) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('sellerData', JSON.stringify(res.body));
        this.router.navigate(['/seller-home']);
      });
  }

  sellerLogin(data: login) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        console.log('seller login service', res);
        if (res && res.body && res.body.length) {
          console.log('user logged in');
          localStorage.setItem('sellerData', JSON.stringify(res.body));
          this.router.navigate(['/seller-home']);
        } else {
          console.log('login failed');
          this.isLoginError.emit(true);
        }
      });
  }
  reloadPage() {
    if (localStorage.getItem('sellerData')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    }
  }

 
}
