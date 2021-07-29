import { KeyValueObj } from "../../KeyValue/KeyValueObj.Model";

export class ResCustListIframeView {
    Title: string;
    Url: string;
    Param: Array<KeyValueObj>;

    constructor() {
        this.Title =  '';
        this.Url =  '';
        this.Param = new Array<KeyValueObj>();
    }
}