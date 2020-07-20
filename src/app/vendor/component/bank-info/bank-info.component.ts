import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { VendorBankAccObj } from 'app/shared/model/VendorBankAccObj.Model';
import { HttpClient } from '@angular/common/http';
import { VendorService } from 'app/vendor/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss'],
  providers: [VendorService, NGXToastrService]
})
export class BankInfoComponent implements OnInit {
  @Input() objInput: any;
  modal: any;
  closeResult: any;
  inputLookupBankObj: InputLookupObj;
  mode: string = "add";
  VendorBankAcc: VendorBankAccObj = new VendorBankAccObj();
  VendorBankAccId: number;
  ListData: any = new Array();
  BankRegisForm = this.fb.group({
    AccNumber: ['', [Validators.required]],
    AccName: ['', [Validators.required]],
    IsDefault: [false],
    RefBankId: [],
    BankBranchRegCode: [],
  });
  objEdit: any;

  constructor(private toastr: NGXToastrService, private route: ActivatedRoute, private modalService: NgbModal, private fb: FormBuilder, private vendorService: VendorService) { }

  ngOnInit() {
    this.getListData();
    this.setLookup();
  }

  open(content) {
    this.mode = "add";
    this.setLookup();
    this.BankRegisForm.patchValue({
      AccNumber: "",
      AccName: "",
      RefBankId: "",
      IsDefault: false
    });
    this.BankRegisForm.controls.AccNumber.updateValueAndValidity();
    this.BankRegisForm.controls.AccName.updateValueAndValidity();

    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modal.close();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  SaveForm(enjiForm: NgForm) {
    if (this.objInput.Type == "Vendor") {
      if (this.objInput.VendorId == undefined) {
        this.toastr.warningMessage("Please add main data first");
        return false;
      }
      this.VendorBankAcc.VendorId = this.objInput.VendorId;
      this.VendorBankAcc.VendorEmpId = null;
    } else if (this.objInput.Type == "VendorEmployee") {
      if (this.objInput.VendorEmpId == undefined) {
        this.toastr.warningMessage("Please add main data first");
        return false;
      }
      this.VendorBankAcc.VendorId = null;
      this.VendorBankAcc.VendorEmpId = this.objInput.VendorEmpId;
    }
    this.VendorBankAcc.RefBankId = this.BankRegisForm.controls.RefBankId.value
    this.VendorBankAcc.BankAccountNo = this.BankRegisForm.controls.AccNumber.value;
    this.VendorBankAcc.BankAccountName = this.BankRegisForm.controls.AccName.value;
    this.VendorBankAcc.IsDefault = this.BankRegisForm.controls.IsDefault.value;

    if (this.mode == "add") {
      this.VendorBankAcc.VendorBankAccId = 0;
      this.vendorService.AddVendorBankAcc(this.VendorBankAcc).subscribe(
        response => {
          this.getListData();
          this.setLookup();
          this.toastr.successMessage(response["Message"]);
          this.modal.close();
          this.BankRegisForm.patchValue({
            AccNumber: "",
            AccName: "",
            RefBankId: "",
            IsDefault: false
          });
          this.inputLookupBankObj.jsonSelect = { bankName: "" };
          this.BankRegisForm.controls.AccNumber.updateValueAndValidity();
          this.BankRegisForm.controls.AccName.updateValueAndValidity();
          enjiForm.reset();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.VendorBankAcc.VendorBankAccId = this.VendorBankAccId;
      this.VendorBankAcc.RowVersion = this.objEdit.RowVersion;
      this.vendorService.EditVendorBankAcc(this.VendorBankAcc).subscribe(
        response => {
          this.getListData();
          this.setLookup();
          this.toastr.successMessage(response["Message"]);
          this.modal.close();
          this.BankRegisForm.patchValue({
            AccNumber: "",
            AccName: "",
            RefBankId: "",
            IsDefault: false
          });
          this.inputLookupBankObj.jsonSelect = { bankName: "" };
          this.BankRegisForm.controls.AccNumber.updateValueAndValidity();
          this.BankRegisForm.controls.AccName.updateValueAndValidity();
          enjiForm.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  async editBank(id, content) {
    this.mode = "edit";
    this.VendorBankAccId = id;
    await this.vendorService.GetVendorBankAccByVendorBankAccId({VendorBankAccId: this.VendorBankAccId}).toPromise().then(response => {
      this.objEdit = response;
      this.BankRegisForm.patchValue({
        AccNumber: response["BankAccountNo"],
        AccName: response["BankAccountName"],
        RefBankId: response["RefBankId"],
        IsDefault: response["IsDefault"],
        RowVersion: response["RowVersion"]
      });
      this.setLookup();
    })

    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modal.close();
    });
  }

  Back() {
    this.modal.close();
  }

  getLookupBankResponse(e) {
    this.BankRegisForm.patchValue({
      RefBankId: e.refBankId,
      BankBranchRegCode: e.regRptCode
    });
  }

  deleteBank(vendorBankAccId) {
    if (confirm("Are you sure to delete this record?")) {
      this.vendorService.DeleteVendorBankAcc({VendorBankAccId: vendorBankAccId}).subscribe(response => {
        this.toastr.successMessage(response["Message"]);
        this.getListData();
      },
        error => {
          console.log(error);
        });
    }
  }

  getListData() {
    if (this.objInput.Type == "Vendor") {
      if (this.objInput.VendorId != undefined && this.objInput.VendorId != null) {
        this.vendorService.GetListVendorBankAccByVendorId({VendorId: this.objInput.VendorId, VendorEmpId: null}).subscribe(
          response => {
            this.ListData = response[CommonConstant.ReturnObj];
          }
        );
      }
    } else if (this.objInput.Type == "VendorEmployee") {
      if (this.objInput.VendorEmpId != undefined && this.objInput.VendorEmpId != null) {
        this.vendorService.GetListVendorBankAccByVendorEmpId({VendorId: null, VendorEmpId: this.objInput.VendorEmpId}).subscribe(
          response => {
            this.ListData = response[CommonConstant.ReturnObj];
          }
        );
      }
    }
  }

  setLookup() {
    this.inputLookupBankObj = new InputLookupObj();
    this.inputLookupBankObj.urlJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupBankObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupBankObj.pagingJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.genericJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.isRequired = true;

    if (this.objEdit != null && this.mode == "edit") {
      this.inputLookupBankObj.jsonSelect = { bankName: this.objEdit.BankName };
    } else {
      this.inputLookupBankObj.jsonSelect = { bankName: "" };
    }
  }
}
