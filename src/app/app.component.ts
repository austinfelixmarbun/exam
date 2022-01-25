import { Component, OnInit } from '@angular/core';
// import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AdInsConstant } from './shared/AdInstConstant';
import { environment } from 'environments/environment';
// import * as signalR from '@aspnet/signalr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


    private _hubConnection: HubConnection;
    //TEST PUSH MASTER 5
    constructor() { }
 
    ngOnInit(): void {
        Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
        const appVersion = require('../../package.json').version;
        localStorage.setItem("Version", appVersion);
        //this._hubConnection = new HubConnectionBuilder().withUrl(environment.FoundationR3Url+"/NotificationHub").build();
        // this._hubConnection
        //     .start()
        //     .then(() => console.log('Connection started!'))
        //     .catch(err => console.log('Error while establishing connection :('));

        // this._hubConnection.on('BroadcastMessage', (type: string, payload: string, user: string) => {
        //     var currentUser = JSON.parse(AdInsHelper.GetCookie(this.cookieService, 'UserAccess'));
        //     var userId = currentUser['refUserId'].toString();
        //     if (userId == user) {
        //         this.msgs.push({ severity: type, summary: payload });
        //     }
        // });
        // this._hubConnection.on('SendPrivateMessage', (user: string, message: string, payload: string) => {
        //     console.log(user)
        //     console.log(message)
        // });
        // this._hubConnection.on('SendMessageToClient', (title, user, message) => {
        //     const received = `title: ${title}, name: ${user}, message: ${message}`;
        //     console.log(received);
        // });
    }
}