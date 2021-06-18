import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-upload-license',
  templateUrl: './upload-license.component.html',
  providers: [NGXToastrService]
})
export class UploadLicenseComponent implements OnInit {

  readonly CancelLink: string = NavigationConstant.LICENSE_PAGING;

  LicenseForm = this.fb.group({
    LicenseFile : ['',Validators.required],
    LicenseStateFile : ['',Validators.required]
  })

  fileLicense : any;
  fileLicenseState : any;


  constructor(
    private fb: FormBuilder, 
    private httpClient: HttpClient,
    private router: Router,
    private toastr: NGXToastrService
    ) { }

  ngOnInit() {
  }

  InputFileLicense(file: File){
    console.log("file license",file);
    this.fileLicense = file[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.LicenseForm.controls['LicenseFile'].setValue(fileReader.result);
    }
    fileReader.readAsText(this.fileLicense);

    

  }

  InputFileLicenseState(file: FileList){
    console.log("file license state", file);
    this.fileLicenseState = file[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.LicenseForm.controls['LicenseStateFile'].setValue(fileReader.result);
    }
    fileReader.readAsText(this.fileLicenseState);

    

  }

  uploadDocument() {
    
    console.log("upload",this.LicenseForm);
    
    // this.httpClient.post(URLConstant.UploadLicense, this.LicenseForm.value).subscribe(
    //   (response) => {
    //     this.toastr.successMessage(response['message']);
    //     AdInsHelper.RedirectUrl(this.router,[NavigationConstant.LICENSE_PAGING],{});
    //   }
    // );
    
}

}
