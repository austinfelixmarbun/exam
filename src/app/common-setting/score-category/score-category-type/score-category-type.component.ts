import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefScoreCategoryTypeObj } from 'app/shared/model/ScoreCategory/RefScoreCategoryTypeObj.model';

@Component({
  selector: 'app-score-category-type',
  templateUrl: './score-category-type.component.html',
  providers: [NGXToastrService]
})
export class ScoreCategoryTypeComponent implements OnInit {
  refScoreCategoryTypeObj: RefScoreCategoryTypeObj = new RefScoreCategoryTypeObj();
  type: string = 'add';
  refScoreCategoryTypeId: number = 0;
  title: string = "Score Category Type - Add";

  RefScoreCategoryTypeForm = this.fb.group({
    RefScoreCategoryTypeCode: ['', [Validators.required, Validators.maxLength(50)]],
    Descr: ['', [Validators.required, Validators.maxLength(100)]],
    Notes: ['', [Validators.maxLength(4000)]],
    IsActive: [true],
    RowVersion: ['']
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['RefScoreCategoryTypeId'] != null) {
        this.refScoreCategoryTypeId = params['RefScoreCategoryTypeId'];
      }
    });
  }


  ngOnInit() {   
    if (this.type == 'edit') {
      this.title = "Score Category Type - Edit";
      this.refScoreCategoryTypeObj.RefScoreCategoryTypeId = this.refScoreCategoryTypeId;
      this.httpClient.post(AdInsConstant.GetRefScoreCategoryTypeById, this.refScoreCategoryTypeObj).subscribe(
        (response) => {
          this.RefScoreCategoryTypeForm.patchValue({
            RefScoreCategoryTypeCode: response["RefScoreCategoryTypeCode"],
            Descr: response["Descr"],
            Notes: response["Notes"],
            IsActive: response["IsActive"],
            RowVersion: response["RowVersion"]
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  Save() {
    this.refScoreCategoryTypeObj = new RefScoreCategoryTypeObj();
    this.refScoreCategoryTypeObj.RefScoreCategoryTypeId = this.refScoreCategoryTypeId;
    this.refScoreCategoryTypeObj.RefScoreCategoryTypeCode = this.RefScoreCategoryTypeForm.controls.RefScoreCategoryTypeCode.value;
    this.refScoreCategoryTypeObj.Descr = this.RefScoreCategoryTypeForm.controls.Descr.value;
    this.refScoreCategoryTypeObj.Notes = this.RefScoreCategoryTypeForm.controls.Notes.value;
    this.refScoreCategoryTypeObj.IsActive = this.RefScoreCategoryTypeForm.controls.IsActive.value;
    this.refScoreCategoryTypeObj.RowVersion = this.RefScoreCategoryTypeForm.controls.RowVersion.value;
    //MODE-ADD
    if (this.type == 'add') {
      this.httpClient.post(AdInsConstant.AddRefScoreCategoryType, this.refScoreCategoryTypeObj).subscribe(
        //SAVE
        (response) => {
          this.service.successMessage(response["Message"]);
          this.router.navigate(['/CommonSetting/ScoreCategory/Paging']);
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      //SAVE
      this.httpClient.post(AdInsConstant.EditRefScoreCategoryType, this.refScoreCategoryTypeObj).subscribe(
        (response) => {
          this.service.successMessage(response["Message"]);
          this.router.navigate(['/CommonSetting/ScoreCategory/Paging']);
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
  }

}
