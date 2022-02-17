import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()

export class UrlConstantService {
    private urlConstant: any;
    constructor(private _http: HttpClient){ }

    loadConfig(): Observable<any> {
        let temp = this._http.get('../../../assets/urlConstant.json').subscribe({
            next: (response) => {
                console.log(response);
                this.urlConstant = response;
                // use `response`
            },
            error: (error) => {
                // handle HTTP errors
            }
        });;
        return this.urlConstant;
    }

    getConfig() {
        return this.urlConstant;
    }
}