import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolepickComponent } from './rolepick.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from '../AdInstConstant';

@Injectable()
export class RolePickService {
    constructor(public dialog: MatDialog,private http:HttpClient) { }
    openDialog(data): void {
        console.log("Get User Title Role");
        var url = environment.foundationUrl + AdInsConstant.GetListDataCurrentUser;
        var user = {Username:localStorage.getItem("Username")};
        this.http.post(url,user).subscribe(
            (response) => {
                console.log(response);
                const dialogRef = this.dialog.open(RolepickComponent, {
                    id:'role-modal',
                    width: '85%',
                    position: {
                    top: '12px'},
                    data: response["returnObject"]
                });

                dialogRef.afterClosed().subscribe(result => {
                    console.log('The dialog was closed');
                });
            },
            (error) => {
                console.log(error);
            }
        );
        //console.log(data)
        

        
    }

    closeDialog(){
        this.dialog.closeAll;
    }
}