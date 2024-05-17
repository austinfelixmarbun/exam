import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-master-law-firm-paging',
  templateUrl: './master-law-firm-paging.component.html',
  styleUrls: ['./master-law-firm-paging.component.css']
})
export class MasterLawFirmPagingComponent implements OnInit {

  pageName: string;
  ContractNo :string;
  constructor(private router: Router,
    private adInsHelperService: AdInsHelperService,
    private toastr : NGXToastrService,
    private route : ActivatedRoute,
    private ngxRouter: NgxRouterService,
    private http: HttpClient, private cookieService: CookieService) {
    this.pageName = "MasterLawFirm" 
   }
  ngOnInit(): void {
  }

  handler = {
    callback: ($event) => this.callback($event)
  };

  callback(ev) {
    let row = ev.RowObj;
    let View = ev.ViewObj;
    if (ev.Key == "ViewVendor") {
      //this.onViewVendor(View.VendorCode);
    }
    if (ev.Key == "ViewVendor") {
      //this.onViewVendor(row.VendorCode);
    }
    if (ev.Key == "Edit") {
      //this.OnEdit(row.BatchNo,row.StatusCode);
    }
  }
}
