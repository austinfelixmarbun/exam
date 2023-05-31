import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResGetListVendorContactPersonObj, ResListVendorContactPersonObj } from 'app/shared/model/response/res-get-list-vendor-contact-person-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { FundingCompanyService } from 'app/vendor/funding-company.service';

@Component({
  selector: 'app-funding-company-contact-person',
  templateUrl: './funding-company-contact-person.component.html',
  styleUrls: ['./funding-company-contact-person.component.css']
})
export class FundingCompanyContactPersonComponent implements OnInit {
  modeCP: string;
  VendorContactPersonId: number;
  // VendorId: number;
  @Input() mode: string;
  @Input() VendorId: number;
  @Output() addContactPerson = new EventEmitter<any>();
  @Output() outputValue: EventEmitter<object> = new EventEmitter();
  vendorObj: any;
  resultData: any;
  listVendorCP: Array<ResListVendorContactPersonObj> = [];
  initialListVendorCP: any[] = [];

  objVendor: VendorObj;
  vendorCPObj: GenericObj = new GenericObj();

  BirthDt: Date;
  IdExpiredDt: Date;

  IdCustPersonal: number;

  IdNo: string;
  addUrl: string;
  Gender: string;
  CustName: string;
  GenderDesc: string;
  CustModel: string;
  BirthPlace: string;
  MrIdTypeCode: string;
  CustModelDesc: string;
  MrIdTypeCodeDesc: string;
  MotherMaidenName: string;
  CPFormValues: any[];
  editContactPerson: ResListVendorContactPersonObj;
  From: string;
  vendorContactPersonForm: FormGroup;
  pageType: string;
  VendorCode: string;
  isChange: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder, private toastr: NGXToastrService, private childFormService: FundingCompanyService) {
    this.route.queryParams.subscribe(params => {
      if (params["FundCoyCode"] != null) {
        this.VendorCode = params["FundCoyCode"];
      }
    });

    this.vendorContactPersonForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', Validators.pattern(CommonConstant.regexEmail)],
      Phone1: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.modeCP = "check";
    console.log("mode di CP skrg", this.mode)
    console.log("ini vendor code di contact person", this.VendorCode)
    this.CPFormValues = [];

    this.vendorCPObj.Code = this.VendorCode;

    if(this.mode === 'edit'){
      this.http.post(URLConstant.GetListVendorContactPersonByVendorCode, this.vendorCPObj).subscribe(
        (response: ResGetListVendorContactPersonObj) => {
          this.listVendorCP = response[CommonConstant.ReturnObj];
          // if (this.mode === 'edit') {
          //   this.listVendorCP = this.listVendorCP.concat(this.listVendorCP);
          // } else {
          //   this.listVendorCP.push(...this.listVendorCP);
          // }
          this.listVendorCP = this.listVendorCP.concat(this.childFormService.getChildFormValues());
          this.addContactPerson.emit(this.listVendorCP);
        })
    }
    else{
      this.listVendorCP = this.listVendorCP.concat(this.childFormService.getChildFormValues());
      this.addContactPerson.emit(this.listVendorCP);
    }
    
  }

  back() {
    this.modeCP = "check";
  }

  getValue(ev) {
    this.mode = ev.mode;
    this.vendorContactPersonForm = ev.formValue;
    // this.VendorContactPersonId = ev.VendorContactPersonId;
    console.log(this.mode);
  }

  listAddressType: Array<string> = new Array();
  CheckListToBeEdit(VendorContactPersonId: number): boolean {
    let idx: number = this.CPFormValues.findIndex(x => x.VendorContactPersonId == VendorContactPersonId);
    if (idx >= 0) return true;
    return false;
  }

  editItem(item: any) {
    console.log("ini item name", item.Name);
    // this.editContactPerson = vendorCPObj;
    this.modeCP = "edit";
    if (this.modeCP == "edit") {
      this.VendorContactPersonId = item.VendorContactPersonId
      this.vendorContactPersonForm.patchValue({
        Name: item.Name,
        Phone1: item.Phone1,
        Email: item.Email
      })

    }

    console.log(this.VendorContactPersonId)
  }

  deleteVendorCP(vendorCP: ResListVendorContactPersonObj): void {
    const index = this.listVendorCP.indexOf(vendorCP);
    if (index !== -1) {
      this.listVendorCP.splice(index, 1);
    }
  }

  addCP() {
    this.modeCP = "add";
  }
  // checkForm(){
  //   if (this.vendorContactPersonForm.valid) {
  //     const contactPerson = this.vendorContactPersonForm.value;

  //     if (this.mode === 'edit') {
  //       const index = this.listVendorCP.findIndex(item => item.VendorContactPersonId === contactPerson.VendorContactPersonId);
  //       if (index >= 0) {
  //         // Update existing contact person
  //         this.listVendorCP[index] = contactPerson;
  //       }
  //     }
  //  else {
  //       // Add new contact person
  //       this.CPFormValues.push(contactPerson);
  //     }
  //     this.listVendorCP = this.CPFormValues;
  //     this.childFormService.addChildFormValue(contactPerson); 
  //     console.log(contactPerson);
  //   }
  // }

  SaveForm(): void {
    if (this.vendorContactPersonForm.valid) {
      if (this.modeCP === 'edit') {
        const index = this.listVendorCP.findIndex(item => item.VendorContactPersonId == this.VendorContactPersonId);
        if (index >= 0) {
          // Update existing contact person
          this.listVendorCP[index].Email = this.vendorContactPersonForm.value.Email;
          this.listVendorCP[index].Name = this.vendorContactPersonForm.value.Name;
          this.listVendorCP[index].Phone1 = this.vendorContactPersonForm.value.Phone1;
          // this.childFormService.addChildFormValue(this.listVendorCP);
          console.log("ini list vendor CP sblm di emit", this.listVendorCP)
          this.isChange = true;
          this.addContactPerson.emit(this.listVendorCP);
          this.modeCP = "check";
          this.vendorContactPersonForm.reset();
        }
      }
      else {
        // Add new contact person
        const newContactPerson = {
          VendorContactPersonId: 0,
          Name: this.vendorContactPersonForm.value.Name,
          Email: this.vendorContactPersonForm.value.Email,
          Phone1: this.vendorContactPersonForm.value.Phone1
        };
        this.listVendorCP.push(newContactPerson);
        // this.childFormService.addChildFormValue(this.listVendorCP);
        this.isChange = true;
        this.addContactPerson.emit(this.listVendorCP);
        this.modeCP = "check";
        this.vendorContactPersonForm.reset();
      }

      // this.listVendorCP = this.CPFormValues;

    }
  }

}
