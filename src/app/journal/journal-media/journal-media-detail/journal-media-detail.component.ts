import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';

@Component({
  selector: 'app-journal-media-detail',
  templateUrl: './journal-media-detail.component.html',
  styleUrls: ['./journal-media-detail.component.css']
})
export class JournalMediaDetailComponent implements OnInit {

  mode: string = 'add';
  JrMHeaderId = null;
  JrMediaForm = this.fb.group({
    Subsystem: ['', [Validators.required]],
    TransactionTypeCode: ['', [Validators.required]],
    TransactionDescription: ['', [Validators.required]],
    EntityType: [''],
  });

  IsReady = false;
  HasHeaderFact = false;

  SubsystemDesc = '';

  ddlSubsystemObj: UcDropdownListObj = new UcDropdownListObj();
  listEntityType = [];
  listHeaderFact = [];
  readonly CancelLink: string = ""//NavigationConstant.JOURNAL_MEDIA_PAGING;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: NGXToastrService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params['mode'] != null) {
          this.mode = params['mode'];
        }

        if (params['JrMHeaderId'] != null) {
          this.JrMHeaderId = +params['JrMHeaderId'];
        }
      }
    );

    this.getData();
    this.IsReady = true;

  }

  Submit() {
    let request = {
      SubSystem: this.JrMediaForm.value.Subsystem,
      TrxTypeCode: this.JrMediaForm.value.TransactionTypeCode,
      TrxDesc: this.JrMediaForm.value.TransactionDescription,
      ListJrMEntity: this.listEntityType.map(x => {
        return {
          JrMEntityId: x.JrMEntityId,
          EntityType: x.EntityType
        }
      })
    }

    if (this.mode == 'edit' && this.JrMHeaderId != null) {
      this.http.post<any>(environment.FoundationR3Url + '/Journal/SaveJrMEntity', { ...request, JrMHeaderId: this.JrMHeaderId }).subscribe(
        response => {
          this.toastr.successMessage('Success !');
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.JOURNAL_MEDIA_PAGING], {})
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.http.post<any>(environment.FoundationR3Url + '/Journal/AddJrMHeader', request).subscribe(
        response => {
          this.toastr.successMessage('Success !');
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.JOURNAL_MEDIA_PAGING], {})
        },
        error => {
          console.log(error);
        }
      )
    }

  }

  getData() {
    if (this.mode == 'edit' && this.JrMHeaderId != null) {
      this.http.post<any>(environment.FoundationR3Url + '/Journal/GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId', { JrMHeaderId: this.JrMHeaderId }).subscribe(
        response => {
          this.JrMediaForm.patchValue({
            Subsystem: response.SubSystem,
            TransactionTypeCode: response.TrxTypeCode,
            TransactionDescription: response.TrxDesc,
          });

          this.SubsystemDesc = this.JrMediaForm.value.Subsystem;

          let list = response.ListJrMEntity;
          list.forEach(x => {
            this.listEntityType.push({
              JrMEntityId: x.JrMEntityId,
              EntityType: x.EntityType
            })
          });

          if (response.ListJrMHeaderFact != null) {
            if (response.ListJrMHeaderFact.length > 0) {
              this.HasHeaderFact = true;
            }
          }
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.ddlSubsystemObj = new UcDropdownListObj;
      this.ddlSubsystemObj.apiUrl = URLConstant.GetListRefModuleKeyValue;
      this.ddlSubsystemObj.customKey = 'Value';
    }
  }

  onAdd() {
    let entityType = this.JrMediaForm.value.EntityType;

    if (entityType == null || entityType == '') {
      this.toastr.errorMessage('Cannot add empty entity type');
      return;
    }
    this.listEntityType.push({
      JrMEntityId: undefined,
      EntityType: entityType
    });
    this.JrMediaForm.patchValue({
      EntityType: ''
    })
  }


  onDelete(i) {
    this.listEntityType.splice(i, 1);
  }

}
