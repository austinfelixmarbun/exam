import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import {SearchComponent} from '../shared/search/search.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit{

  @ViewChild(SearchComponent) searchComponent;
  textbox1 :string = "asd";
  urlJson:string = "./assets/search/searchsupplier.json";
  configuration:any;

  constructor() {
  }
  ngOnInit() {
  }

  search() {
    console.log(this.searchComponent.myForm);
    console.log("This Call Search");
    console.log(this.searchComponent.countForm);
    for (var i = 0; i < this.searchComponent.countForm; i++) {
      var component = this.searchComponent.myForm.nativeElement[i];
      console.log(component);
      if(component.nodeName==='SELECT')
      {
        var ddl = component.options;
        var text = ddl[ddl.selectedIndex].value;
        console.log(component.name + " - " + text);
      }
      else{
        console.log(component.name + " - " + component.value);
      }
      
    }
  }
  

  

}
