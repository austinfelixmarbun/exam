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

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss'],
  providers: [VendorService, NGXToastrService]
})
export class BankInfoComponent implements OnInit {
  title: any;
  @Input() objInput: any;
  modal: any;
  closeResult: any;
  inputLookupBankObj: InputLookupObj;
  mode: any = "add";
  VendorBankAcc: any;
  VendorBankAccId: any;
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
    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.mode = params["mode"];
      }
    });

    var obj = {
      VendorId: this.objInput.VendorId
    }

    this.vendorService.GetListVendorBankAccIdByVendorId(obj).subscribe(
      response => {
        this.ListData = response["ReturnObject"];
      }
    );

    this.inputLookupBankObj = new InputLookupObj();
    this.inputLookupBankObj.urlJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupBankObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupBankObj.pagingJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.genericJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.isRequired = true;
  }

  open(content) {
    this.BankRegisForm.patchValue({
      AccNumber: "",
      AccName: "",
      RefBankId: "",
      IsDefault: false
    });
    this.inputLookupBankObj.jsonSelect = { bankName: "" };
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

  SaveForm(enjiForm:NgForm) {
    if (this.mode == "add") {
      this.VendorBankAcc = new VendorBankAccObj();
      this.VendorBankAcc.VendorId = this.objInput.VendorId;
      this.VendorBankAcc.RefBankId = this.BankRegisForm.controls.RefBankId.value
      this.VendorBankAcc.BankAccountNo = this.BankRegisForm.controls.AccNumber.value;
      this.VendorBankAcc.BankAccountName = this.BankRegisForm.controls.AccName.value;
      this.VendorBankAcc.IsDefault = this.BankRegisForm.controls.IsDefault.value;
      this.vendorService.AddVendorBankAcc(this.VendorBankAcc).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.modal.close();

          var obj = {
            VendorId: this.objInput.VendorId
          }
          this.vendorService.GetListVendorBankAccIdByVendorId(obj).subscribe(
            response => {
              this.ListData = response["ReturnObject"];
            }
          );

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
      this.VendorBankAcc = this.objEdit;
      this.VendorBankAcc.RefBankId = this.BankRegisForm.controls.RefBankId.value
      this.VendorBankAcc.BankAccountNo = this.BankRegisForm.controls.AccNumber.value;
      this.VendorBankAcc.BankAccountName = this.BankRegisForm.controls.AccName.value;
      this.VendorBankAcc.IsDefault = this.BankRegisForm.controls.IsDefault.value;
      this.VendorBankAcc.VendorId = this.objInput.VendorId;
      this.VendorBankAcc.VendorBankAccId = this.VendorBankAccId;
      this.VendorBankAcc.RowVersion = this.objEdit.RowVersion;
      this.vendorService.EditVendorBankAcc(this.VendorBankAcc).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.modal.close();
          var obj = {
            VendorId: this.objInput.VendorId
          };
          this.vendorService.GetListVendorBankAccIdByVendorId(obj).subscribe(
            response => {
              this.ListData = response["ReturnObject"];
            }
          );
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

    this.mode = "add";
  }

  async editBank(id, content) {
    this.mode = "edit";
    this.VendorBankAccId = id;
    var obj = {
      VendorBankAccId: this.VendorBankAccId
    };
    await this.vendorService.GetVendorBankAccByVendorBankAccId(obj).toPromise().then(response => {
      this.objEdit = response;
      this.BankRegisForm.patchValue({
        AccNumber: response["BankAccountNo"],
        AccName: response["BankAccountName"],
        RefBankId: response["RefBankId"],
        IsDefault: response["IsDefault"],
        RowVersion: response["RowVersion"]
      });
      this.inputLookupBankObj.jsonSelect = { bankName: this.objEdit.BankName };
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
      var obj = {
        VendorBankAccId: vendorBankAccId
      };

      this.vendorService.DeleteVendorBankAcc(obj).subscribe(response => {
        this.toastr.successMessage(response["Message"]);
        var obj = {
          VendorId: this.objInput.VendorId
        };
        this.vendorService.GetListVendorBankAccIdByVendorId(obj).subscribe(
          response => {
            this.ListData = response["ReturnObject"];
          }
        );
      },
        error => {
          console.log(error);
        });
    }
  }
}
