import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ScoreCategorySchmHObj } from 'app/shared/model/ScoreCategory/ScoreCategorySchmHObj.model';
import { ScoreCategorySchmDObj } from 'app/shared/model/ScoreCategory/ScoreCategorySchmDObj.model';
import { ListScoreCategorySchmDObj } from 'app/shared/model/ScoreCategory/ListScoreCategorySchmDObj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-score-category-scoring',
  templateUrl: './score-category-scoring.component.html',
  providers: [NGXToastrService]
})
export class ScoreCategoryScoringComponent implements OnInit {
  scoreCategorySchmHObj: ScoreCategorySchmHObj = new ScoreCategorySchmHObj();
  scoreCategorySchmHId: number = 0;
  listScoreCategorySchmDObj: ListScoreCategorySchmDObj = new ListScoreCategorySchmDObj();

  ScoreCategoryForm = this.fb.group({
    ScoreCategorySchmDObjs: new FormArray([])
  });

  ListHexColorValue: Array<string> = new Array<string>();
  maxBottomValue: Array<number> = new Array<number>();
  minTopValue: Array<number> = new Array<number>();

  readonly CancelLink: string = NavigationConstant.CS_SCORE_CATEGORY_PAGING;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['ScoreCategorySchmHId'] != null) {
        this.scoreCategorySchmHId = params['ScoreCategorySchmHId'];
      }
    });
  }


  ngOnInit() {   
    this.scoreCategorySchmHObj.ScoreCategorySchmHId = this.scoreCategorySchmHId;
    this.httpClient.post(URLConstant.GetRefScoreCategoryTypeWithDetailById, this.scoreCategorySchmHObj).subscribe(
      (response) => {
        this.scoreCategorySchmHObj.ScoreCategorySchmHCode = response["ScoreCategorySchmHCode"];
        this.scoreCategorySchmHObj.ScoreCategorySchmHName = response["ScoreCategorySchmHName"];
        this.scoreCategorySchmHObj.Notes = response["Notes"];

        if(response["ScoreCategorySchmDObjs"] != null){
          var listScoreCategorySchmD = response["ScoreCategorySchmDObjs"];
          var scoreForm = this.ScoreCategoryForm.controls.ScoreCategorySchmDObjs as FormArray;

          for(let i = 0; i < listScoreCategorySchmD.length; i++){
            this.maxBottomValue.push(listScoreCategorySchmD[i].TopValue);
            this.minTopValue.push(listScoreCategorySchmD[i].BottomValue);
            scoreForm.push(this.addGroup(listScoreCategorySchmD[i], this.maxBottomValue[this.maxBottomValue.length -1], this.minTopValue[this.minTopValue.length - 1]));
            this.ListHexColorValue.push(listScoreCategorySchmD[i].HexColorValue);
          }
        }
      }
    );
  }

  addScore(){
    var scoreForm = this.ScoreCategoryForm.controls.ScoreCategorySchmDObjs as FormArray;
    this.maxBottomValue.push(0);
    this.minTopValue.push(0);
    scoreForm.push(this.addGroup(undefined, this.maxBottomValue[this.maxBottomValue.length -1], this.minTopValue[this.minTopValue.length - 1]));
    this.ListHexColorValue.push("#fff");
  }

  deleteScore(i){
    if (confirm('Are you sure to delete this record?')) {
      var scoreForm = this.ScoreCategoryForm.controls.ScoreCategorySchmDObjs as FormArray;
      scoreForm.removeAt(i);
      this.maxBottomValue.splice(i, 1);
      this.minTopValue.splice(i, 1);
      this.ListHexColorValue.splice(i, 1);
    }
  }

  addGroup(scoreCategorySchmDObj, maxBottomValue, minTopValue){
    if(scoreCategorySchmDObj == undefined){
      return this.fb.group({
        BottomValue: [0, [Validators.required, Validators.max(maxBottomValue)]],
        TopValue: [0, [Validators.required, Validators.min(minTopValue)]],
        HexColorValue: ['', [Validators.required, Validators.maxLength(50)]]
      })
    }else{
      return this.fb.group({
        BottomValue: [scoreCategorySchmDObj.BottomValue, [Validators.required, Validators.max(maxBottomValue)]],
        TopValue: [scoreCategorySchmDObj.TopValue, [Validators.required, Validators.min(minTopValue)]],
        HexColorValue: [scoreCategorySchmDObj.HexColorValue, [Validators.required, Validators.maxLength(50)]]
      })
    } 
  }

  HexColorValueChanged(event, i){
    this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"]["controls"][i].patchValue({
      HexColorValue: event
    });
  }

  BottomValueChanged(event, i){
    this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"]["controls"][i]["controls"].TopValue.setValidators([Validators.required, Validators.min(event.target.value)]);
    this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"]["controls"][i]["controls"].TopValue.updateValueAndValidity();
  }

  TopValueChanged(event, i){
    this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"]["controls"][i]["controls"].BottomValue.setValidators([Validators.required, Validators.max(event.target.value)]);
    this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"]["controls"][i]["controls"].BottomValue.updateValueAndValidity();
  }

  Save() {
    if(this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"].value.length == 0){
      this.toastr.warningMessage("Please input at least one score.");
      return;
    }
    this.listScoreCategorySchmDObj = new ListScoreCategorySchmDObj();    
    this.listScoreCategorySchmDObj.ScoreCategorySchmHId = this.scoreCategorySchmHId;

    for (let i = 0; i < this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"].value.length; i++) {
      var scoreCategorySchmDObj = new ScoreCategorySchmDObj();
      scoreCategorySchmDObj.ScoreCategorySchmHId = this.scoreCategorySchmHId;
      scoreCategorySchmDObj.BottomValue = this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"].value[i].BottomValue;
      scoreCategorySchmDObj.TopValue = this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"].value[i].TopValue;
      scoreCategorySchmDObj.HexColorValue = this.ScoreCategoryForm.controls["ScoreCategorySchmDObjs"].value[i].HexColorValue;
      this.listScoreCategorySchmDObj.ScoreCategorySchmDObjs.push(scoreCategorySchmDObj);
    }

    for(let i = 0; i < this.listScoreCategorySchmDObj.ScoreCategorySchmDObjs.length; i++){
      var checkOverlap = this.listScoreCategorySchmDObj.ScoreCategorySchmDObjs.findIndex(x =>
        ((x.BottomValue >= this.listScoreCategorySchmDObj.ScoreCategorySchmDObjs[i].BottomValue
          && x.BottomValue <= this.listScoreCategorySchmDObj.ScoreCategorySchmDObjs[i].TopValue)
        ||
        (x.TopValue >= this.listScoreCategorySchmDObj.ScoreCategorySchmDObjs[i].BottomValue
          && x.TopValue <= this.listScoreCategorySchmDObj.ScoreCategorySchmDObjs[i].TopValue)));

      if(checkOverlap != -1 && checkOverlap != i){
        this.toastr.warningMessage("Score cannot be overlap with each other.");
        return;
      }
    }

    this.httpClient.post(URLConstant.AddRangeAndDeleteScoreCategorySchmD, this.listScoreCategorySchmDObj).subscribe(
      //SAVE
      (response) => {
        this.toastr.successMessage(response["Message"]);
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_SCORE_CATEGORY_PAGING],{});
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    ); 
  }

}
