import { Component, OnInit, ViewChild} from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { RefEmpObj } from "app/shared/model/RefEmpObj.Model";
import { NgForm } from "@angular/forms";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { formatDate } from "@angular/common";
import { RefBankObj } from "app/shared/model/RefBankObj.Model";
import { UcAddressComponent } from "app/shared/UserControl/ucAddress/ucAddress.component";
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';
import { InputLookupObj } from "app/shared/model/InputLookupObj.Model";
import { LookuprefbankComponent } from "@adins/lookuprefbank";

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  styleUrls: ["./employee-add.component.scss"],
  providers: [NGXToastrService]
})
export class EmployeeAddComponent implements OnInit {
  @ViewChild(LookuprefbankComponent) lookuprefbank;
  @ViewChild(UcAddressComponent) ucAddr;
  @ViewChild(UcContactInfoComponent) ucContact;
  inputLookupObj: any;
  pageType: string = "add";
  refEmpId: any;
  EmpBankAccId: any;
  empNo: any;
  empName: any;
  joinDt: any;
  addr: any;
  npwp: any;
  idNo: any;
  areaCode1: any;
  areaCode2: any;
  areaCode3: any;
  areaCode4: any;
  city: any;
  zipcode: any;
  phnArea1: any;
  phnArea2: any;
  phnArea3: any;
  phn1: any;
  phn2: any;
  phn3: any;
  phnExt1: any;
  phnExt2: any;
  phnExt3: any;
  faxArea: any;
  fax: any;
  mobilePhn1: any;
  mobilePhn2: any;
  email1: any;
  email2: any;
  imageLocation: any;
  isActive: boolean = true;
  isExt: boolean = false;
  bankBranch: any;
  bankBranchRegRptCode: any;
  bankAccName: any;
  bankAccNo: any;
  empObj: RefEmpObj;
  bankObj: RefBankObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  refBankUrl: any;
  empBankUrl: any;
  bankName: string;
  idSelect: any;
  jsonSelect: string;

  foundationUrl: string = environment.foundationUrl;
  settingUrl: string = environment.settingUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: NGXToastrService
  ) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefEmployeeById;
    this.addUrl = this.foundationUrl + AdInsConstant.AddRefEmpAndEmpBankAcc;
    this.editUrl = this.foundationUrl + AdInsConstant.EditRefEmpAndEmpBankAcc;
    this.refBankUrl = this.settingUrl + AdInsConstant.GetBankByBankCode;
    this.empBankUrl = this.foundationUrl + AdInsConstant.GetEmpBankAccByRefEmpId;

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refEmpId"] != null) {
        this.refEmpId = params["refEmpId"];
      }
      console.log(this.pageType);
      console.log(this.refEmpId);
    });
  }

  ngOnInit() {
    // this.inputLookupObj = new InputLookupObj();
    // this.inputLookupObj.urlJson = "./assets/lookup/lookupRefBank.json";
    // this.inputLookupObj.urlQryPaging = AdInsConstant.GetBankPaging;
    // this.inputLookupObj.urlEnviPaging = environment.settingUrl;

    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupRefBank.json";
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetBankPaging;
    this.inputLookupObj.urlEnviPaging = environment.settingUrl;
    this.inputLookupObj.pagingJson = "./assets/form-setting/lookupBankPaging.json";
    this.inputLookupObj.genericJson = "./assets/form-setting/bankGeneric.json";
    
    if (this.pageType == "edit") {
      this.empObj = new RefEmpObj();
      // this.empObj.refEmpId = this.refEmpId;
      this.httpClient.post(this.apiUrl, this.empObj).subscribe(
        response => {
          console.log("Success");
          this.resultData = response["returnObject"];
          console.log(this.resultData);
          this.ucAddr.setData(this.resultData);
          this.ucContact.setData(this.resultData);
          this.refEmpId = response["returnObject"]["refEmpId"];
          this.empNo = response["returnObject"]["empNo"];
          this.empName = response['returnObject']['empName']
          this.joinDt = formatDate(
            response["returnObject"]["joinDt"],
            "yyyy-MM-dd",
            "en-US"
          );
          this.npwp = response["returnObject"]["npwp"];
          this.idNo = response["returnObject"]["idNo"];
          this.imageLocation = response["returnObject"]["imageLocation"];
          if (this.resultData.isActive == "1") {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
          if (this.resultData.isExt == "1") {
            this.isExt = true;
          } else {
            this.isExt = false;
          }
          this.empObj = new RefEmpObj();
          // this.empObj.refEmpId = this.refEmpId;
          this.httpClient.post(this.empBankUrl, this.empObj).subscribe(
            response => {
              this.EmpBankAccId = response["returnObject"].empBankAccId;
              this.bankBranch = response["returnObject"].bankBranch;
              this.bankBranchRegRptCode = response["returnObject"].bankBranchRegRptCode;
              this.bankAccName = response["returnObject"].bankAccName;
              this.bankAccNo = response["returnObject"].bankAccNo;
              this.bankObj = new RefBankObj();
              this.bankObj.bankCode = response["returnObject"].bankCode;
              this.httpClient.post(this.refBankUrl, this.bankObj).subscribe(
                response => {
                  this.inputLookupObj.nameSelect = response["returnObject"].bankName;
                  this.inputLookupObj.jsonSelect = response["returnObject"];
                  this.inputLookupObj.idSelect = response["returnObject"].bankCode;
                  this.lookuprefbank.refBank = response["returnObject"].bankName;
                },
                error => {
                  console.log("Error");
                  console.log(error);
                }
              );
            },
            error => {
              console.log("Error");
              console.log(error);
            }
          );
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }

  toggleActive(e) {
    this.isActive = e.target.checked;
  }

  toggleExt(e) {
    this.isExt = e.target.checked;
  }

  SaveForm(ReqForm: NgForm, uclRefBank, ucAddress, ucContactInfo) {
    console.log(uclRefBank);
    if (this.pageType == "add") {
      this.empObj = new RefEmpObj();
      // this.empObj.empNo = ReqForm.value.empNo;
      // this.empObj.empName = ReqForm.value.empName;
      // this.empObj.joinDt = ReqForm.value.joinDt;
      // this.empObj.addr = ucAddress.addr;
      // this.empObj.npwp = ReqForm.value.npwp;
      // this.empObj.idNo = ReqForm.value.idNo;
      // this.empObj.areaCode4 = ucAddress.areaCode4;
      // this.empObj.areaCode3 = ucAddress.areaCode3;
      // this.empObj.areaCode2 = ucAddress.areaCode2;
      // this.empObj.areaCode1 = ucAddress.areaCode1;
      // this.empObj.city = ucAddress.city;
      // this.empObj.zipcode = ucAddress.zipcode;
      // this.empObj.phnArea1 = ucAddress.phnArea1;
      // this.empObj.phnArea2 = ucAddress.phnArea2;
      // this.empObj.phnArea3 = ucAddress.phnArea3;
      // this.empObj.phn1 = ucAddress.phn1;
      // this.empObj.phn2 = ucAddress.phn2;
      // this.empObj.phn3 = ucAddress.phn3;
      // this.empObj.phnExt1 = ucAddress.phnExt1;
      // this.empObj.phnExt2 = ucAddress.phnExt2;
      // this.empObj.phnExt3 = ucAddress.phnExt3;
      // this.empObj.faxArea = ucAddress.faxArea;
      // this.empObj.fax = ucAddress.fax;
      // this.empObj.mobilePhn1 = ucContactInfo.mobilePhn1;
      // this.empObj.mobilePhn2 = ucContactInfo.mobilePhn2;
      // this.empObj.email1 = ucContactInfo.email1;
      // this.empObj.email2 = ucContactInfo.email2;
      // this.empObj.EmpBankAccId = this.EmpBankAccId;
      // this.empObj.bankBranch = ReqForm.value.bankBranch;
      // this.empObj.bankBranchRegRptCode = ReqForm.value.bankBranchRegRptCode;
      // this.empObj.bankAccName = ReqForm.value.bankAccName;
      // this.empObj.bankAccNo = ReqForm.value.bankAccNo;
      // this.empObj.bankCode = this.inputLookupObj.idSelect;
      // if (this.isExt == false) {
      //   this.empObj.isExt = "0";
      // } else {
      //   this.empObj.isExt = "1";
      // }
      // if (this.isActive == false) {
      //   this.empObj.isActive = "0";
      // } else {
      //   this.empObj.isActive = "1";
      // }
      // this.empObj.isLeave = "0";

      console.log(JSON.stringify(this.empObj));
      console.log(this.empObj);
      this.httpClient.post(this.addUrl, this.empObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/employee', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/employee/add']));
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
    } else {
      this.empObj = new RefEmpObj();
      // this.empObj.refEmpId = this.refEmpId;
      // this.empObj.empNo = ReqForm.value.empNo;
      // this.empObj.empName = ReqForm.value.empName;
      // this.empObj.joinDt = ReqForm.value.joinDt;
      // this.empObj.addr = ucAddress.addr;
      // this.empObj.npwp = ReqForm.value.npwp;
      // this.empObj.idNo = ReqForm.value.idNo;
      // this.empObj.areaCode4 = ucAddress.areaCode4;
      // this.empObj.areaCode3 = ucAddress.areaCode3;
      // this.empObj.areaCode2 = ucAddress.areaCode2;
      // this.empObj.areaCode1 = ucAddress.areaCode1;
      // this.empObj.city = ucAddress.city;
      // this.empObj.zipcode = ucAddress.zipcode;
      // this.empObj.phnArea1 = ucAddress.phnArea1;
      // this.empObj.phnArea2 = ucAddress.phnArea2;
      // this.empObj.phnArea3 = ucAddress.phnArea3;
      // this.empObj.phn1 = ucAddress.phn1;
      // this.empObj.phn2 = ucAddress.phn2;
      // this.empObj.phn3 = ucAddress.phn3;
      // this.empObj.phnExt1 = ucAddress.phnExt1;
      // this.empObj.phnExt2 = ucAddress.phnExt2;
      // this.empObj.phnExt3 = ucAddress.phnExt3;
      // this.empObj.faxArea = ucAddress.faxArea;
      // this.empObj.fax = ucAddress.fax;
      // this.empObj.mobilePhn1 = ucContactInfo.mobilePhn1;
      // this.empObj.mobilePhn2 = ucContactInfo.mobilePhn2;
      // this.empObj.email1 = ucContactInfo.email1;
      // this.empObj.email2 = ucContactInfo.email2;
      // this.empObj.EmpBankAccId = this.EmpBankAccId;
      // this.empObj.bankBranch = ReqForm.value.bankBranch;
      // this.empObj.bankBranchRegRptCode = ReqForm.value.bankBranchRegRptCode;
      // this.empObj.bankAccName = ReqForm.value.bankAccName;
      // this.empObj.bankAccNo = ReqForm.value.bankAccNo;
      // this.empObj.bankCode = uclRefBank.lookupInput.idSelect;
      // if (this.isExt == false) {
      //   this.empObj.isExt = "0";
      // } else {
      //   this.empObj.isExt = "1";
      // }
      // if (this.isActive == false) {
      //   this.empObj.isActive = "0";
      // } else {
      //   this.empObj.isActive = "1";
      // }

      console.log(JSON.stringify(this.empObj));
      console.log(this.empObj);
      this.httpClient.post(this.editUrl, this.empObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/employee/paging"]);
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }
}
