import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
 
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asset-category-information',
  templateUrl: './asset-category-information.component.html',
  styleUrls: ['./asset-category-information.component.scss'],
  providers: [NGXToastrService]
})
export class AssetCategoryInformationComponent implements OnInit {



  AssetCategoryForm = this.fb.group({
    AssetCategoryCode: ['', [Validators.required, Validators.maxLength(50)]],
    AssetCategoryName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { }

  ngOnInit() {
  }
  SaveForm() {

  }
}
