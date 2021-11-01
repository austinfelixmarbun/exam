import { CriteriaObj } from "./CriteriaObj.Model";

export class FormEngineModel{
    Module:string;
    KeyValue:Array<Object>;
    TableName:string;
    Where:CriteriaObj[];

    constructor()
    {
    }
}