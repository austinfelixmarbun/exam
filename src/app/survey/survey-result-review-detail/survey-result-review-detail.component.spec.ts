import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CookieService } from 'ngx-cookie';
import { SurveyResultReviewDetailComponent } from './survey-result-review-detail.component';

describe('SurveyResultReviewDetailComponent', () => {
  let component: SurveyResultReviewDetailComponent;
  let fixture: ComponentFixture<SurveyResultReviewDetailComponent>;
  let httpSpy, toastrSpy, routeSpy, cookieServiceSpy, fbSpy;

  beforeEach(async () => {
    httpSpy = {
    };
    toastrSpy = {
    };
    routeSpy = {
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
        FormBuilder,
        {provide: Router, useValue: routeSpy},
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
