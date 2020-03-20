import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lookup-test',
  templateUrl: './lookup-test.component.html',
})
export class LookupTestComponent implements OnInit {
  modalRef: any;
  closeResult : any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    
    this.modalRef = this.modalService.open(content, { size :'lg' });
    
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modalRef.close()
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modalRef.close()
    });
   
  }

  choose()
  {
    this.modalRef.close()
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
