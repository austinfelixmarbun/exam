import { Component, OnInit, Input, Inject, Renderer2, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { formatDate, DecimalPipe } from '@angular/common';
import 'rxjs/add/operator/map';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { FormEngineModel } from '../model/FormEngineModel.Model';
import { Router } from '@angular/router';
@Component({
    selector: 'form-engine',
    templateUrl: './form-engine.component.html',
    providers: [DecimalPipe]
})
export class FormEngineComponent implements OnInit {
    @Input() _url: string = "./assets/formTest.json";
    @Input() apiQryPaging: string;
    @Input() enviromentUrl: string;
    @Input() arrCritObj: any;
    @Input() addCritInput: CriteriaObj[] = null;
    @Input() afterSaveUrl: any;
    @Output() result: EventEmitter<any> = new EventEmitter();
    
    @Input() mode: any = "add";
    saveObject: Array<Object> = [];
    tempUrl: string;
    urlGet: string;
    server: any;
    components: any;
    itemUrl: any;
    isDataLoaded: boolean = false;
    form: FormGroup;
    payLoad = '';
    countForm = 0;
    formattedAmount = '';
    amount = 0;
    arrCrit: any;
    formEngineModel : FormEngineModel;
    constructor(private router: Router, private http: HttpClient, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
    }

    initiateForm() {
        console.log("Form-engine start")
        this.getJSON(this._url).subscribe(data => {
            console.log(data);
            this.components = data;
            this.urlGet = data.url;
            this.countForm = data.component.length;
            console.log(this.countForm);
            this.isDataLoaded = true;
            var i = 0;
            for (var i = 0; i < this.countForm; i++) {
                for (var j = 0; j < data.component[i].form.length; j++) {
                    //ini kalau datanya di load dari URL
                    if (data.component[i].form[j].isFromURL == true) {
                        var _this = this;
                        var _index = i;
                        //lempar objectnya sekalian sama urlnya, nnti di bind di dalem karena masalah di asyncnya
                        //biar tiap function ada state2nya sendiri
                        this.resolveObject(data.component[i], data.component[i].url);
                    }

                    if (data.component[i].type === "numeric") {
                        data.component[i].value = parseFloat(data.component[i].value).toLocaleString('en');
                    }

                    //pengecekan tanggal
                    if (data.component[i].type === "datepicker") {
                        if (data.component[i].value.includes("BD")) {
                            let businessDate = new Date(JSON.parse(localStorage.getItem("UserContext")).BusinessDate);
                            var operator = data.component[i].value.charAt(2);
                            var dateShow = new Date();
                            if (operator === "-") {
                                var tempMinus = data.component[i].value.split("-", 2);
                                var numDay = parseInt(tempMinus[1]);
                                dateShow.setDate(businessDate.getDate() - numDay);
                            }
                            else if (operator === "+") {
                                var tempMinus = data.component[i].value.split("+", 2);
                                var numDay = parseInt(tempMinus[1]);
                                dateShow.setDate(businessDate.getDate() + numDay);
                            }
                            var dateText = formatDate(dateShow, 'yyyy-MM-dd', 'en-US')
                            data.component[i].value = dateText;
                        }
                    }
                }
            }
            console.log(this.mode);
            if (this.mode == "edit") {
                this.getEditData();
                var url = environment.foundationUrl + AdInsConstant.GetObjectBySQL;
                this.http.post(url, this.formEngineModel).subscribe(
                    (response) => {
                        this.setEditForm(response);
                        console.log(response);
                        console.log(this.components);
                    }
                )
            }
            
        });
    }

    getEditData(){
        var dataToSelect = new Array<Object>();
        var module = this.components.module;
        var tableName = this.components.tableName;
        for(let i = 0 ; i < this.components.component.length; i++){
            for(let j = 0 ; j < this.components.component[i].form.length; j++){
                var data = {"key" : this.components.component[i].form[j].name, "value" : ""};
                dataToSelect.push(data);
            }
        }
        this.formEngineModel = new FormEngineModel();
        this.formEngineModel.Module = module;
        this.formEngineModel.KeyValue = dataToSelect;
        this.formEngineModel.TableName = tableName;
        this.formEngineModel.Where = this.addCritInput;
    }

    setEditForm(returnObject : any) {
        console.log(this.components);
        let doBreak = false;
        for (var k = 0; k < returnObject.returnObject.length; k++) {
            doBreak = false;
            for (var i = 0; i < this.components.component.length; i++) {
                for (var j = 0; j < this.components.component[i].form.length; j++) {
                    if (returnObject.returnObject[k].key == this.components.component[i].form[j].name) {
                        this.components.component[i].form[j].value = returnObject.returnObject[k].value;
                        doBreak = true;
                    }
                    if (doBreak) {
                        break;
                    }
                }
                if (doBreak) {
                    break;
                }
            }
        }
    }

    ngOnInit() {
        this.arrCrit = this.arrCritObj;
        let js = this._renderer2.createElement('script');
        js.text = `
          $(document).ready(function(){
            $("#flip").click(function(){
              $("#panel").slideToggle("slow");
            });
          });
        `;
        this._renderer2.appendChild(this._document.body, js);
        this.initiateForm();
    }

    public getJSON(url: string): Observable<any> {
        return this.http.get(url);
    }

    public postJSON(url: string): Observable<any> {
        return this.http.post(url, null);
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
        console.log("This is Payload:" + this.payLoad);
    }

    Save() {
        // this.saveObject = formEngine.value;
        // console.log(this.saveObject);
        console.log(this.components);
        for(let i = 0 ; i < this.components.component.length; i++)
        {
            for(let j = 0 ; j < this.components.component[i].form.length; j++){
                var keyValue = { "key" : this.components.component[i].form[j].name, "value" : this.components.component[i].form[j].value};
                this.saveObject.push(keyValue);
            }
        }
        var url = environment.foundationUrl;
        if(this.mode == "edit"){
            url += AdInsConstant.UpdateObjectBySQL;
        }
        else
        {
            url += AdInsConstant.AddObjectBySQL;
        }
        console.log(this.saveObject);
        var saveFormModel = new FormEngineModel();
        saveFormModel.KeyValue = this.saveObject;
        saveFormModel.Module = this.components.module;
        saveFormModel.TableName = this.components.tableName;
        saveFormModel.Where = this.addCritInput;
        this.http.post(url, saveFormModel).subscribe(
            (response) => {
                console.log(response);
                this.router.navigateByUrl(this.afterSaveUrl);
            }
        )
    }

    resolveObject(obj: any, url: string) {
        const val = this.postJSON(this.enviromentUrl + url);
        val.subscribe(tempData => {
            obj.itemsUrl = tempData.returnObject;
        });
    }

    transformAmount(element: any) {

        this.formattedAmount = parseFloat(element.target.value).toLocaleString('en');
        // Remove or comment this line if you dont want
        // to show the formatted amount in the textbox.
        element.target.value = this.formattedAmount;
    }

    transformToDecimal(element: any) {
        element.target.value = parseFloat(element.target.value.toString().replace(/,/g, ''));
    }
    cancel(){
        this.router.navigateByUrl(this.afterSaveUrl);
    }
}
