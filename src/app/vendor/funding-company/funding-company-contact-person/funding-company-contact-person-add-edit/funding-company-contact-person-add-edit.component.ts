import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { FundingCompanyService } from '../../../funding-company.service';

@Component({
  selector: 'app-funding-company-contact-person-add-edit',
  templateUrl: './funding-company-contact-person-add-edit.component.html',
})
export class FundingCompanyContactPersonAddEditComponent implements OnInit {

  @Input() mode: string;
  @Output() outputValue: EventEmitter<object> = new EventEmitter();
  @Input() formCP: FormGroup;
  @Output() UpdateSource: EventEmitter<object> = new EventEmitter();
  @Input() identifier: string;
  @Input() childForm: FormGroup;

  CPName: string;
  CPEmail: string;
  CPPhone: string;
  response:any;
  IsDetail: boolean = false;


  ngOnInit() {
    this.pageType = this.mode;
    this.childForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.pattern(CommonConstant.regexEmail)]],
      phone1: ['', Validators.required]
    })
  }
  pageType: string;
  constructor(private http: HttpClient, 
    private route: ActivatedRoute,  
    private router: Router,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private childFormService: FundingCompanyService) 
  { 

  }

  GetEvent(event) {
    if (event != undefined && event.Key == "IsDetail") {
      this.IsDetail = event.Value;
    }
  }
  
  
  SaveForm(){
    if (this.childForm.valid) {
      const formValue = this.childForm.value;
      this.outputValue.emit(formValue);
      this.childFormService.addChildFormValue(formValue); 
      console.log("ini isi form CP", formValue);
      this.outputValue.emit({ mode: 'check' });
    }
  }


  back() {
    this.outputValue.emit({ mode: 'check' });
  }

}
