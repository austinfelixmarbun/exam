export class ResendAllNotificationObj {
    ListStrIdSms: Array<string> = new Array<string>();
    ListStrIdWa: Array<string> = new Array<string>();
    ListStrIdPushNotif: Array<string> = new Array<string>();
    ListStrIdEmail: Array<string> = new Array<string>();

    constructor(){
        this.ListStrIdSms = new Array<string>();
        this.ListStrIdWa = new Array<string>();
        this.ListStrIdPushNotif = new Array<string>();
        this.ListStrIdEmail = new Array<string>();
    }
}
