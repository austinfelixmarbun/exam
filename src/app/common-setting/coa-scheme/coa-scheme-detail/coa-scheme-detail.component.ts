import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CoaSchmObj } from 'app/shared/model/common-setting/CoaSchmObj.Model';

@Component({
  selector: 'app-coa-scheme-detail',
  templateUrl: './coa-scheme-detail.component.html',
  styleUrls: ['./coa-scheme-detail.component.scss']
})
export class CoaSchemeDetailComponent implements OnInit {
  ListCOAScheme: Array<any> = new Array<any>();
  ListCopy: Array<any> = new Array<any>();
  CoaValue: string = "";
  SchemeCode: string = "";
  SchemeName: string = "";
  mode: string = "";
  coaSchmId: string = "";
  coaSchmObj: CoaSchmObj = new CoaSchmObj();

  CoaSchemeForm = this.fb.group({
    SchemeCode: ['', Validators.required],
    SchemeName: ['', Validators.required],
    IsActive: [false]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params['CoaSchmId'] != null) {
        this.coaSchmId = params['CoaSchmId'];
      }
      if (params['mode'] != null) {
        this.mode = params['mode'];
      }
    });
  }

  ngOnInit() {
    if (this.mode === "Edit") {
      // this.CoaValue = "COA Scheme";
      // this.SchemeCode = "00021COASCHEM20200920"
      // this.SchemeName = "Scheme 1"

      this.GetCoaSchmData();
    }
    this.ListCopy = [
      {
        Key: "Scheme 1",
        Value: "Scheme 1"
      },
      {
        Key: "Scheme 2",
        Value: "Scheme 2"
      },
      {
        Key: "Scheme 3",
        Value: "Scheme 3"
      },
    ];

    this.ListCOAScheme = [
      {
        PaymentAllocName: "Payment Alloc 1",
      },
      {
        PaymentAllocName: "Payment Alloc 2",
      },
      {
        PaymentAllocName: "Payment Alloc 3",
      }
    ];
  }

  GetCoaSchmData() {
    this.http.post<CoaSchmObj>(URLConstant.GetCoaSchmByCoaSchmId, { CoaSchmId: +this.coaSchmId }).subscribe(
      (response) => {
        this.coaSchmObj = response;

        this.CoaSchemeForm.patchValue({
          SchemeCode: this.coaSchmObj.SchmCode,
          SchemeName: this.coaSchmObj.SchmName,
          IsActive: this.coaSchmObj.IsActive
        })
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
  }

  copy() {
    this.CoaValue = "COA SHEME";
  }

  Submit() {
    this.coaSchmObj.SchmCode = this.CoaSchemeForm.controls["SchemeCode"].value;
    this.coaSchmObj.SchmName = this.CoaSchemeForm.controls["SchemeName"].value;
    this.coaSchmObj.IsActive = this.CoaSchemeForm.controls["IsActive"].value;

    this.http.post(URLConstant.SubmitCoaSchm, this.coaSchmObj).subscribe(
      (response) => {
        this.router.navigate(['/CommonSetting/coascheme/paging']);
        this.toastr.successMessage(response["Message"]);
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
  }
}