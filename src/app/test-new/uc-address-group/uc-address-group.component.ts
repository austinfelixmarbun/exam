import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormGroupDirective, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-uc-address-group',
  templateUrl: './uc-address-group.component.html',
  styleUrls: ['./uc-address-group.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class UcAddressGroupComponent implements OnInit {

  @Input() UCAddrForm: FormGroup;
  @Input() enjiForm: NgForm;
  @Input() identifier: any;
  @Input() default: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log("UcAddressForm");
    this.UCAddrForm.addControl(this.identifier, this.fb.group({
      Addr: ['', Validators.required],
      AreaCode4: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(3)]],
      AreaCode3: ['', Validators.required],
      AreaCode2: ['', Validators.required],
      AreaCode1: ['', Validators.required],
      City: ['', Validators.required],
      PhnArea1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      Phn1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      PhnExt1: ['', Validators.pattern("^[0-9]+$")],
      PhnArea2: ['', Validators.pattern("^[0-9]+$")],
      Phn2: ['', Validators.pattern("^[0-9]+$")],
      PhnExt2: ['', Validators.pattern("^[0-9]+$")],
      PhnArea3: ['', Validators.pattern("^[0-9]+$")],
      Phn3: ['', Validators.pattern("^[0-9]+$")],
      PhnExt3: ['', Validators.pattern("^[0-9]+$")],
      FaxArea: ['', Validators.pattern("^[0-9]+$")],
      Fax: ['', Validators.pattern("^[0-9]+$")]
    }));
  }
}
