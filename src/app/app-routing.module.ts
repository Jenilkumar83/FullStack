import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { editproductComponent } from './editproduct/editproduct.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
const routes: Routes = [
  {path:'',component:ProductComponent},
  {path:'product',component:ProductComponent},
  {path:'product/addproduct',component:AddproductComponent},
  {path:'product/editproduct/:id',component:editproductComponent},
  {path:'category',component:CategoryComponent},
  {path:'addcat',component:AddcategoryComponent},
  {path:'category/edit/:id', component:UpdatecategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
