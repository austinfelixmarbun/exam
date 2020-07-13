import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfQuestionGrpHObj } from 'app/shared/model/VerfQuestionGrpHObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-verification-question-group-member-paging',
  templateUrl: './verification-question-group-member-paging.component.html',
  providers: [NGXToastrService]
})
export class VerificationQuestionGroupMemberPagingComponent implements OnInit {
  verfQuestionGrpHObj: VerfQuestionGrpHObj;
  VerfQuestionGrpHId: any;
  verfQuestionGroup: any;
  listVerfQuestionGrpD: any;

  VerfQuestionGrpCode: any;
  VerfQuestionGrpName: any;
  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfQuestionGrpHId = params["VerfQuestionGrpHId"];
   })
  }

  QuestionGroupForm = this.fb.group({
  })

  QuestionGroupListForm = this.fb.group({
  })

  ngOnInit() {
    var verfGroupObj = { VerfQuestionGrpHId: this.VerfQuestionGrpHId }
    this.http.post(URLConstant.GetQuestionGrpHForUpdateById, verfGroupObj).subscribe(
      (response) => {
        this.verfQuestionGroup = response["ReturnObject"];
          this.VerfQuestionGrpCode = this.verfQuestionGroup.VerfQuestionGrpCode,
          this.VerfQuestionGrpName = this.verfQuestionGroup.VerfQuestionGrpName
      }
    );
    this.http.post(URLConstant.GetVerfQuestionGrpDByGrpHId, verfGroupObj).subscribe(
      (response) => {
        this.listVerfQuestionGrpD = response["ReturnObject"];
      }
    );
  }

  Edit(item)
  {
    this.router.navigateByUrl('/Verification/QuestionGroupMember/Edit?VerfQuestionGrpDId=' + item.VerfQuestionGrpDId + '&VerfQuestionGrpHId=' + this.VerfQuestionGrpHId);
  }

  Delete(verfQuestionGrpDId){
    if (confirm("Are you sure to delete this record?")) {
      var verfGroupObj = {VerfQuestionGrpHId: this.VerfQuestionGrpHId, VerfQuestionGrpDId: verfQuestionGrpDId};
      this.http.post(URLConstant.DeleteVerfQuestionGroupDById, verfGroupObj).subscribe(
        (response) => {
          this.listVerfQuestionGrpD = response["ReturnObject"];
        }
      );
    }
  }

}
