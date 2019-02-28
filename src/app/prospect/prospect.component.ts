import { value } from './../shared/data/dropdowns';
import { formatDate } from '@angular/common';
import { ProspectObj } from './../shared/model/ProspectObj.Model';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss'],
  providers: [NGXToastrService] // add NgbPaginationConfig to the component providers
})
export class ProspectComponent implements OnInit {

  prospectModel = 'P';
  newProspectModel = 'P';
  birthDate: string;
  Gender = 'M';
  CustModel = 'Professional';
  Income = 'Less than 5,000,000.00';
  resultData: any;
  apiUrl: any;
  provUrl: any;
  cityUrl: any;
  getProsUrl: any;
  submitProsUrl: any;
  foundationUrl: string = environment.foundationUrl;
  localHostUrl: string = environment.localHostUrl;
  r2AppServerUrl: string = environment.r2AppServerUrl;
  allCity: any;
  allProv: any;
  test: any;
  type: string = "add";
  prospectNo: string = "";
  newProspectNo: any;
  CustName: any;
  IdNo: any;
  KtpNo: any;
  BirthPlace: any;
  BirthDt: any;
  Kelurahan: any;
  Kecamatan: any;
  Addr: any;
  Zipcode: any;
  Rt: any;
  Rw: any;
  MblPhoneNo: any;
  PhoneNo: any;
  Npwp: any;
  MotherMaidenName: any;
  EMail1: any;
  Province: any;
  myForm: NgForm;
  prosObj: ProspectObj;
  IdExpiredDt: any;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private spinner: NgxSpinnerService, 
              private adInsService: AdInsServiceService, private httpClient:HttpClient,  private toastr: NGXToastrService) {
    this.provUrl = this.r2AppServerUrl + AdInsConstant.GetProvince;
    this.cityUrl = this.r2AppServerUrl + AdInsConstant.GetCityByProvince;
    this.getProsUrl = this.localHostUrl + AdInsConstant.getProspectByProspectNo;
    this.submitProsUrl = this.localHostUrl + AdInsConstant.submitNCProspect;

    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.type = params['param'];
      }
      if (params['prospectNo'] != null) {
        this.prospectNo = params['prospectNo'];
      }
      console.log(this.type)
      console.log(this.prospectNo)
  });
  }

  ngOnInit() {
    this.spinner.show();
    this.adInsService.postData(this.provUrl, null).subscribe(
      (response) => {
        console.log("Success");
        this.allProv = response.data;
        console.log(this.allProv);
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );

    if (this.prospectNo != "") {
      var obj = {"ProspectNo":this.prospectNo};
      this.httpClient.post(this.getProsUrl,obj).subscribe(
        (response) => {
          console.log("Success");
          console.log(response);
          this.prospectModel = response['CustType']
          this.CustName = response['CustName']
          this.IdNo = response['IdNo']
          this.BirthPlace = response['BirthPlace']
          this.Kelurahan = response['Kelurahan']
          this.Kecamatan = response['Kecamatan']
          this.Addr = response['Addr']
          this.Rt = response['Rt']
          this.Rw = response['Rw']
          this.Zipcode = response['Zipcode']
          this.MotherMaidenName = response['MotherMaidenName']
          this.MblPhoneNo = response['MobilePhnNo1']
          this.PhoneNo = response['Phn1']
          this.BirthDt = formatDate(response['BirthDt'], 'yyyy-MM-dd', 'en-US');
          this.IdExpiredDt = formatDate(response['BirthDt'], 'yyyy-MM-dd', 'en-US');
          this.EMail1 = response['EMail1']
          this.Npwp = response['Npwp']
          this.IdExpiredDt = response['IdExpiredDt']
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
    console.log(this.Province)
    this.spinner.hide();
  }

  Back(): void {
    this.location.back();
  }

  onChange(cityValue) {
    this.spinner.show();
    console.log(cityValue);
    var tes = {"id":cityValue};
    this.httpClient.post(this.cityUrl,tes).subscribe(
      (response) => {
        console.log("Success");
        this.allCity = response['data'];
        console.log(response);
        console.log(this.allCity);
        this.spinner.hide();
      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  selectType(type, prsReqFoem: NgForm){
    this.prospectModel = type;
    this.newProspectModel = type;
    prsReqFoem.reset()
  }

  Save(prsReqFoem: NgForm): void {
    this.prosObj = new ProspectObj();
    this.prosObj = prsReqFoem.value;
    this.test = prsReqFoem.value.Rt
    console.log(this.test)
    console.log('print: ', this.prosObj);
  }

  SavePros(prsReqFoem: NgForm) {
    this.spinner.show();
    console.log(this.MotherMaidenName);
    this.prosObj = new ProspectObj();
    this.prosObj = prsReqFoem.value;
    this.prosObj.RefOfficeId = 9;
    this.prosObj.CustType = this.prospectModel;
    this.prosObj.AssetPriceAmt = 0;
    this.prosObj.DownPaymentAmt = 0;
    this.prosObj.NtfAmt = 0;
    this.prosObj.Tenor = 0;
    this.prosObj.InsAmt = 0;
    this.prosObj.FlatRatePrcnt = 0;
    this.prosObj.AppStep = 'NEW';
    this.prosObj.IsActive = '1';
    this.prosObj.NoOfDependents = 0;
    this.prosObj.OfficeCode = '0037';
    this.prosObj.SupplBranchEmpCode = '000SBEMP20160600001';
    this.prosObj.assetCode = 'D3K';
    this.prosObj.assetHierarchyL1Code = 'KOMATSU';
    this.prosObj.assetHierarchyL2Code = 'SMALL DOZER';
    this.prosObj.assetTypeCode = 'ADINS HE';
    this.prosObj.LeadStat = 'NEW';
    this.prosObj.ProspectNo = this.prospectNo;
    this.prosObj.MrIdType = 'KTP';
    this.prosObj.MrGender = 'F';
    this.prosObj.PhnArea1 = '021';
    this.prosObj.PhnArea2 = '021';
    this.prosObj.FaxArea = '082';
    this.prosObj.Fax = '888';
    this.prosObj.Phn2 = '0821981298';

    this.httpClient.post(this.submitProsUrl, this.prosObj).subscribe(
      (response) => {
        console.log("Success");
        console.log(response);
        this.newProspectNo = response;
        this.toastr.successMessage(this.newProspectNo);
        this.spinner.hide();
        this.router.navigateByUrl('/office', { skipLocationChange: true }).then(() =>
          this.router.navigate(["prospect"]));
      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.spinner.hide();
      }
    );
  }
}
