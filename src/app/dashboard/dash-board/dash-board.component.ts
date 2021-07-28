import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ResDashboardObj } from 'app/shared/model/Dashboard/ResDashboardObj.model';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  Item : any;
  url: ResDashboardObj = new ResDashboardObj();
  urlLink: string = "";
  isReady: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
    this.Item = {Url : AdInsConstant.GetThingsToDoByRole, Module : "FOU"};

    let UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.http.post<ResDashboardObj>(AdInsConstant.GetDashboardAccessToken, {UserName: UserAccess[CommonConstant.USER_NAME]}).subscribe(
        (response) => {
          if (response.dashboardUrl != null && response.dashboardUrl != "") {
            this.urlLink = response.dashboardUrl;
            this.isReady = true;
          }
        }
    );
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
