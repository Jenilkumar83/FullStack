import { Component,OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  constructor(private service:ApiserviceService, private router:Router) {}
  ngOnInit(): void{
    this.GetProductList()
    this.GetCategoryList()
  }
  ProductList:any=[];
  CategoryList:any=[];
  imageUrl:string=this.service.imageUrl;
  fileData:any=null;
  profile?:string;

  GetCategoryList() {
    this.service.Getcategory().subscribe(data => {
      this.CategoryList = data;
      console.log(data);
    });
  }

  GetProductList()
  {
    this.service.getProductList().subscribe(data =>{
      this.ProductList = data;
      console.log(data);
    });
  }

  catname(catId: number): string {
   const category = this.CategoryList.find((c: { id: number; }) => c.id === catId);
    return category ? category.name : '';
  }

  onEdit(id:any){
    this.router.navigate(['product/editproduct',id]);
  }

  onDelete(id:any){
    let request = confirm("Are you sure for deleting a record ?");
    if(request){
      this.service.deleteProduct(id).subscribe(response => {
        if(response){
          alert("Record deleted");
          this.GetProductList();
        }
        else{
          alert("Something Wrong");
        }
      })
    }
  }
  onSave(){
    const formData = new FormData();
    formData.append('Id','0');
    formData.append('Name','Lemon');
    formData.append('Qty',"10");
    formData.append('Rate',"11");
    formData.append('Profile',"default.jpg");
    formData.append('IsActive',"true");
    formData.append('CatId',"1");
    formData.append('Image',this.fileData);
    this.service.addProduct(formData).subscribe(result => {
      if(result){
        this.GetProductList();
      }
      else{
        alert("Duplicate product name is not allowed");
      }
    });
  }
  handleUpload(event:any){
    this.fileData = event.target.files[0];
    this.profile = event.target.files[0].name;
  }
}
