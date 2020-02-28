import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitleObj.Model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-ref-job-title-add',
  templateUrl: './ref-job-title-add.component.html',
  styleUrls: ['./ref-job-title-add.component.scss'],
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
    this.apiUrl = AdInsConstant.GetRefJobTitleById;
    this.addUrl = AdInsConstant.AddRefJobTitle;
    this.editUrl = AdInsConstant.EditRefJobTitle;


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
          console.log("Response: ");
          console.log(response);
          this.refJobTitleId = this.resultData.RefJobTitleId;
          this.RefJobTitleForm.patchValue({
            JobTitleCode: this.resultData.JobTitleCode,
            JobTitleName: this.resultData.JobTitleName,
            Descr: this.resultData.Descr
          });

        },
        error => {
          console.log(error);
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
          this.router.navigate(["/organization/refjobtitle"]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.rjtObj.RefJobTitleId = this.refJobTitleId;
      this.rjtObj.RowVersion = this.resultData.RowVersion;
      this.http.post(this.editUrl, this.rjtObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/organization/refjobtitle"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
