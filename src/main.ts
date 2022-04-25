import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // if(window){ 
  //   window.console.log=function(){};
  // }
}

function bootstrap() {
     platformBrowserDynamic().bootstrapModule(AppModule);
   };

import Quill from 'quill'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'

Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)

const quill = new Quill('#editor-container', {
  modules: {
    imageDropAndPaste: {
      // add an custom image handler
      handler: imageHandler
    }
  }
})

/**
* Do something to our dropped or pasted image
* @param.imageDataUrl {string} - image's dataURL
* @param.type {string} - image's mime type
* @param.imageData {ImageData} - provided more functions to handle the image
*   - imageData.toBlob() {function} - convert image to a BLOB Object
*   - imageData.toFile(filename?: string) {function} - convert image to a File Object. filename is optional, it will generate a random name if the original image didn't have a name.
*   - imageData.minify(options) {function)- minify the image, return a promise
*      - options.maxWidth {number} - specify the max width of the image, default is 800
*      - options.maxHeight {number} - specify the max height of the image, default is 800
*      - options.quality {number} - specify the quality of the image, default is 0.8
*/
function imageHandler(imageDataUrl, type, imageData) {
  const blob = imageData.toBlob()
  const file = imageData.toFile()

  // generate a form data
  const formData = new FormData()

  // append blob data
  formData.append('file', blob)

  // or just append the file
  formData.append('file', file)

  // upload image to your server
  // callUploadAPI(your_upload_url, formData, (err, res) => {
  //   if (err) return
  //   // success? you should return the uploaded image's url
  //   // then insert into the quill editor
  //   let index = (quill.getSelection() || {}).index;
  //   if (index === undefined || index < 0) index = quill.getLength();
  //   quill.insertEmbed(index, 'image', res.data.image_url, 'user')
  // })
}
if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}

