import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ResDashboardObj } from 'app/shared/model/dashboard/res-dashboard-obj.model';
import { ThingsToDoIntegrationObj, ThingsToDoIntegrationV2Obj, UcThingsToDoObj } from 'app/shared/model/library/uc-things-to-do-obj.model';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  Item: UcThingsToDoObj = new UcThingsToDoObj();

  username: string;
  url: string;
  officeCode: string;
  roleCode: string;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    // this.Item = {Url : AdInsConstant.GetThingsToDoByRole, Module : "FOU"};

    // let UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    // this.http.post<ResDashboardObj>(AdInsConstant.GetDashboardAccessToken, {UserName: UserAccess[CommonConstant.USER_NAME]}).subscribe(
    //     (response) => {
    //       if (response.dashboardUrl != null && response.dashboardUrl != "") {
    //         this.urlLink = response.dashboardUrl;
    //         this.isReady = true;
    //       }
    //     }
    // );
    let context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.username = context[CommonConstant.USER_NAME];
    this.url = environment.DashboardURL;
    this.officeCode = context[CommonConstant.OFFICE_CODE];
    this.roleCode = context[CommonConstant.ROLE_CODE];
    this.Item.Url = environment.isCore ? AdInsConstant.GetThingsToDoByRoleV2 : AdInsConstant.GetThingsToDoByRole;
    this.Item.RequestObj.ModuleCode = CommonConstant.MODULE_FOU;

    let integrationObj;
    let integrationObj2;

    if(environment.isCore){
      integrationObj = new ThingsToDoIntegrationV2Obj();
      integrationObj.BaseUrl = AdInsConstant.GetThingsToDoCamunda;
      integrationObj.ApiPath = "";
      integrationObj.RequestObj.OfficeCode = "";
      integrationObj.RequestObj.UserName = this.username;
      integrationObj.RequestObj.OfficeRoleCodes = [this.roleCode, this.roleCode + "-" + this.officeCode, this.officeCode];
      
      integrationObj2 = new ThingsToDoIntegrationV2Obj();
      integrationObj2.BaseUrl = AdInsConstant.GetListApvTaskListByUsernameAndRoleCodeForThingsToDo;
      integrationObj2.ApiPath = "";
      integrationObj2.RequestObj.OfficeCode = this.officeCode;
      integrationObj2.RequestObj.UserName = this.username;
      integrationObj2.RequestObj.RoleCode = this.roleCode;
      this.Item.RequestObj.IntegrationObj.push(integrationObj2);
    }else{
      integrationObj = new ThingsToDoIntegrationObj();
      integrationObj.RequestObj.Office = "";
      integrationObj.RequestObj.Role = this.roleCode;
      integrationObj.RequestObj.UserName = this.username;
      
    }
    this.Item.RequestObj.IntegrationObj.push(integrationObj);
  }
  
  showMessage(message: any) {
  }

  @ViewChild('treemenu') public gridContextMenu: ContextMenuComponent;

  public data: any[] = [
    {
      text: 'Furniture', items: [
        { text: 'Tables & Chairs' },
        { text: 'Sofas' },
        { text: 'Occasional Furniture' }
      ]
    },
    {
      text: 'Decor', items: [
        { text: 'Bed Linen' },
        { text: 'Curtains & Blinds' },
        { text: 'Carpets' }
      ]
    }
  ];

  public items: any[] = [{ text: 'Remove', icon: 'close' }];

  private contextItem: any;

  public onNodeClick(e: any): void {
    if (e.type == 'contextmenu') {
      const originalEvent = e.originalEvent;

      originalEvent.preventDefault();

      this.contextItem = e.item.dataItem;

      this.gridContextMenu.show({ left: originalEvent.pageX, top: originalEvent.pageY });
    }
  }

  public onSelect({ item }): void {
    if (item.text == 'Remove') {
      this.removeItem(this.contextItem, this.data);
    }
  }

  private removeItem(dataItem: any, items: any[]): void {
    const index = items.indexOf(dataItem);
    if (index >= 0) {
      items.splice(index, 1);
    } else {
      items.forEach(item => {
        if (item.items) {
          this.removeItem(dataItem, item.items);
        }
      });
    }
  }

}
