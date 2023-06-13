import { Component,OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

function nameValidator(control:AbstractControl) {
  const firstChar = control.value.charAt(0);
  if (!isNaN(firstChar)) {
    return { 'startsWithNumber': true };
  }
  return null;
}

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent implements OnInit{
  catid:number | undefined;
  editcategory: any;
  CategoryList: any = [];
  product: any;
  updateForm: any;
  name: any;
  
  constructor(private route: ActivatedRoute, private ApiService:ApiserviceService,private formBuilder: FormBuilder,private router:Router) {}
  imageUrl: string = this.ApiService.imageUrl;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catid = Number(params.get("id"));
      if (this.catid !== undefined) {
        this.ApiService.EditCategory(this.catid).subscribe(data => {
          this.product = data;
          this.name= data.name;
          console.log(data);
          
          this.updateForm = this.formBuilder.group({
            Name: [this.product.name, [Validators.required, Validators.minLength(2),nameValidator]]
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
      console.log(this.product.id,productData.Name);
      const formData = new FormData();
      formData.append('Id', this.product.id);
      formData.append('Name', productData.Name);
      // this.ApiService.updateCategory(formData).subscribe(
      //   () => {
      //     alert("Category Updated successfully");
      //     this.router.navigate(['/category']);
      //   },
      //   (error) => {
      //     if (error.status === 400) {
      //       alert("Duplicate Category name is not allowed");
      //     } else {
      //       alert("!Error updating product.");
      //     }
      //   }
      // );
      this.ApiService.updateCategory(formData).subscribe(result => {
        if(result) {
          alert("Category updated successfully");
          this.router.navigate(['/category']);
        }
        else {
          alert("Can't update because this category already exists");
        }
      }
      );
    }
  }
}