import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefScoreCategoryTypeObj } from 'app/shared/model/ScoreCategory/RefScoreCategoryTypeObj.model';
import { RefScoreCategoryObj } from 'app/shared/model/ScoreCategory/RefScoreCategoryObj.model';
import { ListRefScoreCategoryObj } from 'app/shared/model/ScoreCategory/ListRefScoreCategoryObj.model';

@Component({
  selector: 'app-score-category-scoring',
  templateUrl: './score-category-scoring.component.html',
  providers: [NGXToastrService]
})
export class ScoreCategoryScoringComponent implements OnInit {
  refScoreCategoryTypeObj: RefScoreCategoryTypeObj = new RefScoreCategoryTypeObj();
  refScoreCategoryTypeId: number = 0;
  listRefScoreCategoryObj: ListRefScoreCategoryObj = new ListRefScoreCategoryObj();

  RefScoreCategoryForm = this.fb.group({
    RefScoreCategoryTypeObjs: new FormArray([])
  });

  ListHexColorValue: Array<string> = new Array<string>();
  maxBottomValue: Array<number> = new Array<number>();
  minTopValue: Array<number> = new Array<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['RefScoreCategoryTypeId'] != null) {
        this.refScoreCategoryTypeId = params['RefScoreCategoryTypeId'];
      }
    });
  }


  ngOnInit() {   
    this.refScoreCategoryTypeObj.RefScoreCategoryTypeId = this.refScoreCategoryTypeId;
    this.httpClient.post(AdInsConstant.GetRefScoreCategoryTypeWithDetailById, this.refScoreCategoryTypeObj).subscribe(
      (response) => {
        this.refScoreCategoryTypeObj.RefScoreCategoryTypeCode = response["RefScoreCategoryTypeCode"];
        this.refScoreCategoryTypeObj.Descr = response["Descr"];
        this.refScoreCategoryTypeObj.Notes = response["Notes"];

        if(response["RefScoreCategoryObjs"] != null){
          var listRefScoreCategory = response["RefScoreCategoryObjs"];
          var scoreForm = this.RefScoreCategoryForm.controls.RefScoreCategoryTypeObjs as FormArray;

          for(let i = 0; i < listRefScoreCategory.length; i++){
            this.maxBottomValue.push(listRefScoreCategory[i].TopValue);
            this.minTopValue.push(listRefScoreCategory[i].BottomValue);
            scoreForm.push(this.addGroup(listRefScoreCategory[i], this.maxBottomValue[this.maxBottomValue.length -1], this.minTopValue[this.minTopValue.length - 1]));
            this.ListHexColorValue.push(listRefScoreCategory[i].HexColorValue);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addScore(){
    var scoreForm = this.RefScoreCategoryForm.controls.RefScoreCategoryTypeObjs as FormArray;
    this.maxBottomValue.push(0);
    this.minTopValue.push(0);
    scoreForm.push(this.addGroup(undefined, this.maxBottomValue[this.maxBottomValue.length -1], this.minTopValue[this.minTopValue.length - 1]));
    this.ListHexColorValue.push("#fff");
  }

  deleteScore(i){
    if (confirm('Are you sure to delete this record?')) {
      var custSocmedObjs = this.RefScoreCategoryForm.controls.RefScoreCategoryTypeObjs as FormArray;
      custSocmedObjs.removeAt(i);
      this.ListHexColorValue.splice(i, 1);
    }
  }

  addGroup(refScoreCategoryObj, maxBottomValue, minTopValue){
    if(refScoreCategoryObj == undefined){
      return this.fb.group({
        BottomValue: [0, [Validators.required, Validators.max(maxBottomValue)]],
        TopValue: [0, [Validators.required, Validators.min(minTopValue)]],
        HexColorValue: ['', [Validators.required, Validators.maxLength(50)]]
      })
    }else{
      return this.fb.group({
        BottomValue: [refScoreCategoryObj.BottomValue, [Validators.required, Validators.max(maxBottomValue)]],
        TopValue: [refScoreCategoryObj.TopValue, [Validators.required, Validators.min(minTopValue)]],
        HexColorValue: [refScoreCategoryObj.HexColorValue, [Validators.required, Validators.maxLength(50)]]
      })
    } 
  }

  HexColorValueChanged(event, i){
    this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"]["controls"][i].patchValue({
      HexColorValue: event
    });
  }

  BottomValueChanged(event, i){
    this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"]["controls"][i]["controls"].TopValue.setValidators([Validators.required, Validators.min(event.target.value)]);
    this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"]["controls"][i]["controls"].TopValue.updateValueAndValidity();
  }

  TopValueChanged(event, i){
    this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"]["controls"][i]["controls"].BottomValue.setValidators([Validators.required, Validators.max(event.target.value)]);
    this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"]["controls"][i]["controls"].BottomValue.updateValueAndValidity();
  }

  Save() {
    if(this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"].value.length == 0){
      this.toastr.warningMessage("Please input at least one score.");
      return;
    }
    this.listRefScoreCategoryObj = new ListRefScoreCategoryObj();    
    this.listRefScoreCategoryObj.RefScoreCategoryTypeId = this.refScoreCategoryTypeId;

    for (let i = 0; i < this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"].value.length; i++) {
      var refScoreCategoryObj = new RefScoreCategoryObj();
      refScoreCategoryObj.RefScoreCategoryTypeId = this.refScoreCategoryTypeId;
      refScoreCategoryObj.BottomValue = this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"].value[i].BottomValue;
      refScoreCategoryObj.TopValue = this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"].value[i].TopValue;
      refScoreCategoryObj.HexColorValue = this.RefScoreCategoryForm.controls["RefScoreCategoryTypeObjs"].value[i].HexColorValue;
      this.listRefScoreCategoryObj.RefScoreCategoryObjs.push(refScoreCategoryObj);
    }

    for(let i = 0; i < this.listRefScoreCategoryObj.RefScoreCategoryObjs.length; i++){
      var checkOverlap = this.listRefScoreCategoryObj.RefScoreCategoryObjs.findIndex(x =>
        ((x.BottomValue >= this.listRefScoreCategoryObj.RefScoreCategoryObjs[i].BottomValue
          && x.BottomValue <= this.listRefScoreCategoryObj.RefScoreCategoryObjs[i].TopValue)
        ||
        (x.TopValue >= this.listRefScoreCategoryObj.RefScoreCategoryObjs[i].BottomValue
          && x.TopValue <= this.listRefScoreCategoryObj.RefScoreCategoryObjs[i].TopValue)));
          
      if(checkOverlap != -1 && checkOverlap != i){
        this.toastr.warningMessage("Score cannot be overlap with each other.");
        return;
      }
    }

    this.httpClient.post(AdInsConstant.AddRangeAndDeleteRefScoreCategory, this.listRefScoreCategoryObj).subscribe(
      //SAVE
      (response) => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigate(['/CommonSetting/ScoreCategory/Paging']);
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    ); 
  }

}
