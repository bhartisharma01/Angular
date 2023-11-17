import { Component, OnInit } from '@angular/core';
import { product } from '../data-model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularProduct: any | product[];
  trendingProducts:any | product[];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.popularProducts().subscribe((res) => {
      this.popularProduct = res;
    });

    this.productService.trendingProducts().subscribe((res)=>{
      this.trendingProducts = res;
    });
  }
}
