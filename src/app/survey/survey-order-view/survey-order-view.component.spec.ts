import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { SurveyOrderViewComponent } from './survey-order-view.component';

describe('SurveyOrderViewComponent', () => {
  let component: SurveyOrderViewComponent;
  let fixture: ComponentFixture<SurveyOrderViewComponent>;
  let httpSpy, routeSpy;

  beforeEach(async () => {
    httpSpy = {
      post: (url: string, body: any | null, options?: {
        headers?: HttpHeaders | { [header: string]: string | string[]; };
        observe?: 'body';
        params?: HttpParams | { [param: string]: string | string[]; };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
      }) => {
        let response: Object;
        if (url == URLConstant.GetListSrvyTaskBySrvyOrderId) {
          response = {
              Addr: '',
              City: '',
              AssignDt: '',
              CustAddr: '',
              CustName: '',
              CustNo: '',
              CustPhone: '',
              IsAddtReq: '',
              Kecamatan: '',
              Kelurahan: '',
              MobileAssignmentId: '',
              MrCustModelCode: '',
              MrSrvyObjTypeCode: '',
              MrSurveyTaskStatCode: '',
              MrSurveyTypeCode: '',
              Notes: '',
              PrevSurveyorId: '',
              PrevSurveyTaskNo: '',
              RefNo: '',
              RefReasonId: '',
              ResultDt: '',
              Result: '',
              RetrieveDt: '',
              ReviewByRefUserId: '',
              ReviewDt: '',
              ReviewNotes: '',
              RT: '',
              RW: '',
              SrvyFormSchmId: '',
              SrvyOrderId: '',
              SrvyTaskId: '',
              SrvyTaskNo: '',
              SurveyorId: '',
              Zipcode: ''
          }
        }
      }
    };
    routeSpy = {
      navigate: (commands: any[], extras?: NavigationExtras) => {
        return new Promise<boolean>(resolve => resolve(true));
      }
    };

    const conf = TestBed.configureTestingModule({
      declarations: [SurveyOrderViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: ActivatedRoute, useValue: routeSpy }
      ]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyOrderViewComponent);
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
