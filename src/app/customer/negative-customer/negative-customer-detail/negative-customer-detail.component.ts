import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-negative-customer-detail',
  templateUrl: './negative-customer-detail.component.html',
  styleUrls: ['./negative-customer-detail.component.scss']
})
export class NegativeCustomerDetailComponent implements OnInit {
  pageType: string = "add";
  negativeCustId: number;

  NegativeCustForm = this.fb.group({
    NegativeCustId: [0, [Validators.required]],
    CustId: [0, [Validators.required]],
    MrCustTypeCode: ['', [Validators.required]],
    CustNo: [''],
    CustName: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required]],
    IdNo: ['', [Validators.required]],
    IdExpiredDt: [''],
    TaxIdNo: [''],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', Validators.required],
    MrGenderCode: [''],
    MotherMaidenName: ['', [Validators.required]],
    LegalAddr: ['', [Validators.required]],
    AreaCode1: ['', [Validators.required]],
    AreaCode2: ['', [Validators.required]],
    AreaCode3: ['', [Validators.required]],
    AreaCode4: ['', [Validators.required]],    
    City: ['', [Validators.required]],
    PhnArea1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Phn1: ['', [Validators.required, Validators.pattern]],
    PhnExt1: ['', [Validators.required]],
    PhnArea2: ['', [Validators.pattern("^[0-9]+$")]]
    // Phn2: any;
    // PhnExt2: any;
    // PhnArea3: any;
    // Phn3: any;
    // PhnExt3: any;
    // FaxArea: any;
    // Fax: any;
    // MobilePhn: any;
    // MrNegCustTypeCode: any;
    // MrNegCustSourceCode: any;
    // NegCustCause: any;
    // Notes: any;
    // IsActive: any;
    // RowVersion: any;
    // AssetNegativeId: [0, [Validators.required]],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.pageType = params['param'];
      }
      if (params['assetNegativeId'] != null) {
        // this.assetNegativeId = params['assetNegativeId'];
      }
    });
  }

  ngOnInit() {
  }

}
