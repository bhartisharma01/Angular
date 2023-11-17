import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { product } from '../data-model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined;
  constructor(private productService:ProductService){}
  addProduct(data:product):any{
    this.productService.addProduct(data).subscribe((res)=>{
      console.log('data',res);
      if(res){
        this.addProductMessage='Product is added successfully';
      }
      setTimeout(()=>(this.addProductMessage=undefined), 3000)
    });
  }
}
