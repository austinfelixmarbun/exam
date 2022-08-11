import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { RefNotificationSourceObj } from 'app/shared/model/notif-engine/ref-notification-source-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-notif-source-form',
  templateUrl: './notif-source-form.component.html',
  styleUrls: ['./notif-source-form.component.css']
})
export class NotifSourceFormComponent implements OnInit {

  NotifSourceForm = this.fb.group({
    NotificationSourceCode: ['', Validators.required],
    NotificationSourceDescr: ['', Validators.required],
    IsActive: [false]
  });
  pageType: string = "add";
  RefNotificationSourceId: number = 0;
  ExistingRefNotificationSourceObj: RefNotificationSourceObj = new RefNotificationSourceObj();
  
  readonly identifierFormNotificationSourceCode: string = "NotificationSourceCode";
  readonly identifierFormNotificationSourceDescr: string = "NotificationSourceDescr";
  readonly identifierFormIsActive: string = "IsActive";
  readonly CancelLink: string = NavigationConstant.NOTIF_ENGINE_NOTIF_SOURCE_PAGING;
  
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["RefNotificationSourceId"] != null) {
        this.RefNotificationSourceId = params["RefNotificationSourceId"];
        this.pageType = "edit";
      }
    });
  }

  async ngOnInit() {
    if(this.RefNotificationSourceId) {
      this.ExistingRefNotificationSourceObj = await this.GetData(this.RefNotificationSourceId);
      this.SetFormData(this.ExistingRefNotificationSourceObj);
      this.NotifSourceForm.controls[this.identifierFormNotificationSourceCode].disable();
    }
  }

  async SaveForm() {
    const urlSave = this.RefNotificationSourceId == 0 ? this.UrlConstantNew.AddRefNotificationSource : this.UrlConstantNew.EditRefNotificationSource;
    let reqObj: RefNotificationSourceObj = new RefNotificationSourceObj();
    let form = this.NotifSourceForm.getRawValue();
    if (this.RefNotificationSourceId != 0){
      reqObj.RefNotificationSourceId = this.ExistingRefNotificationSourceObj.RefNotificationSourceId;
      reqObj.RowVersion = this.ExistingRefNotificationSourceObj.RowVersion;
    }
    reqObj.NotificationSourceCode = form[this.identifierFormNotificationSourceCode];
    reqObj.NotificationSourceDescr = form[this.identifierFormNotificationSourceDescr];
    reqObj.IsActive = form[this.identifierFormIsActive];

    const _saveReq = this.http.post(urlSave, reqObj, AdInsConstant.SpinnerOptions);
    const res = await lastValueFrom(_saveReq);
    if (res["StatusCode"] != "200") return;

    this.toastr.successMessage(res['message']);
    AdInsHelper.RedirectUrl(this.router, [this.CancelLink], {});
  }

  private async GetData(id: number): Promise<RefNotificationSourceObj> {
    let reqByIdObj: GenericObj = new GenericObj();
    reqByIdObj.Id = id;

    const _getReq = this.http.post<RefNotificationSourceObj>(this.UrlConstantNew.GetRefNotificationSourceByRefNotificationSourceId, reqByIdObj);
    const res = await lastValueFrom(_getReq);
    return res;
  }

  private SetFormData(data: RefNotificationSourceObj) {
    this.NotifSourceForm.patchValue({
      NotificationSourceCode: data.NotificationSourceCode,
      NotificationSourceDescr: data.NotificationSourceDescr,
      IsActive: data.IsActive
    });
  }

}
