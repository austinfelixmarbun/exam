import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NGXToastrService} from 'app/components/extra/toastr/toastr.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NavigationConstant} from 'app/shared/NavigationConstant';
import {RefSectorEconomySlikObj} from 'app/impl/shared/model/RefSectorEconomySlikObj.model';
import {URLConstantX} from 'app/impl/shared/constant/URLConstantX';
import {AdInsHelper} from 'app/shared/AdInsHelper';
import {URLConstant} from 'app/shared/constant/URLConstant';
import {InputLookupObj} from 'app/shared/model/input-lookup-obj.model';
import {RefIndustryTypeObj} from 'app/shared/model/ref-industry-type-obj.model';

@Component({
  selector: 'app-economic-sector-slik-add-edit-x',
  templateUrl: './economic-sector-slik-add-edit-x.component.html'
})
export class EconomicSectorSlikAddEditXComponent implements OnInit {
  title: string = "Economic Sector SLIK Add"
  pageType: string = "add";
  RefSectorEconomySlikId: number;
  refSectorEconomySlikObj: RefSectorEconomySlikObj;
  refIndustryTypeObj: RefIndustryTypeObj;
  tempRefSectorEconomySlikObj: any;
  tempRefIndustryObj: any;
  RefSectorEconomySlikForm = this.fb.group({
    SectorEconomySlikCode: ['', [Validators.required, Validators.maxLength(100)]],
    SectorEconomySlikName: ['', [Validators.required, Validators.maxLength(200)]],
    IsActive: [true]
  });
  lookUpObj: InputLookupObj;

  readonly CancelLink: string = NavigationConstant.CS_ECONOMIC_SECTOR_SLIK_PAGING;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
    private toastr: NGXToastrService, private fb: FormBuilder) {
      this.route.queryParams.subscribe(params => {
        if (params["mode"] != null) {
          this.pageType = params["mode"];
        }
        if (params["RefSectorEconomySlikId"] != null) {
          this.RefSectorEconomySlikId = params["RefSectorEconomySlikId"];
        }
      });
  }

  ngOnInit() {
    this.lookUpObj = new InputLookupObj();
    this.lookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";

    if (this.pageType == "edit") {
      this.title = "Economic Sector SLIK Edit"
      this.RefSectorEconomySlikForm.controls["SectorEconomySlikCode"].disable();
      this.refSectorEconomySlikObj = new RefSectorEconomySlikObj();
      this.refSectorEconomySlikObj.RefSectorEconomySlikXId = this.RefSectorEconomySlikId;
      this.http.post(URLConstantX.GetRefSectorEconomySlikXById, {Id: this.RefSectorEconomySlikId}).subscribe(
        response => {
          this.tempRefSectorEconomySlikObj = response;
          this.RefSectorEconomySlikForm.patchValue({
            SectorEconomySlikCode: this.tempRefSectorEconomySlikObj.SectorEconomySlikCode,
            SectorEconomySlikName: this.tempRefSectorEconomySlikObj.SectorEconomySlikName,
            IsActive: this.tempRefSectorEconomySlikObj.IsActive
          });

          if (this.tempRefSectorEconomySlikObj.RefIndustryTypeId != null) {
            this.refIndustryTypeObj = new RefIndustryTypeObj();
            this.refIndustryTypeObj.RefIndustryTypeId = this.tempRefSectorEconomySlikObj.RefIndustryTypeId;
            this.http.post(URLConstant.GetRefIndustryTypeById, { Id: this.tempRefSectorEconomySlikObj.RefIndustryTypeId }).subscribe(
              response => {
                this.tempRefIndustryObj = response;
                console.log(this.tempRefIndustryObj);
                this.lookUpObj.nameSelect = this.tempRefIndustryObj.IndustryTypeName;
                this.lookUpObj.jsonSelect = response;
              }
            );
          }
        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refSectorEconomySlikObj = new RefSectorEconomySlikObj();
      this.refSectorEconomySlikObj.SectorEconomySlikCode = this.RefSectorEconomySlikForm.controls["SectorEconomySlikCode"].value
      this.refSectorEconomySlikObj.SectorEconomySlikName = this.RefSectorEconomySlikForm.controls["SectorEconomySlikName"].value;
      this.refSectorEconomySlikObj.IsActive = this.RefSectorEconomySlikForm.controls["IsActive"].value;
      this.refSectorEconomySlikObj.RefIndustryTypeCode = this.tempRefIndustryObj.IndustryTypeCode;
      this.http.post(URLConstantX.AddRefSectorEconomySlikX, this.refSectorEconomySlikObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_ECONOMIC_SECTOR_SLIK_PAGING],{});
        }
      );
    } else {
      this.refSectorEconomySlikObj = this.tempRefSectorEconomySlikObj;
      this.refSectorEconomySlikObj.RefSectorEconomySlikXId = this.RefSectorEconomySlikId;
      this.refSectorEconomySlikObj.SectorEconomySlikName = this.RefSectorEconomySlikForm.controls["SectorEconomySlikName"].value;
      this.refSectorEconomySlikObj.IsActive = this.RefSectorEconomySlikForm.controls["IsActive"].value;
      this.refSectorEconomySlikObj.RefIndustryTypeCode = this.tempRefIndustryObj.IndustryTypeCode;
      this.http.post(URLConstantX.EditRefSectorEconomySlikX, this.refSectorEconomySlikObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_ECONOMIC_SECTOR_SLIK_PAGING],{});
        }
      );
    }
  }

  getLookUp(event) {
    this.tempRefIndustryObj = event;
  }

}
