import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import Quill from 'quill';
import QuillImageDropAndPaste, { ImageData as QuillImageData } from 'quill-image-drop-and-paste';

interface IImageMeta {
  type: string;
  dataUrl: string;
  blobUrl: SafeUrl;
  file: File | null;
}
@Component({
  selector: 'app-broadcast-message-email',
  templateUrl: './broadcast-message-email.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BroadcastMessageEmailComponent implements OnInit, OnDestroy {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() IsUsedTemplate: boolean = false;
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

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
    this.CustomPatternEmailShowErrorMessage();
    const SendToControl = this.parentForm.get("SendTo");
    if (!SendToControl) {
      this.parentForm.addControl("SendTo", this.fb.control(""));
    }
    const BodyControl = this.parentForm.get("Body");
    if (!BodyControl) {
      this.parentForm.addControl("Body", this.fb.control(""));
    }
    const FileAttachmentControl = this.parentForm.get("FileAttachment");
    if (!FileAttachmentControl) {
      this.parentForm.addControl("FileAttachment", this.fb.control(""));
    }
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

  FileAttachmentChange(ev) {
    console.log(ev);
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
