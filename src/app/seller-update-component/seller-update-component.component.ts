import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-model';

@Component({
  selector: 'app-seller-update-component',
  templateUrl: './seller-update-component.component.html',
  styleUrls: ['./seller-update-component.component.css'],
})
export class SellerUpdateComponentComponent implements OnInit {
  updateProductMessage: undefined | string = '';
  productData: any | product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router:Router
  ) {}
  ngOnInit(): void {
    let productId: any = this.route.snapshot.paramMap.get('id');
    productId &&
      this.productService.getProduct(productId).subscribe((res) => {
        this.productData = res;
      });
  }
  updateProduct(data: product) {
    if(this.productData){
      data.id=this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((res) => {
      if (res) {
        this.updateProductMessage = 'Product has been updated';
        this.router.navigate(['/seller-home'])
      }
      setTimeout(() => (this.updateProductMessage = undefined), 3000);
    });

    console.log('updated data', data);
  }
}
