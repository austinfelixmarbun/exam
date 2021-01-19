import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-view-rack',
  templateUrl: './view-rack.component.html',
  styleUrls: ['./view-rack.component.scss']
})
export class ViewRackComponent implements OnInit {
  RackCode: string;
  responseFiling: any;
  responseRack: any;
  GetListFilingByRackCode = URLConstant.GetListFilingByRackCode;
  GetRackByRackCode = URLConstant.GetRackByRackCode;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['RackCode'] != null) {
        this.RackCode = params['RackCode'];
      }
    });

    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/document-management/viewRack.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
    var rackObj = { "RackCode": this.RackCode };
    this.http.post(this.GetRackByRackCode, rackObj).subscribe(
      response => {
        this.responseRack = response;
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );

    var filingObj = { "RackCode": this.RackCode };
    this.http.post(this.GetListFilingByRackCode, filingObj).subscribe(
      response => {
        this.responseFiling = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}