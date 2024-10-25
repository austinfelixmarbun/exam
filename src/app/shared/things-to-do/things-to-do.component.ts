import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from '../constant/URLConstant';

@Component({
  selector: 'app-things-to-do',
  templateUrl: './things-to-do.component.html',
  styleUrls: ['./things-to-do.component.scss']
})
export class ThingsToDoComponent implements OnInit {
  @Input() module : string;
  ListThingsToDo : any;
  constructor(private http: HttpClient, ) { }

  ngOnInit() {
    var url = URLConstant.GetThingsToDoByRole;
    var obj = {
      ModuleCode : this.module
    };
    this.http.post(url, obj).subscribe((response) => 
    {
      this.ListThingsToDo = response["ListThingsToDo"];
    });
  }

  click(url : string)
  {
    window.open(url);
  }
}
