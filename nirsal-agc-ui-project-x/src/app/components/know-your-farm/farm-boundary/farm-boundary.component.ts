import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


import { StorageService } from '../../../shared/services/storage.service';
import { ServerRequestService } from '../../../shared/services/server-request.service';


@Component({
  selector: 'ps-farm-boundary',
  templateUrl: './farm-boundary.component.html',
  styleUrls: ['./farm-boundary.component.scss']
})
export class FarmBoundaryComponent implements OnInit {

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;

  constructor(private modalService: NgbModal, private router: Router, 
    public storage: StorageService, public serverRequest: ServerRequestService) {
    this.uploader = new FileUploader({
      url: '',
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit(): void {
  }

  processStage(): void {
    // this.storage.setItem(this.stageId, JSON.stringify(this.farmersBvn));
    this.router.navigateByUrl("/agc-application/know-your-agc/parcelization-viewer")
  }

}
