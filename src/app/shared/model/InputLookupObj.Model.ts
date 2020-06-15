export class InputLookupObj{
    urlJson: any
    urlQryPaging: any
    urlEnviPaging: any
    _url: any
    nameSelect: any
    idSelect: any
    jsonSelect: any
    addCritInput: any
    isRequired: any
    isReadonly: any
    pagingJson: any
    genericJson: any
    ddlEnvironments:any

    constructor()
    {
        this.jsonSelect = "";
        this.idSelect = "";
        this.nameSelect = "";
        this.addCritInput = null;
        this.isRequired = true;
        this.isReadonly = true;
    }
}