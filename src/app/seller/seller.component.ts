import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-model';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  showLogin: boolean = false;
  authError: string = '';
  ngOnInit(): void {
    this.sellerService.reloadPage();
  }
  constructor(private sellerService: SellerService, private router: Router) {}
  signUp(data: signUp): void {
    this.sellerService.sellerSignup(data);
  }
  login(data: any): void {
    this.authError = '';
    this.sellerService.sellerLogin(data);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is incorrect';
      }
    });
  }
  showLoginForm() {
    this.showLogin = true;
  }
  showSignupForm() {
    this.showLogin = false;
  }
}
