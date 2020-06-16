import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UCSearchComponent } from '@adins/ucsearch';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { empty } from 'rxjs';

@Component({
  selector: 'app-list-office-member-offering',
  templateUrl: './list-office-member.component.html',
  providers: [NGXToastrService]
})
export class ListOfficeMemberComponentOffering implements OnInit {

  @ViewChild(UCSearchComponent) UCSearchComponent;
  @Input() ListOfficeMemberObjInput: any;
  @Output() componentIsOn: EventEmitter<any> = new EventEmitter();
  resultData;
  constructor(
    private http: HttpClient,
    private toastr:NGXToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.route.queryParams.subscribe(params => {
      this.source = params["source"];
    });
  }
  
  pageNow;
  pageSize;
  apiUrl;
  ProdOfferingHId : number;
  source:string ="";

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;
    this.ProdOfferingHId = this.ListOfficeMemberObjInput["param"];
    var obj={
      ProdOfferingHId: this.ProdOfferingHId,
      RowVersion: ""
    }

    var url = AdInsConstant.GetListProdOfferingBranchOfficeMbrByProdHId;
    this.http.post(url, obj).subscribe(
      (response) => {
        console.log("list member");
        // console.log(response);
        this.resultData = response["ReturnObject"];
        console.log("result data");
        console.log(this.resultData);
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addOfficeMember(){
    console.log("add office member");
    // var tempIsOn = false;
    var temp = [];
    var obj;
    if(this.resultData == empty){
      obj = {
        isOn: false,
        result: []
      }
    }else{
      for(var i=0;i<this.resultData.length;i++){
        temp.push(this.resultData[i].RefOfficeId);
      }
      obj = {
        isOn: false,
        result: temp
      }
    }
    
    this.componentIsOn.emit(obj);
    // console.log(this.ListOfficeMemberObjInput);
  }

  orderByKey;
  orderByValue
  searchSort(ev: any){
    console.log(ev);
    if (this.resultData != null) {
      if (this.orderByKey == ev.target.attributes.name.nodeValue) {
        this.orderByValue = !this.orderByValue
      } else {
        this.orderByValue = true
      }
      this.orderByKey = ev.target.attributes.name.nodeValue
      let order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
      this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
    }
  }

  deleteFromList(ev: any){
    // console.log(ev);
    if (confirm('Are you sure to delete this record?')) {
      var url = AdInsConstant.DeleteProdOfferingOfficeMbr;
      var obj = {
        ProdOfferingBranchMbrs:[
          {
            ProdOfferingBranchMbrId: ev.ProdOfferingBranchMbrId,
            RowVersion: ""
          }
        ]
      };

      // console.log(obj);
      this.http.post(url, obj).subscribe(
        (response) => {
          console.log("delete member");
          console.log(response);
          var idx = this.resultData.findIndex(x=>x.ProdOfferingBranchMbrId == ev.ProdOfferingBranchMbrId);
          if(idx > -1) this.resultData.splice(idx, 1);
          this.toastr.successMessage(response["message"]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  DoneForm(){
    this.http.post(environment.FoundationR3Url + "/ProductOffering/SubmitProdOffering", {ProdOfferingHId : this.ProdOfferingHId}).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
      },
      (error) => {
        console.log(error);
      }
    );
    this.toastr.successMessage("Submitted");
    this.toastr.successMessage("Submitted");
    this.BackToPaging();
  }

  Cancel()
  {
    this.BackToPaging();
  }

  BackToPaging()
  {
    if(this.source == "return")
    {
      this.router.navigate(["/Product/ProdOffering/Returnpaging"]);
    }
    else
    {
      this.router.navigate(["/Product/ProdOffering/Paging"]);
    }
  }

}
