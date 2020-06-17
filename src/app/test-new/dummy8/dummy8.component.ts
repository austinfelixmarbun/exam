import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dummy8',
  templateUrl: './dummy8.component.html',
  styleUrls: ['./dummy8.component.css']
})
export class Dummy8Component implements OnInit {

  allpost: any;
  IsOverflow: boolean = false;
  viewObj:string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("dummy 8");
    this.loadInitPost();
    this.viewObj = "./assets/ucviewgeneric/viewAssetType.json";
  }

  loadInitPost() {
    const url = 'http://tlino.96.lt/api/getblogpost';
    this.http.get(url).subscribe(data => {
      console.log(data);
      this.allpost = data[0];
    });
  }

  callback(param : any){
    console.log(param);
  }

}
