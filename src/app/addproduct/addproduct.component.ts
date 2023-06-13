import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent  {
  productForm: FormGroup;
  ProductList: any = [];
  CategoryList: any = [];
  imageUrl: string =this.Service.imageUrl;
  fileData: any =null;
  profile?: string;
  constructor(
    private formBuilder: FormBuilder,
    private ApiserviceService: ApiserviceService,
    private Service:ApiserviceService,
    private router:Router
    ) {
      this.productForm = this.formBuilder.group({
        Name: ['', Validators.required],
        Qty: ['', [Validators.required,Validators.min(1)]],
        Rate: ['', Validators.required],
        IsActive: ['', Validators.required],
        Category: [0, [Validators.required]]
      });
      this.GetCategoryList();
    }

  GetProductList(){
    this.Service.getProductList().subscribe(data=>{
      this.ProductList=data;
      console.log(data);
    });
  }

  GetCategoryList() {
    this.Service.Getcategory().subscribe(data => {
      this.CategoryList = data;
      console.log(data);
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
    const productData = this.productForm.value;
    const formData = new FormData();
    formData.append('Name', productData.Name);
    formData.append('Qty', productData.Qty);
    formData.append('Rate', productData.Rate);
    formData.append('IsActive', productData.IsActive);
    formData.append('catId',productData.Category);
    formData.append('Profile', 'default.jpg');
    if (this.fileData != null) {
      formData.append('Image', this.fileData,this.fileData.name);
    }
    this.ApiserviceService.addProduct(formData).subscribe(response => {
        if (response) {
          console.log('Product added successfully!');
          this.productForm.reset();
          this.router.navigate(['/product']);
        } else {
          alert('Duplicate Product name');
        }
      }
    );
    }
  }
  
  handleUpload(event:any){
    this.fileData=event.target.files[0];
    this.profile=event.target.files[0].name;
  }
}