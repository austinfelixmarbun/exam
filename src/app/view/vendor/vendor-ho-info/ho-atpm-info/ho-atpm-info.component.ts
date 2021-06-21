import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
    selector: 'app-ho-atpm-info',
    templateUrl: './ho-atpm-info.component.html',
})
export class HoAtpmInfoComponent implements OnInit {

    @Input() VendorId: number = 0;
    vendorAtpmList: any = new Array();
    constructor(private http: HttpClient) {
    }
    ngOnInit() {
        this.http.post(URLConstant.GetListVendorAtpmMappingByVendorId, { Id: this.VendorId }).subscribe(
            (response) => {
                this.vendorAtpmList = response;
            });
    }

}
