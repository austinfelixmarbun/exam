import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";


@Injectable()

export class EnviConfigService {
    private appConfig: any;
    constructor(private _http: HttpClient){ }

    loadConfig() {
        // return this._http.get('./assets/enviConfig.json')
        // .toPromise()
        // .then(res => {
        //     this.appConfig = res;
        // });

        let temp = this._http.get('../../../assets/enviConfig.json').subscribe({
            next: (response) => {
                console.log(response);
                this.appConfig = response;
                // use `response`
            },
            error: (error) => {
                // handle HTTP errors
            }
        });;
        return this.appConfig;

        // return firstValueFrom('../../assets/enviConfig.json')
    }

    getConfig() {
        return this.appConfig;
    }
}