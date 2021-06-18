import { Component, OnInit } from '@angular/core';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  LicenseData : any;
  readonly AddLink: string = NavigationConstant.UPLOAD_LICENSE;
  constructor() { }

  ngOnInit() {
  }

}
