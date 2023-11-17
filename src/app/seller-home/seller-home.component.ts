import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-model';
import {faTrash, faPen} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  //productList:undefined | product[];
  productList: any | product[];
  productDeleteMessage:undefined | string;
  faTrash=faTrash
  faPen=faPen
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productsList();
  }
  productsList(){
    this.productService.productList().subscribe((res) => {
      this.productList = res;
      console.log('product data list', this.productList);
    });
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res) => {
      if (res) {
        this.productDeleteMessage="Product is deleted";
        this.productsList();
      }
      setTimeout(()=>(this.productDeleteMessage=undefined), 3000)

    });
  }


}
