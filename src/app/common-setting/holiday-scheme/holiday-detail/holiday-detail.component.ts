import { Component, OnInit, ViewChild } from '@angular/core';
import { HolidayObj } from 'app/shared/model/HolidayObj.Model';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm, FormBuilder } from '@angular/forms';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { HolidayDObj } from 'app/shared/model/HolidayDObj.Model';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.scss'],
  providers: [NGXToastrService, DecimalPipe]
})
export class HolidayDetailComponent implements OnInit {

  HolidaySchmHId : string;
  inputPagingObj : any;
  inputPagingObjHolidayScheme : InputLookupObj;
  viewObj : any;
  title : string = "Holiday Scheme Info";
  HolidayManagementForm = this.fb.group({

  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.route.queryParams.subscribe(params => {
      this.HolidaySchmHId = params["HolidaySchmHId"];
    })
  }

  ngOnInit() {
   
    this.inputPagingObjHolidayScheme = new InputLookupObj;
    this.inputPagingObjHolidayScheme.urlJson = "./assets/lookup/lookupHolidayScheme.json";
    this.inputPagingObjHolidayScheme.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjHolidayScheme.urlEnviPaging =   environment.FoundationR3Url;
    this.inputPagingObjHolidayScheme.pagingJson = "./assets/lookup/lookupHolidayScheme.json";
    this.inputPagingObjHolidayScheme.genericJson = "./assets/lookup/lookupHolidayScheme.json";
    
    this.inputPagingObj = new InputSearchObj();
    this.inputPagingObj.addCritInput = new Array();
    
    var critInput = new CriteriaObj();
    critInput.propName = "";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.HolidaySchmHId;
    this.inputPagingObj.addCritInput.push(critInput);

    this.viewObj = "./assets/ucviewgeneric/viewHolidayDetail.json";
    
  }
  
}
