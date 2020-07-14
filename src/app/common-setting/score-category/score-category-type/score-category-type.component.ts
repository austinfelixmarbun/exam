import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ScoreCategorySchmHObj } from 'app/shared/model/ScoreCategory/ScoreCategorySchmHObj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';

@Component({
  selector: 'app-score-category-type',
  templateUrl: './score-category-type.component.html',
  providers: [NGXToastrService]
})
export class ScoreCategoryTypeComponent implements OnInit {
  scoreCategorySchmHObj: ScoreCategorySchmHObj = new ScoreCategorySchmHObj();
  type: string = 'add';
  scoreCategorySchmHId: number = 0;
  title: string = "Score Category Type - Add";
  ScoreTrxTypeObj: Array<KeyValueObj> = new Array<KeyValueObj>();

  ScoreCategorySchmHForm = this.fb.group({
    ScoreCategorySchmHCode: ['', [Validators.required, Validators.maxLength(50)]],
    ScoreCategorySchmHName: ['', [Validators.required, Validators.maxLength(100)]],
    MrScoreTrxTypeCode: ['', [Validators.required, Validators.maxLength(50)]],
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
      if (params['ScoreCategorySchmHId'] != null) {
        this.scoreCategorySchmHId = params['ScoreCategorySchmHId'];
      }
    });
  }


  ngOnInit() {   
    var refMasterObj = new RefMasterObj();
    refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeScoreTrxType;
    this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMasterObj).subscribe(
      (response) => {
        this.ScoreTrxTypeObj = response[CommonConstant.ReturnObj];
      }
    );

    if (this.type == 'edit') {
      this.title = "Score Category Type - Edit";
      this.scoreCategorySchmHObj.ScoreCategorySchmHId = this.scoreCategorySchmHId;
      this.httpClient.post(URLConstant.GetScoreCategorySchmHById, this.scoreCategorySchmHObj).subscribe(
        (response) => {
          this.ScoreCategorySchmHForm.patchValue({
            ScoreCategorySchmHCode: response["ScoreCategorySchmHCode"],
            ScoreCategorySchmHName: response["ScoreCategorySchmHName"],
            MrScoreTrxTypeCode: response["MrScoreTrxTypeCode"],
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
    this.scoreCategorySchmHObj = new ScoreCategorySchmHObj();
    this.scoreCategorySchmHObj.ScoreCategorySchmHId = this.scoreCategorySchmHId;
    this.scoreCategorySchmHObj.ScoreCategorySchmHCode = this.ScoreCategorySchmHForm.controls.ScoreCategorySchmHCode.value;
    this.scoreCategorySchmHObj.ScoreCategorySchmHName = this.ScoreCategorySchmHForm.controls.ScoreCategorySchmHName.value;
    this.scoreCategorySchmHObj.MrScoreTrxTypeCode = this.ScoreCategorySchmHForm.controls.MrScoreTrxTypeCode.value;
    this.scoreCategorySchmHObj.Notes = this.ScoreCategorySchmHForm.controls.Notes.value;
    this.scoreCategorySchmHObj.IsActive = this.ScoreCategorySchmHForm.controls.IsActive.value;
    this.scoreCategorySchmHObj.RowVersion = this.ScoreCategorySchmHForm.controls.RowVersion.value;
    //MODE-ADD
    if (this.type == 'add') {
      this.httpClient.post(URLConstant.AddScoreCategorySchmH, this.scoreCategorySchmHObj).subscribe(
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
      this.httpClient.post(URLConstant.EditScoreCategorySchmH, this.scoreCategorySchmHObj).subscribe(
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
