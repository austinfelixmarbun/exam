import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  showMessage(message: any) {
    console.log(message);
  }

  @ViewChild('treemenu') public gridContextMenu: ContextMenuComponent;

  public data: any[] = [
    {
      text: 'Furniture', items: [
        { text: 'Tables & Chairs' },
        { text: 'Sofas' },
        { text: 'Occasional Furniture' }
      ]
    },
    {
      text: 'Decor', items: [
        { text: 'Bed Linen' },
        { text: 'Curtains & Blinds' },
        { text: 'Carpets' }
      ]
    }
  ];

  public items: any[] = [{ text: 'Remove', icon: 'close' }];

  private contextItem: any;

  public onNodeClick(e: any): void {
    if (e.type === 'contextmenu') {
      const originalEvent = e.originalEvent;

      originalEvent.preventDefault();

      this.contextItem = e.item.dataItem;

      this.gridContextMenu.show({ left: originalEvent.pageX, top: originalEvent.pageY });
    }
  }

  public onSelect({ item }): void {
    if (item.text === 'Remove') {
      this.removeItem(this.contextItem, this.data);
    }
  }

  private removeItem(dataItem: any, items: any[]): void {
    const index = items.indexOf(dataItem);
    if (index >= 0) {
      items.splice(index, 1);
    } else {
      items.forEach(item => {
        if (item.items) {
          this.removeItem(dataItem, item.items);
        }
      });
    }
  }

}
