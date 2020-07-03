import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorContactPersonObj } from 'app/shared/model/VendorContactPersonObj.Model';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-contact-person-list',
  templateUrl: './contact-person-list.component.html',
  providers: [NGXToastrService]
})
export class ContactPersonListComponent implements OnInit {
  VendorContactPersonId: any;
  VendorContactPerson: VendorContactPersonObj;
  resultData: any = new Array();
  @Input() objInput: any;
  @Input() show = true;
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  HiddenState: boolean;
  mode: string = "add";
  
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
  }

  ngOnInit(){
    if(this.objInput["VendorId"] != null){
      this.loadTableListData();
    }
  }

  loadTableListData(){
    this.VendorContactPerson = new VendorContactPersonObj;
    this.VendorContactPerson.VendorId = this.objInput["VendorId"];

    this.http.post(AdInsConstant.GetListVendorContactPersonByVendorId, this.VendorContactPerson).subscribe(
      (response) => {
        this.resultData = response["ReturnObject"];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editVendorContactPerson(id) {
    this.VendorContactPersonId = id; 
    this.mode = "edit";
    this.HiddenCheck();
  }

  deleteVendorContactPerson(id){
    if (confirm("Are you sure you want to delete this record ?")) {
      this.VendorContactPerson = new VendorContactPersonObj;
      this.VendorContactPerson.VendorContactPersonId = id;
      this.http.post(AdInsConstant.DeleteVendorContactPerson, this.VendorContactPerson).subscribe((response) => {
        this.toastr.successMessage(response['message']);
        this.loadTableListData();
    },
        (error) => {
            console.log(error);
        });
        
    }
  }

  HiddenCheck() {
    var obj={
      HiddenState: false,
      VendorId: this.objInput.VendorId,
      mode: this.mode,
      VendorContactPersonId: this.VendorContactPersonId
    }
    this.objOutput.emit(obj);
  }

  NextStep(){
    this.wizard.goToNextStep();
  }
}
