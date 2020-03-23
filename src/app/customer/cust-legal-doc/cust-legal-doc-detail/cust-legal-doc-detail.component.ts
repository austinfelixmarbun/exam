import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-cust-legal-doc-detail',
  templateUrl: './cust-legal-doc-detail.component.html',
  styleUrls: ['./cust-legal-doc-detail.component.scss']
})
export class CustLegalDocDetailComponent implements OnInit {
  @Input() CustCompanyId: number;
  legalDocTypeList: any;

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
    var refMasterDocType = new RefMasterObj();
    refMasterDocType.RefMasterTypeCode = "LEGAL_DOC_TYPE";
    this.httpClient.post(AdInsConstant.GetListActiveRefMaster, refMasterDocType).subscribe(
      (response: any) => {
        this.legalDocTypeList = response;
        this.CustCompanyLegalDocForm.patchValue({
          MrLegalDocTypeCode: response.ReturnObject[0].Key
        });
      },
      (error) => {
        console.log("ERROR");
        console.log(error);
      }
    );
  }

  Save(enjiForm){
    var custCompanyLegalDocData = this.CustCompanyLegalDocForm.value;

    this.httpClient.post(AdInsConstant.AddCustCompanyLegalDoc, custCompanyLegalDocData).subscribe(
      (response) => {
        this.activeModal.close(response);
      },
      (error) => {
        console.log("ERROR");
        console.log(error);
      }
    );
  }

}
