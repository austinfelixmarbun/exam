export class ResponseIdGenericObj {
    Id : number;
    RowVersion: string;
    constructor(){
        this.Id = 0;
        this.RowVersion = "";
    }
}

export class ResponseGenericIdAndCodeObj {
    Id : number;
    Code : string;
    RowVersion: string;
    constructor(){
        this.Id = 0;
        this.Code = "";
        this.RowVersion = "";
    }
}