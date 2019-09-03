import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { RefRoleObj } from "app/shared/model/RefRoleObj.Model";
import { Location, DecimalPipe } from "@angular/common";
import { NgForm, FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "environments/environment";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from "app/shared/model/InputSearchObj.Model";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { RefOfficeObj } from "app/shared/model/RefOfficeObj.model";

@Component({
  selector: 'app-office-group-member',
  templateUrl: './office-group-member.component.html',
  styleUrls: ['./office-group-member.component.scss'],
  providers: [NGXToastrService, DecimalPipe]
})
export class OfficeGroupMemberComponent implements OnInit {

  inputPagingObj: any;
  urlJson: string = "./assets/search/searchSurveyorBranchOfficeMbrPaging.json";

  centerGroupTypeName:any;
  vendorId : any;
  mrAddrType: any = "Tax";
  vendorCode: any;
  vendorName: any;
  mrVendorType: any = "Company";
  mrVendorCategory: any;
  mobilePhn1: any;
  mobilePhn2: any;
  email: any;
  vendorRating: any;
  mrIdType: any;
  idNo: any;
  isActive: any;
  taxIdNo: any;
  partnershipDt: any;
  establishmentDt: any;
  taxpayerName: any;
  taxPayerNo: any;
  mrTaxCalcMethod: any;
  isVat: any;
  licenseNo: any;
  registrationNo: any;
  vendorRatingAlias: any;
  reservedField1: any;
  reservedField2: any;
  reservedField3: any;
  reservedField4: any;
  reservedField5: any;
  reservedField6: any;
  reservedField7: any;
  reservedField8: any;
  reservedField9: any;
  reservedField10: any;
  addr: any;
  zipcode: any;
  areaCode1: any;
  areaCode2: any;
  areaCode3: any;
  areaCode4: any;
  pageType: any;
  refOfficeCode:any;
  respondModel:any;
  

  constructor(private httpClient: HttpClient, 
    private spinner: NgxSpinnerService, 
    private service: NGXToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      
      if (params["officeCode"] != null) {
        this.refOfficeCode = params["officeCode"];
      }

      this.httpClient.post(environment.foundationUrl+AdInsConstant.GetCenterGrpByCenterGrpTypeCode, {"RefOfficeCode":this.refOfficeCode}).subscribe(
        (response) => {
          console.log(response);
          this.respondModel = response["returnObject"];
        },
        (error) => {
          console.log(error);
        }
      );
      
      console.log(this.pageType);
      console.log(this.vendorId);
    });

    this.inputPagingObj = new InputSearchObj();
    this.inputPagingObj._url = "./assets/search/searchCenterGrpMbr.json";
    this.inputPagingObj.enviromentUrl = environment.foundationUrl;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/search/searchCenterGrpMbr.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteCenterGroupOfficeMember;
  }		 

}
