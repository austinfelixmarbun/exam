
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeAreaObj } from 'app/shared/model/RefOfficeAreaObj.model';

@Component({
  selector: 'app-office-area-add-edit',
  templateUrl: './office-area-add-edit.component.html',
  providers: [NGXToastrService]
})
export class OfficeAreaAddEditComponent implements OnInit {
  refOfficeAreaObj : RefOfficeAreaObj;
  RefOfficeAreaId: string;
  pageType:any;
  result: any;
  title: string = "Area-Add"
  mode: string = "add";
  apiUrl: any;
  foundationUrl: string = environment.FoundationR3Url;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
      this.route.queryParams.subscribe(params => {
          this.RefOfficeAreaId = params["RefOfficeAreaId"];
          this.mode = params["mode"];
      })
  }

  OfficeAreaForm = this.fb.group({
      AreaCode: ['', Validators.required],
      AreaName:  ['', Validators.required],
      IsActive:  [false],
      RowVersion: [''] 
  })

  ngOnInit() {
      if (this.mode == "edit") {
          this.title = "Area-Edit";
          this.apiUrl = this.foundationUrl + AdInsConstant.GetRefOfficeAreaByRefOfficeAreaId;
          this.refOfficeAreaObj = new RefOfficeAreaObj();
          this.refOfficeAreaObj.RefOfficeAreaId = this.RefOfficeAreaId;
          this.OfficeAreaForm.controls.AreaCode.disable();
          this.http.post(this.apiUrl,  this.refOfficeAreaObj).subscribe(
              (response) => {
                  this.result = response;
                  this.OfficeAreaForm.patchValue({
                      AreaCode: this.result.AreaCode,
                      AreaName: this.result.AreaName,
                      IsActive: this.result.IsActive,
                      RowVersion: this.result.RowVersion,
                  });
              },
              (error) => {
                  console.log(error);
              }
          );
      }
  }

  SaveForm(){
      this.refOfficeAreaObj = new RefOfficeAreaObj();
      this.refOfficeAreaObj = this.OfficeAreaForm.value;
      if (this.mode == "edit") {
          this.refOfficeAreaObj.AreaCode = this.result.AreaCode;
          this.refOfficeAreaObj.RefOfficeAreaId = this.RefOfficeAreaId;
          
          this.http.post(AdInsConstant.EditRefOfficeArea, this.refOfficeAreaObj).subscribe(
              (response) => {
                  this.toastr.successMessage(response["message"]);
                  this.router.navigateByUrl('/Office/OfficeArea');
              },
              (error) => {
                  console.log(error);
              });
      }
      else {
          this.refOfficeAreaObj.RefOfficeAreaId = "0";
          this.http.post(AdInsConstant.AddRefOfficeArea, this.refOfficeAreaObj).subscribe(
              (response) => {
                  this.toastr.successMessage(response["message"]);
                  this.router.navigateByUrl('/Office/OfficeArea');
              },
              (error) => {
                  console.log(error);
              });
      }
  }
}
