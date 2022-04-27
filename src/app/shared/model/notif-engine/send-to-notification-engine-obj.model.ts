import { EmailNotificationObj } from "./email-notification-obj.model";
import { PushNotificationObj } from "./push-notification-obj.model";
import { SmsWaNotificationObj } from "./sms-wa-notification-obj.model";

export class SendToNotificationEngineObj {
    NotificationTemplateCode: string;
    MrNotificationLevelCode: string;
    MrNotificationLevelDescr: string;
    MrNotificationSourceCode: string;
    MrNotificationSourceDescr: string;
    MrNotificationTypeCode: string;
    MrNotificationTypeDescr: string;
    SendTo: string;
    Param: Array<string>;
    Version: number;
    EmailNotificationObj: EmailNotificationObj;
    PushNotificationObj: PushNotificationObj;
    SmsWaNotificationObj: SmsWaNotificationObj;

    constructor() {
        this.NotificationTemplateCode = "";
        this.MrNotificationLevelCode = "";
        this.MrNotificationLevelDescr = "";
        this.MrNotificationSourceCode = "";
        this.MrNotificationSourceDescr = "";
        this.MrNotificationTypeCode = "";
        this.MrNotificationTypeDescr = "";
        this.SendTo = "";
        this.Param = new Array<string>();
        this.Version = 0;
        this.EmailNotificationObj = new EmailNotificationObj();
        this.PushNotificationObj = new PushNotificationObj();
        this.SmsWaNotificationObj = new SmsWaNotificationObj();
    }
}
