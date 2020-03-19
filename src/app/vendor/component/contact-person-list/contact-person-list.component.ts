import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorContactPersonObj } from 'app/shared/model/VendorContactPersonObj.Model';

@Component({
  selector: 'app-contact-person-list',
  templateUrl: './contact-person-list.component.html',
  styleUrls: ['./contact-person-list.component.scss'],
  providers : [NGXToastrService]
})
export class ContactPersonListComponent implements OnInit {

  VendorContactPerson: VendorContactPersonObj;
  VendorIdParam: any;
  resultData : any = new Array();
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  HiddenState: boolean;
  


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      
      this.VendorIdParam = params["VendorId"];

    });
  }

  ngOnInit(): void {
    this.VendorContactPerson = new VendorContactPersonObj;
    this.VendorContactPerson.VendorId = this.VendorIdParam;

    this.http.post(AdInsConstant.GetListVendorContactPersonByVendorId, this.VendorContactPerson).subscribe(
      (response) => {

        this.resultData = response["ReturnObject"];
        console.log("isi resultDATAAA");
        console.log(this.resultData);
      },
      (error) => {
        console.log(error);
      });

  }


  editVendorContactPerson(id){
    this.router.navigate(['/Vendor/ContactPerson/Add'], { queryParams: { VendorContactPersonId: id, 'mode' : 'edit', VendorId : this.VendorIdParam}  });
  }

  HiddenCheck(){
    this.HiddenState = false;
    this.objOutput.emit(this.HiddenState);
  }
}
