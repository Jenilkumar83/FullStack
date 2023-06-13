import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

function nameValidator(control:AbstractControl) {
  const firstChar = control.value.charAt(0);
  if (!isNaN(firstChar)) {
    return { 'startsWithNumber': true };
  }
  return null;
}

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {
  CategoryList: any = [];
  constructor(private Service:ApiserviceService, 
  private route:Router, private formBuilder: FormBuilder) {}
  categoryForm: FormGroup | any;
  formData: any = {};
  
    ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
        Name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20),nameValidator]]
      });
      this.GetCategoryList();
    }

    GetCategoryList() {
      this.Service.Getcategory().subscribe(data => {
        this.CategoryList = data;
        console.log(data);
      });
    }

    onSubmit() {
      if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      console.log(categoryData.Name);
      const formData = new FormData();
      formData.append('Id', '0');
      formData.append('Name', categoryData.Name);
      this.Service.addCategory(formData).subscribe(result => {
        if(result) {
          alert("Category added successfully")
          this.route.navigate(['/category']);
        }
        else {
          alert("Duplicate category name is not allowed");
        }
      });
    }
  }
}
