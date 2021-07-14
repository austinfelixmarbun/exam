import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-family',
  templateUrl: './customer-family.component.html',
  styles: []
})
export class CustomerFamilyComponent implements OnInit {
  @Input() CustId: number;
  @Input() isMarried: boolean = false;
  @Output() outputTab: EventEmitter<any>;
  FamilyIdToExclude: Array<number>;
  Mode: string;
  CustPersonalFamilyId: number;
  FamilyData: Object;
  IsFromFamily: boolean;
  IsFromShareholder: boolean;
  ShareholderObject: Object;
  CustFamilyList: Array<any> = new Array();

  constructor(private http: HttpClient, private toastr: NGXToastrService) { 
    this.outputTab = new EventEmitter<any>();
    this.FamilyData = new Object();
    this.IsFromFamily = true;
    this.IsFromShareholder = false;
    this.ShareholderObject = new Object();
    this.Mode = "Paging";
  }

  async ngOnInit() {
    console.log("Cust Family Mode: " + this.Mode);
    await this.loadCustomerListData();
  }

  PagingToDetailHandler(event){
    this.Mode = event.Mode;
    this.CustPersonalFamilyId = event.CustPersonalFamilyId;
    this.FamilyIdToExclude = event.CustIdToExclude;
  }

  DetailToPagingHandler(event){
    if(event.StatusCode == 200){
      this.Mode = "Paging";
    }
    else if(event.StatusCode == 2001){
      this.Mode = "DuplicateChecking";
      this.FamilyData = event.FamilyData;
    }
  }

  async next() {
    if(this.isMarried){
      await this.loadCustomerListData();
      if(this.CustFamilyList.length == 0 || this.CustFamilyList.find(x => x.MrCustRelationship == 'SPOUSE') == null){
        this.toastr.warningMessage(ExceptionConstant.MUST_INPUT_SPOUSE_DATA)
        return;
      }
    }
    this.outputTab.emit({ stepMode: "next" });
  }

  async loadCustomerListData(){
    await this.http.post(URLConstant.GetMainCustAndListCustPersonalFamilyByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.CustFamilyList = response["CustPersonalFamilyList"];
      }
    );
  }
}
