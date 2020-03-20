import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  styleUrls: ['./contact-person-list.component.scss'],
  providers: [NGXToastrService]
})
export class ContactPersonListComponent implements OnInit {

  VendorContactPerson: VendorContactPersonObj;
  VendorIdParam: any;
  resultData: any = new Array();
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  HiddenState: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
    this.route.queryParams.subscribe(params => {
      this.VendorIdParam = params["VendorId"];

    });
  }

  ngOnInit(): void {
    if(this.VendorIdParam != null){
      this.loadTableListData();

    }
    

  }

  loadTableListData(){
    this.VendorContactPerson = new VendorContactPersonObj;
    this.VendorContactPerson.VendorId = this.VendorIdParam;

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
    this.router.navigate(['/Vendor/ContactPerson/Add'], { queryParams: { VendorContactPersonId: id, 'mode': 'edit', VendorId: this.VendorIdParam } });
  }

  Add(){
    this.router.navigate(['/Vendor/ContactPerson/Add'], { queryParams: {VendorId: this.VendorIdParam } });
  }

  deleteVendorContactPerson(id){
    if (confirm("Are you sure you want to delete this record ?")) {
      this.VendorContactPerson = new VendorContactPersonObj;
      this.VendorContactPerson.VendorContactPersonId = id;
      this.http.post(AdInsConstant.DeleteVendorContactPerson, this.VendorContactPerson).subscribe((response) => {
        this.router.navigate(['/Vendor/ContactPerson/List'], { queryParams: { VendorId: this.VendorIdParam } });
        this.toastr.successMessage(response['message']);
        this.loadTableListData();
    },
        (error) => {
            console.log(error);
        });
        
    }
  }

  HiddenCheck() {
    this.HiddenState = false;
    this.objOutput.emit(this.HiddenState);
  }

  NextStep(){
    this.wizard.goToNextStep();
  }
}
