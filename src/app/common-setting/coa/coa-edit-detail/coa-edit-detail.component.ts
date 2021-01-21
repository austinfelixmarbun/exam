import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { RefCoaObj } from 'app/shared/model/common-setting/RefCoaObj.Model';

@Component({
  selector: 'app-coa-edit-detail',
  templateUrl: './coa-edit-detail.component.html'
})
export class CoaEditDetailComponent implements OnInit {
  refCoaId: string = ""
  refCoaObj: RefCoaObj = new RefCoaObj()
  CoaForm = this.fb.group(
    {
      Coa: ['', Validators.required]
    }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params['RefCoaId'] != null) {
        this.refCoaId = params['RefCoaId'];
      }
    });
  }

  ngOnInit() {
    this.GetInitialData()
  }

  GetInitialData() {
    this.http.post<RefCoaObj>(URLConstant.GetRefCoaByRefCoaId, { RefCoaId: +this.refCoaId }).subscribe(
      (response) => {
        this.refCoaObj = response

        this.CoaForm.patchValue({
          Coa: this.refCoaObj.Coa
        })
      },
      (error) => {
        console.log(error)
      }
    );
  }

  Submit() {
    this.refCoaObj.Coa = this.CoaForm.controls["Coa"].value

    this.http.post(URLConstant.SubmitCoa, this.refCoaObj).subscribe(
      (response) => {
        this.router.navigate(['/CommonSetting/coa/paging']);
        this.toastr.successMessage(response["Message"]);
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
  }
}