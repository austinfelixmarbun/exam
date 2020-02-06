import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-dummy1',
  templateUrl: './dummy1.component.html',
  styleUrls: ['./dummy1.component.scss']
})

export class Dummy1Component implements OnInit {

  name = new FormControl('');

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['', [Validators.minLength(4), Validators.maxLength(24)]],
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  profileForm2 = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.minLength(4), Validators.maxLength(24)]],
  });

  // profileForm2 = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl('')
  //   })
  // });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  updateName() {
    this.name.setValue('Nancy');
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm2.value);
    console.warn(this.profileForm2);
  }
}
