export class CriteriaObj{
    propName:string;
    restriction:string;
    value:string;
    low:number;
    high:number;
    DataType:string;

    constructor()
    {
        this.low=0;
        this.high=0;
        this.DataType='Text';
    }

}