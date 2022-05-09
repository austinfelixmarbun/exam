export class SmsWaNotificationObj {
    SendFrom: string;
    Body: string;
    IsWa : boolean;

    constructor() {
        this.SendFrom = "";
        this.Body = "";
        this.IsWa = false;
    }
}
