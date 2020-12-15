import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-vendor-atpm-select',
  templateUrl: './vendor-atpm-select.component.html',
  providers: [NGXToastrService]
})
export class VendorAtpmSelectComponent implements OnInit {

  inputLookupATPMObj: InputLookupObj = new InputLookupObj();
  @Input() listExistingAtpmCode: Array<string> = new Array<string>();
  @Output() emitData: EventEmitter<object> = new EventEmitter();

  VendorAtpmForm = this.fb.group({
    VendorId:[''],
    VendorAtpmCode: ['', [Validators.required]],
    VendorName:[''],
    VendorLegalAddr: ['']
  });
  
  constructor(private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,) { }

  ngOnInit() 
  {
    this.setLookup();
  }

  setLookup()
  {
      this.inputLookupATPMObj.urlJson = "./assets/uclookup/vendor/lookupVendorParent.json";
      this.inputLookupATPMObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
      this.inputLookupATPMObj.urlEnviPaging = environment.FoundationR3Url;
      this.inputLookupATPMObj.pagingJson = "./assets/uclookup/vendor/lookupVendorParent.json";
      this.inputLookupATPMObj.genericJson = "./assets/uclookup/vendor/lookupVendorParent.json";
      this.inputLookupATPMObj.isRequired = false;
      this.inputLookupATPMObj.addCritInput = new Array();

      var critInput = new CriteriaObj();
      critInput.propName = "V.MR_VENDOR_CATEGORY_CODE";
      critInput.restriction = AdInsConstant.RestrictionEq;
      critInput.value = CommonConstant.SUPPLIER_ATPM;
      this.inputLookupATPMObj.addCritInput.push(critInput);

      if(this.listExistingAtpmCode.length > 0)
      {
        var critInput2 = new CriteriaObj();
        critInput2.DataType = "string";
        critInput2.propName = "V.VENDOR_CODE";
        critInput2.restriction = AdInsConstant.RestrictionNotIn;
        critInput2.listValue = this.listExistingAtpmCode;
        this.inputLookupATPMObj.addCritInput.push(critInput2);
      }

      this.inputLookupATPMObj.title = CommonConstant.TITLE_SUPPLIER_ATPM;
      this.inputLookupATPMObj.isReady = true;//Perlu tambain criteria yg uda kepilih ga muncul di lookup
  }

  getLookupATPM(ev)
  {
    this.VendorAtpmForm.patchValue({
      VendorId: ev.VendorId,
      VendorAtpmCode: ev.VendorCode,
      VendorName: ev.VendorName,
      VendorLegalAddr: ev.VendorLegalAddr
    });
  }

  Save(enjiForm)
  {
    var obj = 
    {
      VendorId: this.VendorAtpmForm.controls.VendorId.value,
      VendorCode: this.VendorAtpmForm.controls.VendorAtpmCode.value,
      VendorName: this.VendorAtpmForm.controls.VendorName.value,
      LegalAddr: this.VendorAtpmForm.controls.VendorLegalAddr.value,
    }

    this.emitData.emit(obj);
    this.activeModal.close();
  }
}