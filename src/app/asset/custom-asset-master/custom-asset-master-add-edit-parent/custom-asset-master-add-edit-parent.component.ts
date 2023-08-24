import { UcTemplateService } from '@adins/uctemplate';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-asset-master-add-edit-parent',
  templateUrl: './custom-asset-master-add-edit-parent.component.html'
})
export class CustomAssetMasterAddEditParentComponent implements OnInit, AfterViewInit {

  parentForm: FormGroup;
  pageName: string;
  data: EventEmitter<any> = new EventEmitter<any>();
  
  handler = {
    callback: ($event) => this.callback($event)
  }

  constructor(private http: HttpClient, private templateService: UcTemplateService) {
    this.pageName = "AssetMasterDetail"
  }

  ngAfterViewInit(): void {
    console.log("masook: ", this.data.emit({ListAssetScheme: []}));
    this.data.emit({ListAssetScheme: []});
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.parentForm = this.templateService.container.getForm();
    }, 1000);
  }

  callback(ev: any) {
    console.log('callback event: ', ev);
    if (typeof ev === 'string') {
      switch(ev) {
        case 'AssetTypeId':
          // this.getListAssetScheme(ev);
          break;
        default:
          break;
      }
    }
  }

  // getListAssetScheme(key: string) {
  //   const assetTypeId = this.parentForm.get(key).value;
  //   const request = {
  //     AssetTypeId: assetTypeId
  //   };

  //   console.log('parentForm', request);
  //   this.http.post('https://r3app-server.ad-ins.com/FOUNDATION_CORE_DEV/v1/AssetSchmH/GetListAssetSchmHByAssetMasterId', request)
  //   .subscribe(res => {
  //     console.log('Response Assets', res);
  //     this.data.emit({ListAssetScheme: res['ReturnObject']});
  //   })
  // }

}
