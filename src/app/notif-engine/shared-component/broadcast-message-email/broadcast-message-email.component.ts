import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import Quill from 'quill';
import QuillImageDropAndPaste, { ImageData as QuillImageData } from 'quill-image-drop-and-paste';
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { HttpClient } from '@angular/common/http';
import { SendToNotificationEngineObj } from 'app/shared/model/notif-engine/send-to-notification-engine-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface IImageMeta {
  type: string;
  dataUrl: string;
  blobUrl: SafeUrl;
  file: File | null;
}
@Component({
  selector: 'app-broadcast-message-email',
  templateUrl: './broadcast-message-email.component.html',
  styleUrls: ['./broadcast-message-email.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BroadcastMessageEmailComponent implements OnInit, OnDestroy {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() IsUsedTemplate: boolean = false;
  @Input() IsResend: boolean = false;
  @Input() SendToNotificationEngineSaveObj: SendToNotificationEngineObj = new SendToNotificationEngineObj();
  @Output() SendEmailSuccess: EventEmitter<boolean> = new EventEmitter();
  readonly title: string = "Broadcast Email";

  readonly QuilConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button
    ],
    // placeholder: 'Input Message...',
    // theme: 'snow',
  };

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private UrlConstantNew: UrlConstantNew, private cookieService: CookieService, private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit(): void {
    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
    this.CustomPatternEmailShowErrorMessage();
    this.GetGeneralSettingFileFormat();
    this.GetGeneralSettingFileMaxSize();
    const SendToControl = this.parentForm.get("SendTo");
    if (!SendToControl) {
      this.parentForm.addControl("SendTo", this.fb.control(""));
    }
    const BodyControl = this.parentForm.get("Body");
    if (!BodyControl) {
      this.parentForm.addControl("Body", this.fb.control(""));
    }
  }

  formatsAllowed: string = '.jpg,.png,.pdf,.docx,.txt,.gif,.jpeg';
  GetGeneralSettingFileFormat() {
    this.http.post(this.UrlConstantNew.GetEmailAttachmentAllowedFileFormat, { code: CommonConstant.GsCodeEmailAttachmentFormat }).subscribe(
      (response: string) => {
        this.formatsAllowed = response;
      });
  }

  // maxSize in MB
  maxSize: number = 10;
  GetGeneralSettingFileMaxSize() {
    this.http.post(this.UrlConstantNew.GetEmailAttachmentMaxFileSize, { code: CommonConstant.GsCodeEmailAttachmentMaxSize }).subscribe(
      (response: string) => {
        this.maxSize = +response;
      });
  }

  EmailCustomPattern: Array<CustomPatternObj> = new Array();
  CustomPatternEmailShowErrorMessage(){
    this.EmailCustomPattern.push({ pattern: CommonConstant.regexMultipleEmail, invalidMsg: "Please enter a valid email" });
  }

  ngOnDestroy(): void {
    this.selectedFiles = [];
    this.notAllowedList = [];
    this.maxSize = 10;
    this.formatsAllowed = '.jpg,.png,.pdf,.docx,.txt,.gif,.jpeg';
  }

  selectedFiles: File[] = [];
  notAllowedList: File[] = [];
  FileAttachmentChange(event: Event) {
    // ITERATE SELECTED FILES
    let target: HTMLInputElement = event.target as HTMLInputElement;
    let srcElement: HTMLInputElement = event.srcElement as HTMLInputElement;
    let file: FileList = target.files || srcElement.files;
    // console.log("type: change");
    // if (event.type == 'drop') {
    //   file = event.dataTransfer.files;
    //   // console.log("type: drop");
    // }
    // console.log(file);
    let reg: RegExp = /(?:\.([^.]+))?$/;
    
    //#region Init for CheckFileFormat
    let listFormatsAllowed: Array<string> = this.formatsAllowed.split('.');
    //#endregion

    // FORMATS ALLOWED LIST
    for (let i = 0; i < file.length; i++) {
      // CHECK FORMAT
      const fileData: File = file[i];
      // CURRENT FILE EXTENSION
      const execReq = reg.exec(fileData.name);
      const currentFileExt = execReq[1];
      let frmtAllowed = this.CheckFileFormat(currentFileExt, listFormatsAllowed);
      this.SetSelectedFiles(frmtAllowed, fileData);
    }
  }

  // true => Total Size Valid 
  get CheckTotalSizeFileIsValid() {
    let totalSize: Number = this.GetTotalSizeFile;
    let maxSize: number = this.MaxSizeFile;
    return totalSize < maxSize;
  }

  // true => Format Allowed
  // false => Format Not Allowed
  private CheckFileFormat(currentFileExt: string, listFormatsAllowed: Array<string>): boolean{
    // FORMAT ALLOWED LIST ITERATE
    for (let j = listFormatsAllowed.length-1; j > 0; j--) {
      let ext: string = listFormatsAllowed[j];
      if (!ext) continue;
      if (currentFileExt.toLowerCase() == ext.split(',')[0]) {
        return true;
      }
    }

    return false;
  }

  private SetSelectedFiles(frmtAllowed: boolean, fileData: File){
    if (!frmtAllowed) {
      // FORMAT NOT ALLOWED
      this.notAllowedList.push(fileData);
      return;
    } 
    this.selectedFiles.push(fileData);
  }

  get GetTotalSizeFile(): number {
    let size = 0;
    this.selectedFiles.forEach(x => size += x.size);
    this.notAllowedList.forEach(x => size += x.size);
    return size;
  }

  async SendEmail() {
    this.ValidateUploadFileAttachment();

    this.spinner.show();
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    let selectedFiles: File[] = this.selectedFiles;
    for (let i = 0; i < selectedFiles.length; i++) {
      // Add DATA TO BE SENT
      formData.append("Files", selectedFiles[i] as Blob);
    }

    // #region xhr response api
    xhr.onreadystatechange = async evnt => {
      // Api Response ready
      if (xhr.readyState === 4) {
        this.spinner.hide();
        var response = JSON.parse(xhr.response);
        if (xhr.status !== 200 && xhr.status !== 201) {
          throw this.toastr.warningMessage(response['Message']);
        }
        
        if (response.HeaderObj.StatusCode == '200') {
          this.toastr.successMessage(response['Message']);
          this.SendEmailSuccess.emit();
        }
      }
    };

    xhr.upload.onprogress = evnt => {
      // this.uploadBtn = false; // button should be disabled by process uploading
      if (evnt.lengthComputable) {
        // this.percentComplete = Math.round((evnt.loaded / evnt.total) * 100);
      }
      // console.log("Progress..."/*+this.percentComplete+" %"*/);
    };

    xhr.onload = evnt => {
    };

    xhr.onerror = evnt => {
      console.log("onerror");
      console.log(evnt);
    };
    // #endregion

    let url = this.UrlConstantNew.MultipleSendToNotificationEngineEmail;
    if(this.IsResend) url = this.UrlConstantNew.ResendToNotificationEngineEmail;
    xhr.open('POST', url, true);
    let token = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);
    xhr.setRequestHeader('AdInsKey', `${token}`);

    //#region set object request
    Object.keys(this.SendToNotificationEngineSaveObj).forEach(key => {
      if (key != "KeyValParam") formData.append(key, this.SendToNotificationEngineSaveObj[key]);
    });
    for (let key in this.SendToNotificationEngineSaveObj.KeyValParam) {
      let KeyValParam = this.SendToNotificationEngineSaveObj.KeyValParam[key];
      formData.append("KeyValParam[" + key + "]", KeyValParam);
    }
    // set to EmailNotificationObj
    Object.keys(this.SendToNotificationEngineSaveObj.EmailNotificationObj).forEach(key => {
      formData.append("EmailNotificationObj." + key, this.SendToNotificationEngineSaveObj.EmailNotificationObj[key]);
    });
    //#endregion

    await xhr.send(formData);
  }

  private ValidateUploadFileAttachment(): void {
    if (this.notAllowedList.length > 0) {
      throw this.toastr.warningMessage("Delete All Invalid File");
    }
    if (!this.CheckTotalSizeFileIsValid) {
      let maxSize: string = this.convertSize(this.MaxSizeFile);
      throw this.toastr.warningMessage("Total Attachments' size can not be more than " + maxSize);
    }
  }

  get MaxSizeFile(): number {
    return this.maxSize * 1024000;
  }

  convertSize(fileSize: number) {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }

  readonly removeFileSelected: string = "sf";
  readonly removeFileNotSelected: string = "na";
  removeFile(idx: number, type: string) {
    switch(type){
      case this.removeFileSelected:
        this.selectedFiles.splice(idx, 1);
        break;
      case this.removeFileNotSelected:
        this.notAllowedList.splice(idx, 1);
        break;
    }
  }
}
