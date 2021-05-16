/**
 * Learning References: 
 * https://www.youtube.com/watch?v=ZvTBGTBikhI
 * https://www.youtube.com/watch?v=DNoPO-WrKyM
 * https://codecraft.tv/courses/angular/custom-directives/creating-a-custom-directive/
 * https://www.freakyjolly.com/angular-create-directive-and-use-in-different-modules-hierarchy-tutorial/
 * 
 * * */
import {Directive, ElementRef, NgModule, OnInit, Renderer2} from '@angular/core';
@Directive({
    selector:'[my-highliter]'
})
export class MyHighlighterDirective implements OnInit{
    constructor(private el:ElementRef, private renderer:Renderer2){
        //el.nativeElement used to get a reference of an element on which this directive is used
        
        // el.nativeElement.style.background='yellow'; 
        renderer.setStyle(el.nativeElement,'background','yellow');
       //console.log(el);
    }
    ngOnInit(): void {
        // this.el.nativeElement.style.background='yellow'; 
        // console.log(this.el);

    }
}
@NgModule({
    declarations: [ MyHighlighterDirective ],
    exports: [ MyHighlighterDirective ]
  })
  
  export class MyHighlighterDirectiveModule {}