import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


import { StorageService } from '../../../shared/services/storage.service';
import { ServerRequestService } from '../../../shared/services/server-request.service';


@Component({
  selector: 'ps-crc',
  templateUrl: './crc.component.html',
  styleUrls: ['./crc.component.scss']
})
export class CrcComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router, 
    public storage: StorageService, public serverRequest: ServerRequestService) { }

  ngOnInit(): void {
  }

  confirmCRC: boolean=true;

  crcConfirmation(){
      this.confirmCRC=false;
      if(this.confirmCRC){
        this.processStage();
      }else
      {
        alert("CRC check is yet to be done you will be notify when it is done or check back later")
        this.processStage();
      }
  }

  processStage(): void {
    // this.storage.setItem(this.stageId, JSON.stringify(this.farmersBvn));
    this.router.navigateByUrl("/agc-application/know-your-farm/farmers-allocation")
  }

}
