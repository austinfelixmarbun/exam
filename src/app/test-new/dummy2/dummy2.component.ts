import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dummy2',
  templateUrl: './dummy2.component.html',
  styleUrls: ['./dummy2.component.scss']
})
export class Dummy2Component implements OnInit {

  // @ViewChild(UcAddressGroupComponent) VcUcAddrGrp;
  // @ViewChild('UcAddrGrp') VcUcAddrGrp : UcAddressGroupComponent;

  defVal: any;
  modal: any;
  closeResult: any;
  UcNumber: any;
  UcNumber2: any;
  UcNumber3: any;

  RefEmpForm = this.fb.group({
    EmpNo: ['', Validators.required],
    EmpName: ['', Validators.required],
    JoinDt: ['', Validators.required],
    IsExt: [false],
    IsActive: [true],
    IdNo: [''],
    UCNumber: [''],
    UCNumber2: [''],
    Npwp: ['', [Validators.minLength(4), Validators.maxLength(10)]]
  });

  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.RefEmpForm);
  }

  SaveForm(asd) {
    console.log(this.RefEmpForm.valid);
    console.log(this.RefEmpForm.value);
  }

  CommaFormatted(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.UcNumber) {
      this.UcNumber = this.UcNumber.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  numberCheck(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }

  enterTrigger() {
    console.log("ENTER");
  }

  nextClicked() {
    // this.wizard.goToNextStep();
  }

  openModal(content) {
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
}
