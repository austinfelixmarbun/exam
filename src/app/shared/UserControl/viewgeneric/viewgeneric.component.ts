import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewgeneric',
  templateUrl: './viewgeneric.component.html',
  styleUrls: ['./viewgeneric.component.scss']
})
export class ViewgenericComponent implements OnInit {

  @Input() viewInput: any;
  viewList: any = "";
  mainInfoObj: any = "";
  getList: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {
      this.getList = params;
    });
  }

  ngOnInit() {
    console.log("viewgeneric");
    this.initiateForm();
  }

  initiateForm() {
    this.getJSON(this.viewInput).subscribe(data => {
      console.log(data);
      this.viewList = data;

      this.http.post(this.viewList.mainInfoUrl, this.getList).subscribe(
        (response) => {
          console.log(response);
          this.mainInfoObj = response["returnObject"];
        },
        (error) => {
          console.log(error);
        })
    })
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }
  
  genAction(param) {
    var arrList = {};

    for (var i = 0; i < param.length; i++) {
      arrList[param[i].property] = this.mainInfoObj[param[i].property];
    }
    return arrList;
  }
}
