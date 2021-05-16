import { NgModule } from '@angular/core';
import { ProductListComponent } from './list/product-list.component';
import { SharedModuleModule } from '../Shared/shared-module/shared-module.module';
import { RouterModule } from '@angular/router';
import { ProductEditComponent } from './edit/product-edit.component';
import { MyHighlighterDirective, MyHighlighterDirectiveModule } from '../app.myhighliter';



@NgModule({
  declarations: [ProductListComponent, ProductEditComponent],
  imports: [
    SharedModuleModule,
    MyHighlighterDirectiveModule,
    RouterModule.forChild([
      {
        path:'products', 
        component:ProductListComponent
      },
      {
        path:'productedit/:id', 
        component:ProductEditComponent
      }
    ])
  ]
})
export class ProductModule { }
