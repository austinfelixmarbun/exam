import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dummy-add',
  templateUrl: './dummy-add.component.html',
  styleUrls: ['./dummy-add.component.scss']
})
export class DummyAddComponent implements OnInit {

  formSetUrl: any = "./assets/form-setting/dummySet.json";
  formSet: any;
  isActive: boolean = false;
  reqCode: boolean = true;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.initiateForm();
  }

  initiateForm() {
    this.getJSON(this.formSetUrl).subscribe(data => {
      console.log(data);
      this.formSet = data;
    })
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }
  
  toggleVisibility(e) {
    this.isActive = e.target.checked;
  }

  SaveDummyForm(ReqForm: NgForm) {
    console.log(ReqForm);
  }
}
