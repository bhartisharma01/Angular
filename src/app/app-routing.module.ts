import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateComponentComponent } from './seller-update-component/seller-update-component.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },{
    path:"seller",
    component:SellerComponent
  },{
    path:"seller-home",
    component:SellerHomeComponent,
    canActivate:[AuthGuard]

  },{
    path:"seller-add-product",
    component:SellerAddProductComponent,
    canActivate:[AuthGuard]

  },{
    path:"seller-update-product/:id",
    component:SellerUpdateComponentComponent,
    canActivate:[AuthGuard]

  },{
    path:"**",
    pathMatch:'full',
    component:PagenotfoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

