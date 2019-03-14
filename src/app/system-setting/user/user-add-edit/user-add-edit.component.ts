import { Http } from '@angular/http';
import { RefUserObj } from './../../../shared/model/RefUserObj.Model';
import { formatDate } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  providers: [NGXToastrService]
})
export class UserAddEditComponent implements OnInit {

  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  parents: string;
  refUserObj: RefUserObj;
  type: string = 'Add';
  EmployeeName: any;
  Username: any;
  Password: any;
  RePassword: any;
  LockedStatus: any;
  IsActive: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private adInsService: AdInsServiceService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private service: NGXToastrService,
    ) {  }


  ngOnInit() {
  }

  Back(): void {
    this.location.back();
  }

  Save(UserAddEditForm: NgForm): void {
    this.spinner.show();
    console.log(UserAddEditForm);

    if (this.type !== 'edit') {

      this.apiUrl = this.foundationUrl + AdInsConstant.AddRefUser;

      this.refUserObj = new RefUserObj();
      this.refUserObj.refEmpId = UserAddEditForm.value.EmployeeName;
      this.refUserObj.username = UserAddEditForm.value.Username;
      this.refUserObj.password = UserAddEditForm.value.Password;
      if (UserAddEditForm.value.IsLocked) { this.refUserObj.isLocked = '1' } else { this.refUserObj.isLocked = '0' };
      if (UserAddEditForm.value.IsActive) { this.refUserObj.isActive = '1' } else { this.refUserObj.isActive = '0' };

      console.log(RefUserObj);

       //SAVE
       this.adInsService.postData(this.apiUrl, this.refUserObj).subscribe(
        (response) => {
          console.log("Success Save");

          this.service.typeSave('Save Successed');
          this.location.back();
          this.spinner.hide();

        },
        (error) => {
          console.log("Error Save");

          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
    else {

  }
}

 FillFormEdit() {
  }
}
