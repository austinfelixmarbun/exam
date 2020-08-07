import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder } from '@angular/forms';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { HolidayCopyObj } from 'app/shared/model/HolidayCopy.Model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  providers: [NGXToastrService]
})
export class HolidayDetailComponent implements OnInit {
  HolidaySchmHIdCopy: string;
  HolidaySchmHId: string;
  inputPagingObjHolidayScheme: InputLookupObj;
  inputPagingObjHolidayDetail: any;
  copyHoliday: any;
  title: string = "Copy Holiday Scheme";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  HolidayManagementForm = this.fb.group({

  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.HolidaySchmHId = params["HolidaySchmHId"];
    })
  }

  AddNavigate() {
    this.router.navigate(['/CommonSetting/Holiday/Detail/Add'], { queryParams: { HolidaySchmHId: this.HolidaySchmHId } });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewHolidayDetail.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.inputPagingObjHolidayScheme = new InputLookupObj;
    var critInputNotIn = new CriteriaObj();
    critInputNotIn.propName = "HOLIDAY_SCHM_H_ID";
    critInputNotIn.restriction = AdInsConstant.RestrictionNeq;
    critInputNotIn.value = this.HolidaySchmHId;

    this.inputPagingObjHolidayScheme.addCritInput = new Array();
    this.inputPagingObjHolidayScheme.addCritInput.push(critInputNotIn);
    this.inputPagingObjHolidayScheme.urlJson = "./assets/lookup/lookupHolidayScheme.json";
    this.inputPagingObjHolidayScheme.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjHolidayScheme.urlEnviPaging = environment.FoundationR3Url;
    this.inputPagingObjHolidayScheme.pagingJson = "./assets/lookup/lookupHolidayScheme.json";
    this.inputPagingObjHolidayScheme.genericJson = "./assets/lookup/lookupHolidayScheme.json";
    this.inputPagingObjHolidayScheme.isRequired = false;
    this.inputPagingObjHolidayDetail = new InputSearchObj();
    this.inputPagingObjHolidayDetail._url = "./assets/ucpaging/searchHolidayDetail.json";
    this.inputPagingObjHolidayDetail.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObjHolidayDetail.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjHolidayDetail.pagingJson = "./assets/ucpaging/searchHolidayDetail.json";
    this.inputPagingObjHolidayDetail.deleteUrl = URLConstant.DeleteHolidaySchmD;
    this.inputPagingObjHolidayDetail.addCritInput = new Array();

    var critInput = new CriteriaObj();
    critInput.propName = "HoliH.HOLIDAY_SCHM_H_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.HolidaySchmHId;
    this.inputPagingObjHolidayDetail.addCritInput.push(critInput);
  }

  getHolidaySchmHId(ev) {
    this.HolidaySchmHIdCopy = ev.HolidaySchmHId;
  }

  Copy(key: any, value: any) {
    if (confirm(ExceptionConstant.COPY_REPLACE_CONFIRMATION + "holiday listings")) {
      this.copyHoliday = new HolidayCopyObj();
      this.copyHoliday.HolidaySchmHId = this.HolidaySchmHId;
      this.copyHoliday.HolidaySchmHIdCopy = this.HolidaySchmHIdCopy;

      this.http.post(URLConstant.CopyHolidaySchmH, this.copyHoliday).subscribe((response) => {
        this.router.navigate(['/CommonSetting/Holiday/Detail/'], { queryParams: { HolidaySchmHId: this.HolidaySchmHId } });
        this.toastr.successMessage(response['message']);
      });
    }
  }
}
