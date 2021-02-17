import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CabinetWithListRackObj } from 'app/shared/model/document-management/CabinetWithListRackObj.Model';
import { RackWithListFilingObj } from 'app/shared/model/document-management/RackWithListFilingObj.Model';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-filing-paging',
  templateUrl: './filing-paging.component.html'
})
export class FilingPagingComponent implements OnInit {
  Cabinet: CabinetWithListRackObj = new CabinetWithListRackObj();
  Rack: RackWithListFilingObj = new RackWithListFilingObj();

  readonly CancelLink: string = NavigationConstant.DOC_MNGMNT_RACK_PAGING;
  readonly AddLink: string = NavigationConstant.DOC_MNGMNT_FILING_ADD_EDIT;
  readonly EditLink: string = NavigationConstant.BACK_TO_ADD_EDIT;
  constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute, private toastr: NGXToastrService) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['RackCode'] !== null && params['CabinetCode'] !== null) {
          this.Rack.RackCode = params['RackCode'],
          this.Cabinet.CabinetCode = params['CabinetCode']
        }
        else {
          this.router.navigateByUrl(NavigationConstant.DOC_MNGMNT_RACK_PAGING)
        }
      }
    );
  }

  ngOnInit() {
    this.http.post<RackWithListFilingObj>(environment.FoundationR3Url + "/DocManagement/GetRackAndListFilingByRackCode", this.Rack).subscribe(
      (response) => {
        this.Rack = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this.http.post<CabinetWithListRackObj>(environment.FoundationR3Url + "/DocManagement/GetCabinetAndListRackByCabinetCode", this.Cabinet).subscribe(
      (response) => {
        this.Cabinet = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editRack(index){
    let filingCode = this.Rack.ListFiling[index].FilingCode;
    this.router.navigate([NavigationConstant.DOC_MNGMNT_FILING_ADD_EDIT], { queryParams: { FilingCode: filingCode, Mode: 'Edit' } });
  }
}