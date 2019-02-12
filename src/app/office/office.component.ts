import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { environment } from '../../environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
  providers: [NgbPaginationConfig] // add NgbPaginationConfig to the component providers
})
export class OfficeComponent implements OnInit {

  urlJson: string = "./assets/search/searchOffice.json";
  foundationUrl: string = environment.foundationUrl;

  constructor(private adInsService: AdInsServiceService) { }

  ngOnInit() {
    this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
      .subscribe(data => {
        console.log(data);
      }
      )
  }

}
