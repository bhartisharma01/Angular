import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private router: Router) {}
  // add product

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  // product list
  productList() {
    return this.http.get('http://localhost:3000/products');
  }
  // delete product

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  //get single product
  getProduct(id: number) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }
  //update product
  updateProduct(product: product) {
    return this.http.put(`http://localhost:3000/products/${product.id}`, product);
  }

  // popular products
  popularProducts(){
    return this.http.get('http://localhost:3000/products?_limit=3');
  }
  // trending products
  trendingProducts(){
    return this.http.get('http://localhost:3000/products?_limit=8');
  }
  // searchProducts

  searchProducts(query:string){
    return this.http.get(`http://localhost:3000/products?q=${query}`);
  }
}
