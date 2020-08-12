import { Component, OnInit, Input, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-uc-subsection',
  templateUrl: './uc-subsection.component.html',
  styleUrls: ['./uc-subsection.component.css']
})
export class UcSubsectionComponent implements OnInit {
  @Input() title: any;
  @Input() panel: any;
  @Input() id: any;
  isHidden :boolean=false;

  constructor(
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    let js = this._renderer2.createElement('script');
    js.text = `
          $(document).ready(function(){
            $("#`+this.id+`").click(function(){
              $("#`+this.panel+`").slideToggle("slow");
            });
          });
        `;
    this._renderer2.appendChild(this._document.body, js);
  }

}
