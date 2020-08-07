import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitleObj.Model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-ref-job-title-add',
  templateUrl: './ref-job-title-add.component.html',
  providers: [NGXToastrService]
})
export class RefJobTitleAddComponent implements OnInit {

  pageType: string = "add";
  refJobTitleId: any;
  rjtObj: RefJobTitleObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;

  RefJobTitleForm = this.fb.group({
    JobTitleCode: ['', [Validators.required, Validators.maxLength(50)]],
    JobTitleName: ['', [Validators.required, Validators.maxLength(100)]],
    Descr: ['', Validators.maxLength(4000)]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.apiUrl = URLConstant.GetRefJobTitleById;
    this.addUrl = URLConstant.AddRefJobTitle;
    this.editUrl = URLConstant.EditRefJobTitle;

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refJobTitleId"] != null) {
        this.refJobTitleId = params["refJobTitleId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.rjtObj = new RefJobTitleObj();
      this.rjtObj.RefJobTitleId = this.refJobTitleId;
      this.http.post(this.apiUrl, this.rjtObj).subscribe(
        response => {
          this.resultData = response;
          this.refJobTitleId = this.resultData.RefJobTitleId;
          this.RefJobTitleForm.patchValue({
            JobTitleCode: this.resultData.JobTitleCode,
            JobTitleName: this.resultData.JobTitleName,
            Descr: this.resultData.Descr
          });

        }
      );
    }
  }

  SaveForm() {
    this.rjtObj = new RefJobTitleObj();
    this.rjtObj = this.RefJobTitleForm.value;
    if (this.pageType == "add") {
      this.rjtObj.RowVersion = "";
      this.http.post(this.addUrl, this.rjtObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Organization/JobTitle"]);
        }
      );
    } else {
      this.rjtObj.RefJobTitleId = this.refJobTitleId;
      this.rjtObj.RowVersion = this.resultData.RowVersion;
      this.http.post(this.editUrl, this.rjtObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Organization/JobTitle"]);
        }
      );
    }
  }
}
