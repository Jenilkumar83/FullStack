import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router,ActivatedRoute   } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  constructor(private Service:ApiserviceService, private router:Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.GetCategoryList();
  }
  formData: any = {};  
  CategoryList: any = [];

  GetCategoryList() {
    this.Service.getCategoryList().subscribe(data => {
      this.CategoryList = data;
      console.log(data);
    });
  }
  
  onDelete(id: any) {
    let request = confirm('Are you sure for deleting this Category?');
    if (request) {
      this.Service.deleteCategory(id).subscribe(response =>{
        if (response){
          alert("Record deleted");
          this.GetCategoryList();
        }
        else {
          alert("Can't delete because for that Category, Product is already exists.");
        }
      });
    }
  }
 
  OnEdit(id: number) {
    this.router.navigate(['/category/edit', id]);
  }
   
  OnSave() {
    const Name = this.formData.Name;
    const formData = new FormData();
    formData.append('Id', '0');
    formData.append('Name', Name);
    this.Service.addProduct(formData).subscribe(result => {
      if(result) {
        this.GetCategoryList();
      }
      else {
        alert("Duplicate Category name is not allowed");
      }
    });
  }
}