export class RefNotifAttrTemplateObj {
    RefNotifAttrTemplateId: number;
    NotifAttrTemplaceCode: string;
    NotifAttrTemplaceDescr: string;
    AttrInputTypeCode: string;
    AttrInputTypeDescr: string;
    DefaultValue: string;
    IsActive: boolean;

    constructor(){
        this.RefNotifAttrTemplateId = 0;
        this.NotifAttrTemplaceCode = "";
        this.NotifAttrTemplaceDescr = "";
        this.AttrInputTypeCode = "";
        this.AttrInputTypeDescr = "";
        this.DefaultValue = "";
    }
}
