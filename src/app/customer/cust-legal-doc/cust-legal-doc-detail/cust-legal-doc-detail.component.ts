import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-cust-legal-doc-detail',
  templateUrl: './cust-legal-doc-detail.component.html'
})
export class CustLegalDocDetailComponent implements OnInit {
  @Input() CustCompanyId: number;
  legalDocTypeList: any;
  businessDtMin: Date;
  businessDtMax: Date;

  CustCompanyLegalDocForm = this.fb.group({
    CustCompanyLegalDocId: [0, [Validators.required]],
    CustCompanyId: [0, [Validators.required]],
    MrLegalDocTypeCode: ['', [Validators.required]],
    DocNo: ['', [Validators.required]],
    DocDt: ['', [Validators.required]],
    DocExpiredDt: ['', [Validators.required]],
    DocNotes: ['', [Validators.required]],
    NotaryName: ['', [Validators.required]],
    NotaryLocation: ['', [Validators.required]],
    RowVersion: ['']
  });

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);

    var refMasterDocType = new RefMasterObj();
    refMasterDocType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeLegalDocType;
    this.httpClient.post(URLConstant.GetListActiveRefMaster, refMasterDocType).subscribe(
      (response: any) => {
        this.legalDocTypeList = response;
        this.CustCompanyLegalDocForm.patchValue({
          CustCompanyId: this.CustCompanyId,
          MrLegalDocTypeCode: response.ReturnObject[0].Key
        });
      }
    );
  }

  Save(enjiForm) {
    var custCompanyLegalDocData = this.CustCompanyLegalDocForm.value;

    this.httpClient.post(URLConstant.AddCustCompanyLegalDoc, custCompanyLegalDocData).subscribe(
      (response) => {
        this.activeModal.close(response);
      }
    );
  }
}
