import { CriteriaObj } from "../model/CriteriaObj.model";

export class RequestCriteriaObj{
    includeCount:boolean;
    includeData:boolean;
    pageNo:number;
    rowPerPage:number;
    orderBy:any;
    criteria:CriteriaObj[];

    constructor()
    {
        this.includeCount=true;
        this.includeData=true;
    }
}