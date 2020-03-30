import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlContainer, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-uc-input-number',
  templateUrl: './uc-input-number.component.html',
  styleUrls: ['./uc-input-number.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class UcInputNumberComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() identifier: any = "UcInputNumber";
  @Input() ucNumber: string = "";
  @Input() isRequired: boolean = true;
  @Input() enjiForm: NgForm;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log("ucinputnumber");
    this.parentForm.addControl(this.identifier, this.fb.control('', Validators.required));
    this.ucNumber = this.ucNumber.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  CommaFormatted(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.ucNumber) {
      this.ucNumber = this.ucNumber.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  NumberCheck(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
}
