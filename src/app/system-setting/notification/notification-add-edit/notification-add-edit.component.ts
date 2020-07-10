import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment'; 
import { NotificationHObj } from 'app/shared/model/NotificationHObj.Model';
import { NotificationDObj } from 'app/shared/model/NotificationDObj.Model';
import { formatDate } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-notification-add-edit',
  templateUrl: './notification-add-edit.component.html',
  providers: [NGXToastrService]
})
export class NotificationAddEditComponent implements OnInit {
  settingUrl: string = environment.FoundationR3Url;
  title: string ="Notification-Add";
  mode: any = "add";
  notificationHObj: NotificationHObj;
  notificationHId: any;
  resultDataH: any;
  resultDataD: any;
  getHUrl: any;
  getDUrl: any;
  addUrl: any;
  editUrl: any;
  tempListNotifType: any;
  tempListNotifMethod: any;
  refOfficeObj:any;
  refRoleObj:any;
  dropdownSettings:IDropdownSettings;
  dropdownListOffice = [];
  selectedItemsOffice = [];
  dropdownListRole = [];
  selectedItemsRole = [];

  NotificationForm = this.fb.group({
    NotificationType: ['', [Validators.required]],
    NotificationMethod: ['', [Validators.required]],
    Title: ['', [Validators.required, Validators.maxLength(200)]],
    ShortDescription: ['', [Validators.required, Validators.maxLength(1000)]],
    LongDescription: ['', [Validators.maxLength(8000)]],
    PublishDate: ['', [Validators.required]],
    TargetOffice: [''],
    TargetRole: [''],

  })
  
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
     this.getHUrl = this.settingUrl + AdInsConstant.GetNotificationHByNotificationHId;
    // this.getDUrl = AdInsConstant.;
    this.addUrl = this.settingUrl + AdInsConstant.AddNotificationHAndD;
    // this.editUrl = AdInsConstant.;

    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.mode = params["mode"];
      }
      if (params["NotificationHId"] != null) {
        this.notificationHId = params["NotificationHId"];
      }
    });
  }

  ngOnInit() {
    var refMasterNotifTypeObj = {
      RefMasterTypeCode: "NOTIFICATION_TYPE",
      RowVersion: ""
    }
    this.http.post(AdInsConstant.GetListActiveRefMaster, refMasterNotifTypeObj).subscribe(
      (response) => {
        if (response['ReturnObject'].length > 0) {
          this.tempListNotifType = response["ReturnObject"];
          this.NotificationForm.patchValue({
            NotificationType: this.tempListNotifType[0].Key
          });
        }
      }
    );

    var refMasterNotifMethodObj = {
      RefMasterTypeCode: "NOTIFICATION_METHOD",
      RowVersion: ""
    }
    this.http.post(AdInsConstant.GetListActiveRefMaster, refMasterNotifMethodObj).subscribe(
      (response) => {
        if (response['ReturnObject'].length > 0) {
          this.tempListNotifMethod = response["ReturnObject"];
          this.NotificationForm.patchValue({
            NotificationMethod: this.tempListNotifMethod[0].Key
          });
        }
      }
    );

    this.settingMultiSelectDropdown();

    if (this.mode == "edit") {
      this.title = "Notification-Edit";
      this.notificationHObj = new NotificationHObj();
      this.notificationHObj.NotificationHId = this.notificationHId;
      this.http.post(this.getHUrl, this.notificationHObj).subscribe(
        response => {
          this.resultDataH = response;
          this.NotificationForm.patchValue({
           NotificationType: this.resultDataH.MrNotificationTypeCode,
           NotificationMethod: this.resultDataH.MrNotificationMethodCode,
           Title: this.resultDataH.Title,
           ShortDescription: this.resultDataH.ShortDesc,
           LongDescription: this.resultDataH.LongDesc,
           PublishDate: formatDate(this.resultDataH.PublishDt,  'yyyy-MM-dd', 'en-US')
           
          });
        },
        error => {
          console.log(error);
        }
      );
    }
    
  }

  settingMultiSelectDropdown(){

    var urlOffice = this.settingUrl + AdInsConstant.GetListActiveRefOffice;
    this.http.post(urlOffice, null).subscribe(
      (response) => {
        this.refOfficeObj = response["ReturnObject"];
        for (let i = 0; i < this.refOfficeObj.length; i++) {
          this.dropdownListOffice.push({ item_id: this.refOfficeObj[i].RefOfficeId, item_text: this.refOfficeObj[i].OfficeName});
        }
      },
      (error) => {
        console.log(error);
      }
    );

    var urlRole = this.settingUrl + AdInsConstant.GetListActiveRefRole;
    this.http.post(urlRole, null).subscribe(
      (response) => {
        this.refRoleObj = response["ReturnObject"];
        for (let i = 0; i < this.refRoleObj.length; i++) {
          this.dropdownListRole.push({ item_id: this.refRoleObj[i].RefRoleId, item_text: this.refRoleObj[i].RoleName});
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    

  }

  SaveForm() {
    if(this.selectedItemsOffice.length == 0 && this.selectedItemsRole.length == 0)
    {
      this.toastr.errorMessage("Please choose office and/or role to be notified");
      return false;
    }
    else
    {
      var currentUserContext = JSON.parse(localStorage.getItem("UserAccess"));

      if (this.mode == "add") 
      {
        this.notificationHObj = new NotificationHObj();
        this.notificationHObj.MrNotificationTypeCode = this.NotificationForm.controls["NotificationType"].value
        this.notificationHObj.MrNotificationMethodCode = this.NotificationForm.controls["NotificationMethod"].value;
        this.notificationHObj.Title = this.NotificationForm.controls["Title"].value;
        this.notificationHObj.ShortDesc = this.NotificationForm.controls["ShortDescription"].value;
        this.notificationHObj.LongDesc = this.NotificationForm.controls["LongDescription"].value;
        this.notificationHObj.ReqBy = currentUserContext.UserName;
        this.notificationHObj.PublishDt = this.NotificationForm.controls["PublishDate"].value;
        this.notificationHObj.Status = "NEW"
        this.notificationHObj.IsActive = true;
        this.notificationHObj.IsDraft = false;
        this.notificationHObj.listTargetRefOfficeId = this.selectedItemsOffice.map(x => x.item_id);
        this.notificationHObj.listTargetRefRoleId = this.selectedItemsRole.map(x => x.item_id);
  
        this.http.post(this.addUrl, this.notificationHObj).subscribe(
          response => {
              this.toastr.successMessage(response["Message"]);
              this.router.navigate(["/SystemSetting/Notification"]);
            
          },
          error => {
            console.log(error);
          }
        );
      }
      else //Edit
      {
  
      }
    }
    
  }

}
