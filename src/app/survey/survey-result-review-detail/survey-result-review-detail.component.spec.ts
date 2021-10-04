import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CookieService } from 'ngx-cookie';
import { SurveyResultReviewDetailComponent } from './survey-result-review-detail.component';

describe('SurveyResultReviewDetailComponent', () => {
  let component: SurveyResultReviewDetailComponent;
  let fixture: ComponentFixture<SurveyResultReviewDetailComponent>;
  let httpSpy, toastrSpy, routeSpy, cookieServiceSpy, fbSpy, routerSpy;

  beforeEach(async () => {
    httpSpy = {
      // post: (url: string, body: any | null, options?: { headers?: HttpHeaders | { [header: string]: string | string[]; };
      //   observe?: 'body';
      //   params?: HttpParams | { [param: string]: string | string[]; };
      //   reportProgress?: boolean;
      //   responseType?: 'json';
      //   withCredentials?: boolean;
      // }) => {
      //   let response: Object;
      //   if (url === URLConstant.GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview) {
      //       response = MockResponseRefMasterSurveyor;
      //   } else if (url === URLConstant.GetSurveyorBySurveyorId) {
      //     response = {
      //       SurveyorId: 1,
      //       SurveyorNo: 'SVY01',
      //       CenterGrpId: 34,
      //       RefUserId: 46,
      //       VendorId: 1,
      //       MrSurveyorTypeCode: 'EXTERNAL_SURVEYOR',
      //       WorkloadAmt: 10,
      //       CurrWorkloadAmt: 5,
      //       IsActive: 1
      //     };
      //   } else if (url === URLConstant.AddSurveyor) {
      //       response = {
      //           message: 'Success'
      //         };
      //   }else if (url === URLConstant.EditSurveyor) {
      //       response = {
      //           message: 'Success'
      //         };
      //   }
      //   return of(response);
      // }
    };
    toastrSpy = {
    };
    routerSpy = {
      navigate: (commands: any[], extras?: NavigationExtras) => {
        return new Promise<boolean>(resolve => resolve(true));
      }
    };
    cookieServiceSpy = {
    };
    fbSpy = new FormBuilder();

    const conf = TestBed.configureTestingModule({
      declarations: [SurveyResultReviewDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: HttpClient, useValue: httpSpy},
        {provide: NGXToastrService, useValue: toastrSpy},
        {provide: FormBuilder, useValue: fbSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: CookieService, useValue: cookieServiceSpy}
      ]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyResultReviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('should be created', function () {
    expect(component).toBeTruthy();
  });

  it('should be initialized', async () => {
    await component.ngOnInit();
    expect(component).toBeTruthy();
  });

});
