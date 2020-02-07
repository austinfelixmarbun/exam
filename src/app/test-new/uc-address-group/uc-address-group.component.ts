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

    if (this.default != null) {
      this.setData(this.default);
    }

    // var asd = this.UCAddrForm.controls[this.identifier]['controls'].PhnArea2.dirty;
  }

  setData(data) {
    this.UCAddrForm.patchValue({
      [this.identifier]: {
        Addr: data.Addr,
        AreaCode4: data.AreaCode4,
        AreaCode3: data.AreaCode3,
        AreaCode2: data.AreaCode2,
        AreaCode1: data.AreaCode1,
        City: data.City,
        PhnArea1: data.PhnArea1,
        Phn1: data.Phn1,
        PhnExt1: data.PhnExt1,
        PhnArea2: data.PhnArea2,
        Phn2: data.Phn2,
        PhnExt2: data.PhnExt2,
        PhnArea3: data.PhnArea3,
        Phn3: data.Phn3,
        PhnExt3: data.PhnExt3,
        FaxArea: data.FaxArea,
        Fax: data.Fax
      }
    });
    
  }
}
