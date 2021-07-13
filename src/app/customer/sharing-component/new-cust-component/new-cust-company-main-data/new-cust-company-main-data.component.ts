import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RegexService } from 'app/customer/regex.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-new-cust-company-main-data',
  templateUrl: './new-cust-company-main-data.component.html',
})
export class NewCustCompanyMainDataComponent implements OnInit {

  @Input() CustId: number = 0; // if 0 mode Add else mode Edit.
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust; // Cust Mode
  @Output() outputAfterSave: EventEmitter<any> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();
  
  CustomerForm: FormGroup = this.fb.group({});
  constructor(private regexService: RegexService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService, private cookieService: CookieService, private modalService: NgbModal) { }

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  async ngOnInit() {
  }

  ClearCustForm(CustObj = null){
    this.CustomerForm = this.fb.group({
      CustName: ['', [Validators.required, Validators.maxLength(100)]],
      Gender: ['', [Validators.required]],
      MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
      BirthPlace: ['', [Validators.required]],
      BirthDt: ['', [Validators.required]],
      IdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
      IdExpiredDt: [''],
      MrMaritalStatCode: [''],
      MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]],
      CustModel: [''],
      IsVip: [false],
      IsAffiliateWithMf: [false],
      VipNotes: ['', [Validators.required]],
  
      IsSupplier: [false],
      SupplCode: [''],
      SupplName: [''],
      SupplId: ['']
    });
  }
}
