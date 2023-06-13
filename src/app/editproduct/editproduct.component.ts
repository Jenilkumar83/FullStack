// import { Component } from '@angular/core';
// @Component({
//   selector: 'app-editproduct',
//   templateUrl: './editproduct.component.html',
//   styleUrls: ['./editproduct.component.css']
// })
// export class editproductComponent {
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormBuilder, MaxLengthValidator, Validators} from '@angular/forms';
import { AbstractControl } from '@angular/forms';

function nameValidator(control:AbstractControl) {
  const firstChar = control.value.charAt(0);
  if (!isNaN(firstChar)) {
    return { 'startsWithNumber': true };
  }
  return null;
}

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class editproductComponent implements OnInit {
  productid:number | undefined;
  editproduct: any;
  CategoryList: any = [];
  product: any;
  updateForm: any;
  fileData: any = null;
  profile?: string;
  constructor(private route: ActivatedRoute, private ApiService:ApiserviceService,
  private formBuilder: FormBuilder,private router:Router) {}
  imageUrl: string = this.ApiService.imageUrl;
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productid = Number(params.get("id"));
      if (this.productid !== undefined) {
        this.ApiService.EditProduct(this.productid).subscribe(data => {
          this.product = data;
          console.log(data);
          this.updateForm = this.formBuilder.group({
            Name: [this.product.name, [Validators.required, Validators.minLength(2),nameValidator]],
            Qty: [this.product.qty, [Validators.required, Validators.min(1)]],
            Rate: [this.product.rate, [Validators.required, Validators.min(1)]],
            IsActive: [this.product.isActive],
            Category: [this.product.catId, [Validators.required]]
          });
        });
      }
    });
    this.GetCategoryList();
  }

  GetCategoryList() {
    this.ApiService.Getcategory().subscribe(data => {
      this.CategoryList = data;
      console.log(data);
    });
  }

  isFormValid() {
    return this.updateForm && this.updateForm.valid;
  }

  onSubmit(){
    if (this.updateForm.valid) {
    const productData = this.updateForm.value;

    console.log(this.product.id,productData.Name, productData.Qty, productData.Rate, 
    productData.IsActive,productData.Category,this.product.profile,this.fileData);
    const formData = new FormData();
    formData.append('Id', this.product.id);
    formData.append('Name', productData.Name);
    formData.append('Qty', productData.Qty);
    formData.append('Rate', productData.Rate);
    formData.append('Profile', this.product.profile);
    formData.append('IsActive', productData.IsActive);
    formData.append('CatId', productData.Category);
    formData.append('Image', this.fileData);
    this.ApiService.updateProduct(formData).subscribe(
      () => {
        alert("Product Updated successfully");
        this.router.navigate(['/product']);
      },
      (error) => {
        if (error.status === 400) {
          alert("Duplicate Product name is not allowed");
        } else {
          alert("!Error updating product.");
        }
      }
    );
   
  }
}
handleUpload(event: any) {
  this.fileData = event.target.files[0];
  this.profile = event.target.files[0].name;
}
}