import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.scss'],
  providers: [NGXToastrService]
})
export class Template1Component implements OnInit {

  pageType: any;
  test: any = "";

  //** Forms **/
  templateText: any;
  templateTextArea: any;
  templateNumber: any;
  templateDate: any;
  templateSelect: any = 0;
  templateNumberOnly: any;
  templateMaxLength: any;
  templateLabel: any;
  templateCode: any;
  templateEmail:any;
  isActive: any = false;
  templateRadio: any = "M";
  //** Forms **/

  constructor( private route: ActivatedRoute, private toastr: NGXToastrService) { 

    this.route.queryParams.subscribe(params => {
      if (params['title'] != null) {
        this.test = params['title'];
      }
      if (params['pageType'] != null) {
        this.pageType = params['pageType'];
      }
    });}

  ngOnInit() {
  }
  
  //** checkBox value **/
  toggleActive(e) {
    this.isActive = e.target.checked;
  }
  //** checkBox value **/

  SaveForm(form: NgForm){
    console.log(form);
  }

  //** Toastr **/
    // Success Type
    typeSuccess() {
      this.toastr.typeSuccess();
  }

  // Success Type
  typeInfo() {
      this.toastr.typeInfo();
  }

  // Success Type
  typeWarning() {
      this.toastr.typeWarning();
  }

  // Success Type
  typeError() {
      this.toastr.typeError();
  }

  // Custom Type
  typeCustom() {
      this.toastr.typeCustom();
  }

  //progressBar
  progressBar() {
      this.toastr.progressBar();
  }
  //** Toastr **/
}
