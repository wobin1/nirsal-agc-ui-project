import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ServerRequestService } from '../../shared/services/server-request.service';
import { StorageService } from '../../shared/services/storage.service';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'ps-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  acceptTerms: any = false;
  agcId: any = 0;
  stageInfo: any = {};

  processingRequest: boolean = false;

  constructor(private serverRequest: ServerRequestService, private router: Router, 
    private storage: StorageService, private events: EventsService) {
    this.storage.getItem("current_agc_id").subscribe((data)=>{
      this.agcId = data;
    });
  }

  ngOnInit(): void {
    if (this.agcId == null || this.agcId == 0){
      alert("Please specify an AGC application to continue");
      this.router.navigateByUrl("/new-agc-application")
    }

    this.serverRequest.get("agc/application/get-stage?stage=T%26C&agcId="+this.agcId).subscribe((e)=>{
      let resp = this.serverRequest.processResponse(e);

      this.stageInfo = resp;

      if (typeof this.stageInfo !== "undefined" && this.stageInfo.stage_status == 1){
        this.acceptTerms = true;
      }
    })

  }

  saveStage(): void {
    this.processingRequest = true;
    this.serverRequest.post("agc/application/activate-next-stage", {
      completedStageId: this.stageInfo.application_stage_id,
      nextStage: "KYL",
      agcId: this.agcId
    }).subscribe((e)=>{
      this.processingRequest = false;
      this.processStage();
    }, (error)=>{
      this.serverRequest.handleError(error);
      this.processingRequest = false;
    })
  }

  processStage(): void {
    this.events.broadcast('update-global-nav', true);
    this.router.navigateByUrl("/agc-application/know-your-leader/president")
  }
}
