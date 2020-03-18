import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-ho-registration',
  templateUrl: './vendor-ho-registration.component.html',
  styleUrls: ['./vendor-ho-registration.component.scss'],
  providers: [NGXToastrService]
})
export class VendorHoRegistrationComponent implements OnInit {
  mode: string = "add";
  VendorId: any; 
  objPassing: any = {};
  HiddenState: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
      this.objPassing["mode"] = params['mode'];
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
  }

  outputValue(ev){
    this.HiddenState = ev;
  }
}
