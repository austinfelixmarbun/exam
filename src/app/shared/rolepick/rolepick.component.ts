import { Component, OnInit, AfterViewInit, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CurrentUserContext } from '../model/CurrentUserContext.model';
import { CurrentUserContextService } from '../CurrentUserContext/current-user-context.service';

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
  private router: Router) {
  }

  chooseRole(item){
    console.log(item);
    var currentUserContext = new CurrentUserContext;
    currentUserContext.UserName = localStorage.getItem("Username");
    currentUserContext.Office = item.officeCode;
    currentUserContext.Role = item.roleCode;
    currentUserContext.BusinessDate = item.BusinessDate;
    localStorage.setItem("UserAccess",JSON.stringify(item));
    this.currentUserContextService.addCurrentUserContext(currentUserContext);
    localStorage.setItem("RoleId",item.refRoleId);
    this.router.navigate(['dashboard/dash-board']);
  }

  ngOnInit() {
  }

}
