import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnviObj } from 'app/shared/model/UcPagingObj.Model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-uc-view',
  templateUrl: './uc-view.component.html',
  styleUrls: ['./uc-view.component.scss']
})
export class UcViewComponent implements OnInit {

  @Input() viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  @Output() callback: EventEmitter<any> = new EventEmitter();
  viewList: any = "";
  getList: any;
  viewInfoObjList: any;
  isReady: boolean = false;

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
    this.getJSON(this.viewGenericObj.viewInput).subscribe(data => {
      this.viewList = data;
      this.viewInfoObjList = [];

      for (var j = 0; j < this.viewList.subsection.length; j++) {
        this.viewInfoObjList.push(j);
      }

      for (let i = 0; i < this.viewList.subsection.length; i++) {
        if (this.viewList.subsection[i].querystring != null) {
          var queryObj: any;
          if (this.viewGenericObj.whereValue.length == 0) {
            this.viewList.subsection[i].querystring.whereQuery = (<any>Object).values(this.getList);
          } else {
            this.viewList.subsection[i].querystring.whereQuery = this.viewGenericObj.whereValue;
          }

          if (this.viewList.subsection[i].mainInfoPath != undefined && this.viewList.subsection[i].mainInfoPath != "") {
            if (this.viewGenericObj.viewEnvironment != undefined && this.viewGenericObj.viewEnvironment != "") {
              this.viewList.subsection[i].fullpath = this.viewGenericObj.viewEnvironment + this.viewList.subsection[i].mainInfoPath;
            } else {
              this.viewList.subsection[i].fullpath = this.viewList.subsection[i].mainInfoUrl;
            }
          } else {
            this.viewList.subsection[i].fullpath = this.viewList.subsection[i].mainInfoUrl;
          }

          queryObj = {
            querystring: this.viewList.subsection[i].querystring
          }
          this.http.post(this.viewList.subsection[i].fullpath, queryObj).subscribe(
            (response) => {
              this.viewInfoObjList[i] = response["Data"][0];

              for (var y = 0; y < this.viewList.subsection[i].mainInfo.length; y++) {
                if (this.viewList.subsection[i].mainInfo[y].propertyList != undefined && this.viewList.subsection[i].mainInfo[y].propertyList.length != 0) {
                  const propertyList = this.viewList.subsection[i].mainInfo[y].propertyList;
                  let concat = "";
                  for (let z = 0; z < propertyList.length; z++) {
                    concat = concat + propertyList[z].prefix + this.viewInfoObjList[i][propertyList[z].property] + propertyList[z].suffix;
                  }
                  this.viewList.subsection[i].mainInfo[y].concat = concat;
                }

                if (this.viewList.subsection[i].mainInfo[y].type == "link"
                  && this.viewGenericObj.ddlEnvironments != undefined && this.viewGenericObj.ddlEnvironments.length != 0) {
                  for (let z = 0; z < this.viewGenericObj.ddlEnvironments.length; z++) {
                    if (this.viewList.subsection[i].mainInfo[y].name == this.viewGenericObj.ddlEnvironments[z].name) {
                      this.viewList.subsection[i].mainInfo[y].isFullpath = true;
                      this.viewList.subsection[i].mainInfo[y].fullpath = this.viewGenericObj.ddlEnvironments[z].environment + this.viewList.subsection[i].mainInfo[y].path;
                      break;
                    }
                  }
                } else if (this.viewList.subsection[i].mainInfo[y].type == "link") {
                  this.viewList.subsection[i].mainInfo[y].isFullpath = false;
                  this.viewList.subsection[i].mainInfo[y].fullpath = this.viewList.subsection[i].mainInfo[y].path;
                }
              }
              this.isReady = true;
            },
            (error) => {
              console.log(error);
            });
        } else {
          if (this.viewList.subsection[i].mainInfoPath != undefined && this.viewList.subsection[i].mainInfoPath != "") {
            if (this.viewGenericObj.viewEnvironment != undefined && this.viewGenericObj.viewEnvironment != "") {
              this.viewList.subsection[i].fullpath = this.viewGenericObj.viewEnvironment + this.viewList.subsection[i].mainInfoPath;
            } else {
              this.viewList.subsection[i].fullpath = this.viewList.subsection[i].mainInfoUrl;
            }
          } else {
            this.viewList.subsection[i].fullpath = this.viewList.subsection[i].mainInfoUrl;
          }

          this.http.post(this.viewList.subsection[i].fullpath, this.getList).subscribe(
            (response) => {
              this.viewInfoObjList[i] = response["Data"];
            },
            (error) => {
              console.log(error);
            })
        }
      }
    })
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  genAction(viewObj, param) {
    var arrList = {};

    for (var i = 0; i < param.length; i++) {
      if (viewObj[param[i].type] != undefined || viewObj[param[i].property] != undefined) {
        arrList[param[i].type] = viewObj[param[i].property];
      } else {
        arrList[param[i].type] = param[i].property;
      }
    }
    return arrList;
  }

  redirectFullPath(fullpath: string, param: Object, target: string) {
    let queryParam = "";
    const ListObj = Object.keys(param);
    for (let i = 0; i < ListObj.length; i++) {
      if (queryParam != "") {
        queryParam = queryParam + "&" + ListObj[i] + "=" + param[ListObj[i]];
      } else {
        queryParam = ListObj[i] + "=" + param[ListObj[i]];
      }
    }
    window.open(fullpath + "?" + queryParam, target);
  }

  callbackFunction(item, key: string = "") {
    var CBObj = {
      ViewObj: item,
      Key: key
    }
    this.callback.emit(CBObj);
  }
}
