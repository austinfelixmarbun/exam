import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProspectObj } from 'app/shared/model/ProspectObj.Model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prospect-appl-data',
  templateUrl: './prospect-appl-data.component.html',
  styleUrls: ['./prospect-appl-data.component.scss']
})
export class ProspectApplDataComponent implements OnInit {
  test: any
  MotherMaidenName: string
  prosObj: ProspectObj;

  constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    let js = this._renderer2.createElement('script');
    js.text = `
          $(document).ready(function(){
            $("#flip1").click(function(){
              $("#panel1").slideToggle("slow");
            });
            $("#flip2").click(function(){
              $("#panel2").slideToggle("slow");
            });
            $("#flip3").click(function(){
              $("#panel3").slideToggle("slow");
            });
          });
        `;
    this._renderer2.appendChild(this._document.body, js);
  }

  SavePros(prsReqFoem: NgForm) {
    console.log(this.MotherMaidenName);
    this.prosObj = new ProspectObj();
    this.prosObj = prsReqFoem.value;

    if (this.prosObj.City) {

    }

    this.test = prsReqFoem.value.Rt
    console.log(this.test)
    console.log('print: ', this.prosObj);
  }
}
