import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vendor-ho-info',
  templateUrl: './vendor-ho-info.component.html'
})
export class VendorHoInfoComponent implements OnInit {
  VendorId: any;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    
  }

}
