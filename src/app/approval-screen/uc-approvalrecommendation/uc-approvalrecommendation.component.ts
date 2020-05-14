import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-uc-approvalrecommendation',
  templateUrl: './uc-approvalrecommendation.component.html',
})
export class UcApprovalrecommendationComponent implements OnInit {

  @Input() apvBaseUrl: string;
  @Input() schemeCode: string;
  @Input() identifier: string;
  @Input() parentForm: FormGroup;
  @Input() enjiForm: NgForm;
  
  ListRecommendation : any;

  constructor(
    private http: HttpClient,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    this.LoadRecommendation();
  }

  LoadRecommendation() {
    this.http.post(this.apvBaseUrl + "/api/RFAWeb/GetRecommendations", { schemeCode: this.schemeCode }).subscribe(
      (response) => {
        this.ListRecommendation = response;
        for (let i = 0; i < this.ListRecommendation.length ; i++) {
          var fa = this.parentForm.get(this.identifier) as FormArray
          fa.push(this.addRecControl(this.ListRecommendation[i]));
        }
      }
    );
  }

  addRecControl(obj : any) {
    return this.fb.group({
      RefRecommendationId : [obj.RefRecommendationId],
      RecommendationCode : [obj.RecommendationCode],
      RecommendationName : [obj.RecommendationName],
      RecommendationValue : ['',Validators.required],
    })
  }


}
