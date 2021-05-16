import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService } from 'src/app/Shared/Services/product-data.service';
import { IProduct } from 'src/app/Shared/Types/product-type';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
products:IProduct[];
selectedProduct:IProduct;
  constructor(private productDataService:ProductDataService, private router:Router) {
    console.log('product list constructor');
   }

  ngOnInit(): void {
    this.products = this.productDataService.getList();
  }
  edit(){
    if(!this.selectedProduct){
      alert('Please select product')
      return;
    }
    this.router.navigate(['productedit', this.selectedProduct.id]);
    // console.log(this.selectedProduct);
  }
 
  onRowSelect(data):void{
    // console.log(data);
  
  }
  onRowUnselect(data):void{
    // console.log(data);
  }
}
