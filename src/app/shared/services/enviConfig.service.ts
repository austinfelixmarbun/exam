import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";


@Injectable()

export class EnviConfigService {
    private appConfig: any;
    constructor(private _http: HttpClient){ }

    loadConfig(): Observable<any>{
         this._http.get('../../../assets/enviConfig.json').subscribe({
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
    }

    getConfig() {
        return this.appConfig;
    }
}