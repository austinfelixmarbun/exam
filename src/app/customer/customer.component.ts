import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [NGXToastrService] // add NgbPaginationConfig to the component providers
})
export class CustomerComponent implements OnInit {

  type: string = "add";
  CustType = 'P';
  MrCustRating = 'INDETERMINED';
  custPersonalNo: string = "";
  newCustPersonalNo: any;
  custObj: CustPersonalObj;
  submitProsUrl: any;
  localHostUrl: string = environment.localHostUrl;
  requestObject: any;

  constructor(private router: Router, private spinner: NgxSpinnerService, private httpClient: HttpClient, private toastr: NGXToastrService) { 
    this.submitProsUrl = this.localHostUrl + AdInsConstant.addCustPersonal;

  }

  Submit(lookupZip){
    console.log(lookupZip);
  }

  ngOnInit() {
  }

  SavePros(custReqFoem: NgForm) {
    this.custObj = new CustPersonalObj();
    this.custObj = custReqFoem.value;
    this.custObj.token = 'asdasd';

    this.httpClient.post('http://R3App-Server/BFI_API/POCHit/AddCust', this.custObj).subscribe(
      (response) => {
        console.log("Success");
        console.log(response);
        this.newCustPersonalNo = response;
        if (this.newCustPersonalNo != '') {
          this.toastr.successMessage(this.newCustPersonalNo);
          this.router.navigateByUrl('/office', { skipLocationChange: true }).then(() =>
            this.router.navigate(["customer"]));
        }else {
          this.toastr.typeError();
        }
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );
  }
}
