import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServerRequestService } from '../../shared/services/server-request.service';
import { SwalService } from '../../shared/services/swal.service';
import { BvnErrorService } from '../../shared/services/bvn-error.service';
import { EventsService } from '../../shared/services/events.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'ps-new-agc-application',
  templateUrl: './new-agc-application.component.html',
  styleUrls: ['./new-agc-application.component.scss']
})
export class NewAgcApplicationComponent implements OnInit {
  processingRequest: boolean = false;
  constructor(private serverRequest: ServerRequestService, private router: Router, private storage: StorageService) {

  }

  ngOnInit(): void {
  }

  initNewRegistration(){
    this.processingRequest = true;
    const requestData = {
      "userId":1
    };

    this.serverRequest.post("agc/application/create-new-agc", requestData).subscribe((e)=>{
      this.processingRequest = false;
      let resp = this.serverRequest.processResponse(e);
      if (typeof resp.agcId !== "undefined"){
        this.processStage(resp.agcId, resp.termsStage);
      }
      else {
        alert('An error occurred');
      }

    }, (error)=>{
      this.serverRequest.handleError(error);
      this.processingRequest = false;
    })
  }

  processStage(agcId: any, stage: any) {
    this.storage.setItem("current_agc_id", agcId);
    this.router.navigateByUrl("/agc-application/terms-and-conditions");
  }

}
