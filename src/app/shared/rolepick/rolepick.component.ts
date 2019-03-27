import { Component, OnInit, AfterViewInit, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CurrentUserContext } from '../model/CurrentUserContext.model';
import { CurrentUserContextService } from '../CurrentUserContext/current-user-context.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from '../AdInstConstant';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rolepick',
  templateUrl: './rolepick.component.html',
  styleUrls: ['./rolepick.component.scss']
})
export class RolepickComponent implements OnInit, AfterViewInit {

  
  ngAfterViewInit(): void {
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
  private currentUserContextService: CurrentUserContextService,
  private http: HttpClient,
  private router: Router) {
  }

  chooseRole(item){
    console.log(item);
    var url = environment.foundationUrl + AdInsConstant.GetAllActiveRefFormByRefRoleId;
    var roleObject = {RefRoleId:item.refRoleId};
    this.http.post(url,roleObject).subscribe(
      (response) => {
        localStorage.setItem("Menu",JSON.stringify(response["returnObject"]));
        var currentUserContext = new CurrentUserContext;
        currentUserContext.UserName = localStorage.getItem("Username");
        currentUserContext.Office = item.officeCode;
        currentUserContext.Role = item.roleCode;
        currentUserContext.BusinessDate = item.businessDt;
        var dateParse = formatDate(item.businessDt, 'yyyy-MM-dd', 'en-US');
        localStorage.setItem("BusinessDate",dateParse);
        localStorage.setItem("UserAccess",JSON.stringify(item));
        this.currentUserContextService.addCurrentUserContext(currentUserContext);
        localStorage.setItem("RoleId",item.refRoleId);
        this.router.navigate(['dashboard/dash-board']);
      },
      (error) =>{
        console.log(error);
      }
    )
    
  }

  ngOnInit() {
  }

}
