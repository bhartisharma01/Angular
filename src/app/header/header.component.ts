import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType:string='default';
  sellerName:string='';
  searchResult:any | product[];
  constructor(private route: Router, private productService:ProductService) {}
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('sellerData') && val.url.includes('seller')) {
          console.log('menutype seller')
          this.menuType='seller';
          let sellerData = localStorage.getItem('sellerData');
        this.sellerName=sellerData && JSON.parse(sellerData)[0].name;

        }
        else{
          this.menuType='default';
          console.log("menu type default")
        }
      }
    });
  }
  logout(){
    localStorage.removeItem('sellerData');
    this.route.navigate(['/']);
  }
  searchProduct(query:KeyboardEvent){
if(query){
  const element = query.target as HTMLInputElement;
  this.productService.searchProducts(element.value).subscribe((res)=>{
    console.log(res)
    this.searchResult = res;
  })
}
  }
}
