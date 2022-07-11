import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import Quill from 'quill';
import QuillImageDropAndPaste, { ImageData as QuillImageData } from 'quill-image-drop-and-paste';
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { HttpClient } from '@angular/common/http';

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
  @Output() FileUploadSuccess: EventEmitter<any> = new EventEmitter;
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

      ['image', 'video']                         // link and image, video
    ],
    imageDropAndPaste: {
      handler: this.imageHandler.bind(this),
    },
    // placeholder: 'Input Message...',
    // theme: 'snow',
  };

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private UrlConstantNew: UrlConstantNew, private cookieService: CookieService, private http: HttpClient) { }

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
    // const FileAttachmentControl = this.parentForm.get("FileAttachment");
    // if (!FileAttachmentControl) {
    //   this.parentForm.addControl("FileAttachment", this.fb.control(""));
    // }
  }

  formatsAllowed: string = '.jpg,.png,.pdf,.docx,.txt,.gif,.jpeg';
  GetGeneralSettingFileFormat() {
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { code: CommonConstant.GsCodeEmailAttachmentFormat }).subscribe(
      (response: { GsValue: string }) => {
        this.formatsAllowed = response.GsValue;
      });
  }

  // maxSize in MB
  maxSize: number = 10;
  GetGeneralSettingFileMaxSize() {
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { code: CommonConstant.GsCodeEmailAttachmentMaxSize }).subscribe(
      (response: { GsValue: string }) => {
        this.maxSize = +response.GsValue;
      });
  }

  EmailCustomPattern: Array<CustomPatternObj> = new Array();
  CustomPatternEmailShowErrorMessage(){
    this.EmailCustomPattern.push({ pattern: CommonConstant.regexMultipleEmail, invalidMsg: "Please enter a valid email" });
  }

  ngOnDestroy(): void {
    const FileAttachmentControl = this.parentForm.get("FileAttachment");
    if (FileAttachmentControl) {
      this.parentForm.removeControl("FileAttachment");
    }
  }

  selectedFiles: File[] = [];
  notAllowedList: File[] = [];
  FileAttachmentChange(event: Event) {
    console.log(event);
    console.dir(event);

    // ITERATE SELECTED FILES
    let target: HTMLInputElement = event.target as HTMLInputElement;
    let srcElement: HTMLInputElement = event.srcElement as HTMLInputElement;
    let file: FileList = target.files || srcElement.files;
    // console.log("type: change");
    // if (event.type == 'drop') {
    //   file = event.dataTransfer.files;
    //   // console.log("type: drop");
    // }
    console.log(file);
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

    console.log(this.selectedFiles);
    console.log(this.notAllowedList);
    console.log(this.convertSize(this.GetTotalSizeFile));
    console.log(this.convertSize(this.MaxSizeFile));
    console.log(this.CheckTotalSizeFileIsValid);
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
      // console.log("FORMAT NOT ALLOWED");
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

  private uploadFiles() {
    let i: number = 0;

    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    let selectedFiles: File[] = this.selectedFiles;
    let listFileToUpload: Array<{ FileType: string, File: File }> = new Array();
    for (i = 0; i < selectedFiles.length; i++) {
      // Add DATA TO BE SENT
      formData.append(
        "Files",
        selectedFiles[i] as Blob /*, this.selectedFiles[i].name*/
      );
      listFileToUpload.push({ FileType: "", File: selectedFiles[i] });
    }

    xhr.onreadystatechange = evnt => {
      // console.log("onready");
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.response);
        console.log(evnt);
        if (xhr.status !== 200 && xhr.status !== 201) {
          // isError = true;
          // this.progressBarShow = false;
          // this.uploadBtn = false;
          // this.uploadMsg = true;
          // this.afterUpload = true;
          // this.uploadMsgText = this.replaceTexts.afterUploadMsg_error;
          // this.uploadMsgClass = 'text-danger lead';
          // console.log(this.uploadMsgText);
        }
        else {
          var response = JSON.parse(xhr.response);
          if (response.HeaderObj.StatusCode != '200') {
            // isError = true;
            // this.progressBarShow = false;
            // this.uploadBtn = false;
            // this.uploadMsg = true;
            // this.afterUpload = true;
            // this.uploadMsgText = this.replaceTexts.afterUploadMsg_error + response.HeaderObj.Message;
            // this.uploadMsgClass = 'text-danger lead';
          }
        }
        // this.ApiResponse.emit(xhr);
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
      // console.log("onload");
      // console.log(evnt);
      // this.progressBarShow = false;
      // this.uploadBtn = false;
      // this.uploadMsg = true;
      // this.afterUpload = true;
      // if (!isError) {
      //   this.uploadMsgText = this.replaceTexts.afterUploadMsg_success;
      //   this.uploadMsgClass = 'text-success lead';
      //   // console.log(this.uploadMsgText + " " + this.selectedFiles.length + " file");
      // }
    };

    xhr.onerror = evnt => {
      console.log("onerror");
      console.log(evnt);
    };

    xhr.open('POST', this.UrlConstantNew.UploadMultipleFiles, true);
    let token = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);
    xhr.setRequestHeader('AdInsKey', `${token}`);
    xhr.send(formData);
  }

  private get MaxSizeFile(): number {
    return this.maxSize * 1024000;
  }

  convertSize(fileSize: number) {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }

  removeFile(idx: number, sf_na: string) {
    switch(sf_na){
      case 'sf':
        this.selectedFiles.splice(idx, 1);
        break;
      case 'na':
        this.notAllowedList.splice(idx, 1);
        break;
    }
  }

  image: IImageMeta = {
    type: '',
    dataUrl: '',
    blobUrl: '',
    file: null,
  };
  imageHandler(dataUrl: string, type: string, imageData: QuillImageData) {
    imageData
      .minify({
        maxWidth: 320,
        maxHeight: 320,
        quality: 0.7,
      })
      .then((miniImageData) => {
        if (miniImageData instanceof QuillImageData) {
          const blob = miniImageData.toBlob();
          const file = miniImageData.toFile('my_cool_image.png');

          console.log(`type: ${type}`);
          console.log(`dataUrl: ${dataUrl}`);
          console.log(`blob: ${blob}`);
          console.log(`file: ${file}`);

          this.image = {
            type,
            dataUrl,
            blobUrl: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)),
            file,
          };
        }
      });
  }
}
