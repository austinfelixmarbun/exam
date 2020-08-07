import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefProfessionObj } from 'app/shared/model/RefProfessionObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-profession-add-edit',
  templateUrl: './profession-add-edit.component.html',
  providers: [NGXToastrService]
})
export class ProfessionAddEditComponent implements OnInit {

  pageType: string = "add";
  refProfessionId: any;
  refProfessionObj: RefProfessionObj;
  resultData: any;
  getUrl: any;
  addUrl: any;
  editUrl: any;
  getValueCustModel: any;
  allRefProfessionMethod: any;
  refCustModelCode: any;
  RefProfessionForm = this.fb.group({
    ProfessionCode: ['', [Validators.required, Validators.maxLength(50)]],
    ProfessionName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCustModelCode: ['', [Validators.required, Validators.maxLength(50)]],
    RegRptCode: ['', Validators.maxLength(50)]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.getUrl = URLConstant.GetRefProfessionById;
    this.addUrl = URLConstant.AddRefProfession;
    this.editUrl = URLConstant.EditRefProfession;
    this.getValueCustModel = URLConstant.GetValueCustModel;


    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
      if (params["refProfessionId"] != null) {
        this.refProfessionId = params["refProfessionId"];
      }
    });
  }

  ngOnInit() {
    this.http.post(this.getValueCustModel, null).subscribe(
      (response) => {
        this.allRefProfessionMethod = response[CommonConstant.ReturnObj];
        if (this.allRefProfessionMethod.length > 0) {
          this.RefProfessionForm.patchValue({ MrCustModelCode: response[CommonConstant.ReturnObj][0]['Key'] });
        }
      });

    if (this.pageType == "edit") {
      this.RefProfessionForm.controls["ProfessionCode"].disable();
      this.refProfessionObj = new RefProfessionObj();
      this.refProfessionObj.RefProfessionId = this.refProfessionId;
      this.http.post(this.getUrl, this.refProfessionObj).subscribe(
        response => {
          this.resultData = response;
          this.RefProfessionForm.patchValue({
            ProfessionCode: this.resultData.ProfessionCode,
            ProfessionName: this.resultData.ProfessionName,
            MrCustModelCode: this.resultData.MrCustModelCode,
            RegRptCode: this.resultData.RegRptCode
          });

        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refProfessionObj = new RefProfessionObj();
      this.refProfessionObj.ProfessionCode = this.RefProfessionForm.controls["ProfessionCode"].value
      this.refProfessionObj.ProfessionName = this.RefProfessionForm.controls["ProfessionName"].value;
      this.refProfessionObj.MrCustModelCode = this.RefProfessionForm.controls["MrCustModelCode"].value;
      this.refProfessionObj.RegRptCode = this.RefProfessionForm.controls["RegRptCode"].value;
      this.http.post(this.addUrl, this.refProfessionObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/CommonSetting/Profession/Paging"]);

        }
      );
    } else {
      this.refProfessionObj = this.resultData;
      this.refProfessionObj.RefProfessionId = this.refProfessionId;
      this.refProfessionObj.ProfessionName = this.RefProfessionForm.controls["ProfessionName"].value;
      this.refProfessionObj.MrCustModelCode = this.RefProfessionForm.controls["MrCustModelCode"].value;
      this.refProfessionObj.RegRptCode = this.RefProfessionForm.controls["RegRptCode"].value;
      this.http.post(this.editUrl, this.refProfessionObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/CommonSetting/Profession/Paging"]);
        }
      );
    }
  }
}
