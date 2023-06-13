import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  readonly apiUrl = 'http://localhost:21657/api/';
  readonly imageUrl = 'http://localhost:21657/images/';
  constructor(private http:HttpClient) { }
  getProductList():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+"Product");
  }
  getCategoryList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"Category");
  }
  addProduct(product:any):Observable<any>{
    return this.http.post(this.apiUrl+"Product/createproduct/",product);
  }
  addCategory(category:any):Observable<any>{
    return this.http.post(this.apiUrl+"Category/createcategory/",category);
  }
  EditProduct(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"Product/getproduct?id="+id);
  }
  EditCategory(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"Category/getcategory?id="+id);
  }
  updateProduct(product:any):Observable<any>{
    return this.http.put(this.apiUrl+"Product/editproduct",product);
  }
  updateCategory(product:any):Observable<any>{
    return this.http.put(this.apiUrl+"Category/updateCategory",product);
  }
  getProductById(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"Product?id="+id);
  }
  getCategoryById(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"Category?id="+id);
  }
  deleteProduct(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+"Product/deleteproduct?id="+id);
  }
  deleteCategory(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+"Category/deletecategory?id="+id);
  }
  Getcategory():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl +"Category");
  }
}
