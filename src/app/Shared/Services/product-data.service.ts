import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../Types/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
products:IProduct[]=[
  {id:101,name:'Dettol',rate:10},
  {id:102,name:'Cinthol',rate:20},
  {id:103,name:'Hamam',rate:30},
];
private selectedProductSource= new BehaviorSubject<IProduct>( null);
selectedProductChanges$=this.selectedProductSource.asObservable();
  constructor() {
    let p:IProduct;
    let data  =  localStorage.getItem('product');
    if(data){
      p = JSON.parse(data);
      this.changeSelectedProduct(p);
      console.log('ProductDataService constructor method called - data from storage');
      console.log(p);
    }
    else{
    
      console.log('ProductDataService constructor method called - no data available in storage');
      console.log(p);
    }
   }
  
  getList():IProduct[]{
    return this.products;
  }
  changeSelectedProduct(selectedProduct:IProduct):void{
    
    if(selectedProduct===null){
      localStorage.removeItem('product');
      console.log('product removed from local storage');
    }
    else{
      localStorage.setItem('product',JSON.stringify(selectedProduct));
    }
    this.selectedProductSource.next(selectedProduct);
  }
}
