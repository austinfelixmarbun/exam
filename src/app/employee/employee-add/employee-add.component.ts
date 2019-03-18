import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { NgForm } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { formatDate } from '@angular/common';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { EmpBankAccObj } from 'app/shared/model/EmpBankAccObj.Model';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
  providers: [NGXToastrService]
})
export class EmployeeAddComponent implements OnInit {

  pageType: string = "add";
  refEmpId: any;
  empNo: any;
  empName: any;
  joinDt: any;
  addr: any;
  npwp: any;
  idNo: any;
  rt: any;
  rw: any;
  kelurahan: any;
  kecamatan: any;
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
  isActive: boolean = false;
  isExt: boolean = false;
  bankBranch: any;
  bankBranchBiCode: any;
  bankAccName: any;
  bankAccNo: any;
  empObj: RefEmpObj;
  bankObj: RefBankObj;
  empBankAccObj: EmpBankAccObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  refBankUrl: any;
  empBankUrl: any;
  addEmpBankUrl: any;
  bankName: string;
  idSelect;
  jsonSelect: string;

  foundationUrl: string = environment.foundationUrl;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefEmployeeById;
    this.addUrl = this.foundationUrl + AdInsConstant.AddRefEmp;
    this.editUrl = this.foundationUrl + AdInsConstant.EditRefEmp;
    this.refBankUrl = this.foundationUrl + AdInsConstant.GetBank;
    this.empBankUrl = this.foundationUrl + AdInsConstant.GetEmpBankAccByRefEmpId;
    this.addEmpBankUrl = this.foundationUrl + AdInsConstant.AddEmpBankAcc;
    
    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.pageType = params['param'];
      }
      if (params['refEmpId'] != null) {
        this.refEmpId = params['refEmpId'];
      }
      console.log(this.pageType)
      console.log(this.refEmpId)
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.empObj = new RefEmpObj()
      this.empObj.refEmpId = this.refEmpId
      this.httpClient.post(this.apiUrl, this.empObj).subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response['returnObject'];
          console.log(this.resultData);
          this.refEmpId = response['returnObject']['refEmpId']
          this.empNo = response['returnObject']['empNo']
          this.empName = response['returnObject']['empName']
          this.joinDt = formatDate(response['returnObject']['joinDt'], 'yyyy-MM-dd', 'en-US');
          this.addr = response['returnObject']['addr']
          this.npwp = response['returnObject']['npwp']
          this.idNo = response['returnObject']['idNo']
          this.rt = response['returnObject']['rt']
          this.rw = response['returnObject']['rw']
          this.kelurahan = response['returnObject']['kelurahan']
          this.kecamatan = response['returnObject']['kecamatan']
          this.city = response['returnObject']['city']
          this.zipcode = response['returnObject']['zipcode']
          this.phnArea1 = response['returnObject']['phnArea1']
          this.phnArea2 = response['returnObject']['phnArea2']
          this.phnArea3 = response['returnObject']['phnArea3']
          this.phn1 = response['returnObject']['phn1']
          this.phn2 = response['returnObject']['phn2']
          this.phn3 = response['returnObject']['phn3']
          this.phnExt1 = response['returnObject']['phnExt1']
          this.phnExt2 = response['returnObject']['phnExt2']
          this.phnExt3 = response['returnObject']['phnExt3']
          this.faxArea = response['returnObject']['faxArea']
          this.fax = response['returnObject']['fax']
          this.mobilePhn1 = response['returnObject']['mobilePhn1']
          this.mobilePhn2 = response['returnObject']['mobilePhn2']
          this.email1 = response['returnObject']['email1']
          this.email2 = response['returnObject']['email2']
          this.imageLocation = response['returnObject']['imageLocation']
          if (this.resultData.isActive == "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }
          if (this.resultData.isExt == "1") {
            this.isExt = true;
          }
          else {
            this.isExt = false;
          }
          this.empObj = new RefEmpObj()
          this.empObj.refEmpId = this.refEmpId
          this.httpClient.post(this.empBankUrl, this.empObj).subscribe(
            (response) => {
              this.bankBranch = response["returnObject"].bankBranch;
              this.bankBranchBiCode = response["returnObject"].bankBranchBiCode;
              this.bankAccName = response["returnObject"].bankAccName;
              this.bankAccNo = response["returnObject"].bankAccNo;
              this.bankObj = new RefBankObj()
              this.bankObj.refBankId = response["returnObject"].refBankId;
              this.httpClient.post(this.refBankUrl, this.bankObj).subscribe(
                (response) => {
                  this.bankName = response["returnObject"].bankName;
                  this.jsonSelect = response["returnObject"];
                  this.idSelect = response["returnObject"].refBankId;
                },
                (error) => {
                  console.log("Error");
                  console.log(error);
                })
            },
            (error) => {
              console.log("Error");
              console.log(error);
            })
        },
        (error) => {
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

  SaveForm(ReqForm: NgForm, uclRefBank) {
    console.log(uclRefBank);
    if (this.pageType == 'add') {
      this.empObj = new RefEmpObj();
      this.empObj.empNo = ReqForm.value.empNo;
      this.empObj.empName = ReqForm.value.empName;
      this.empObj.joinDt = ReqForm.value.joinDt;
      this.empObj.addr = ReqForm.value.addr;
      this.empObj.npwp = ReqForm.value.npwp;
      this.empObj.idNo = ReqForm.value.idNo;
      this.empObj.rt = ReqForm.value.rt;
      this.empObj.rw = ReqForm.value.rw;
      this.empObj.kelurahan = ReqForm.value.kelurahan;
      this.empObj.kecamatan = ReqForm.value.kecamatan;
      this.empObj.city = ReqForm.value.city;
      this.empObj.zipcode = ReqForm.value.zipcode;
      this.empObj.phnArea1 = ReqForm.value.phnArea1;
      this.empObj.phnArea2 = ReqForm.value.phnArea2;
      this.empObj.phnArea3 = ReqForm.value.phnArea3;
      this.empObj.phn1 = ReqForm.value.phn1;
      this.empObj.phn2 = ReqForm.value.phn2;
      this.empObj.phn3 = ReqForm.value.phn3;
      this.empObj.phnExt1 = ReqForm.value.phnExt1;
      this.empObj.phnExt2 = ReqForm.value.phnExt2;
      this.empObj.phnExt3 = ReqForm.value.phnExt3;
      this.empObj.faxArea = ReqForm.value.faxArea;
      this.empObj.fax = ReqForm.value.fax;
      this.empObj.mobilePhn1 = ReqForm.value.mobilePhn1;
      this.empObj.mobilePhn2 = ReqForm.value.mobilePhn2;
      this.empObj.email1 = ReqForm.value.email1;
      this.empObj.email2 = ReqForm.value.email2;
      if (this.isExt === false) {
        this.empObj.isExt = "0";
      }
      else {
        this.empObj.isExt = "1";
      }
      if (this.isActive === false) {
        this.empObj.isActive = "0";
      }
      else {
        this.empObj.isActive = "1";
      }

      console.log(JSON.stringify(this.empObj))
      console.log(this.empObj);
      this.httpClient.post(this.addUrl, this.empObj).subscribe(
        (response) => {
          console.log("Success");
          console.log(response);
          this.empBankAccObj = new EmpBankAccObj();
          this.empBankAccObj.refEmpId = response["returnObject"].refEmpId;
          this.empBankAccObj.bankBranch = ReqForm.value.bankBranch;
          this.empBankAccObj.bankBranchBiCode = ReqForm.value.bankBranchBiCode;
          this.empBankAccObj.bankAccName = ReqForm.value.bankAccName;
          this.empBankAccObj.bankAccNo = ReqForm.value.bankAccNo;
          this.empBankAccObj.bankBranch = ReqForm.value.bankBranch;
          this.empBankAccObj.refBankId = uclRefBank.idSelect;
          this.httpClient.post(this.addEmpBankUrl, this.empBankAccObj).subscribe(
            (response) => {
              this.toastr.successMessage(response['message']);
              this.router.navigate(["/employee"]);
            },
            (error) => {
              console.log("Error");
              console.log(error);
            });
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    } else {
      var formInput = this.resultData;
      formInput.empNo = ReqForm.value.empNo;
      formInput.empName = ReqForm.value.empName;
      formInput.joinDt = ReqForm.value.joinDt;
      formInput.addr = ReqForm.value.addr;
      formInput.npwp = ReqForm.value.npwp;
      formInput.idNo = ReqForm.value.idNo;
      formInput.rt = ReqForm.value.rt;
      formInput.rw = ReqForm.value.rw;
      formInput.kelurahan = ReqForm.value.kelurahan;
      formInput.kecamatan = ReqForm.value.kecamatan;
      formInput.city = ReqForm.value.city;
      formInput.zipcode = ReqForm.value.zipcode;
      formInput.phnArea1 = ReqForm.value.phnArea1;
      formInput.phnArea2 = ReqForm.value.phnArea2;
      formInput.phnArea3 = ReqForm.value.phnArea3;
      formInput.phn1 = ReqForm.value.phn1;
      formInput.phn2 = ReqForm.value.phn2;
      formInput.phn3 = ReqForm.value.phn3;
      formInput.phnExt1 = ReqForm.value.phnExt1;
      formInput.phnExt2 = ReqForm.value.phnExt2;
      formInput.phnExt3 = ReqForm.value.phnExt3;
      formInput.faxArea = ReqForm.value.faxArea;
      formInput.fax = ReqForm.value.fax;
      formInput.mobilePhn1 = ReqForm.value.mobilePhn1;
      formInput.mobilePhn2 = ReqForm.value.mobilePhn2;
      formInput.email1 = ReqForm.value.email1;
      formInput.email2 = ReqForm.value.email2;
      if (this.isExt === false) {
        formInput.isExt = "0";
      }
      else {
        formInput.isExt = "1";
      }
      if (this.isActive === false) {
        formInput.isActive = "0";
      }
      else {
        formInput.isActive = "1";
      }

      console.log(JSON.stringify(formInput))
      console.log(formInput);
      this.httpClient.post(this.editUrl, formInput).subscribe(
        (response) => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/employee"]);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }

}
