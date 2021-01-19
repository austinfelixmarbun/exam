import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { CabinetWithListRackObj } from 'app/shared/model/document-management/CabinetWithListRackObj.Model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rack-paging',
  templateUrl: './rack-paging.component.html'
})
export class RackPagingComponent implements OnInit {
  Cabinet: CabinetWithListRackObj = new CabinetWithListRackObj();

  constructor(private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['CabinetCode'] !== null){
          this.Cabinet.CabinetCode = params['CabinetCode']
        }
        else{
          this.router.navigateByUrl("/DocumentManagement/Cabinet/Paging")
        }
      }
    );
  }

  ngOnInit() {
    this.http.post<CabinetWithListRackObj>(environment.FoundationR3Url + "/DocManagement/GetCabinetAndListRackByCabinetCode", this.Cabinet).subscribe(
      (response) => {
        this.Cabinet = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editRack(index){
    let rackCode = this.Cabinet.ListRack[index].RackCode;
    this.router.navigate(["/DocumentManagement/Rack/AddEdit"], { queryParams: { RackCode: rackCode, Mode: 'Edit' } });
  }
}