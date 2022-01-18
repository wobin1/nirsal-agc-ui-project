import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServerRequestService } from '../../../shared/services/server-request.service';
import { StorageService } from '../../../shared/services/storage.service';
import { EventsService } from '../../../shared/services/events.service';

@Component({
  selector: 'ps-kyl-summary',
  templateUrl: './kyl-summary.component.html',
  styleUrls: ['./kyl-summary.component.scss']
})
export class KylSummaryComponent implements OnInit {
  stageIds: any = {
    "president":"kyl_president_data",
    "vicePresident":"kyl_vice_president_data",
    "directorOfFinance":"kyl_director_of_finance_data"
  }

  stageData: any = {
    president:{},
    vicePresident:{},
    directorOfFinance:{},
    presidentPhoto:"",
    vicePresidentPhoto:"",
    directorOfFinancePhoto:""
  }

  agcId: any = 0;

  processingRequest: boolean = false;
  stageInfo: any = {};

  constructor(private router: Router, public storage: StorageService, 
    public serverRequest: ServerRequestService, public events: EventsService) {
      this.storage.getItem("current_agc_id").subscribe((data)=>{
        this.agcId = data;
      });
    }

  ngOnInit(): void {
    this.stageData.president = JSON.parse(this.storage.getItem(this.stageIds.president).value);
    this.stageData.president["type"] = "president";
    this.stageData.presidentPhoto = this.storage.getItem(this.stageIds.president+"_photo").value

    this.stageData.vicePresident = JSON.parse(this.storage.getItem(this.stageIds.vicePresident).value);
    this.stageData.vicePresident["type"] = "vicePresident";
    this.stageData.vicePresidentPhoto = this.storage.getItem(this.stageIds.vicePresident+"_photo").value

    this.stageData.directorOfFinance = JSON.parse(this.storage.getItem(this.stageIds.directorOfFinance).value);
    this.stageData.directorOfFinance["type"] = "directorOfFinance";
    this.stageData.directorOfFinancePhoto = this.storage.getItem(this.stageIds.directorOfFinance+"_photo").value

    if (this.agcId == null || this.agcId == 0){
      alert("Please specify an AGC application to continue");
      this.router.navigateByUrl("/new-agc-application")
    }

    this.serverRequest.get("agc/application/get-stage?stage=KYL&agcId="+this.agcId).subscribe((e)=>{
      let resp = this.serverRequest.processResponse(e);

      this.stageInfo = resp;
    })
  }

  saveLeaders(): void {
    this.processingRequest = true;
    const data = {
      agcId: this.agcId,
      leaders: [
        this.stageData.president, this.stageData.vicePresident, this.stageData.directorOfFinance
      ]
    } 

    this.serverRequest.post("agc/application/new-kyl-data", data).subscribe((e)=>{
      this.processingRequest = false;
      let resp = this.serverRequest.processResponse(e);
      this.saveStage();
    }, (error)=>{
      this.serverRequest.handleError(error);
      this.processingRequest = false;
    })
  }

  saveStage() {
    this.serverRequest.post("agc/application/activate-next-stage", {
      completedStageId: this.stageInfo.application_stage_id,
      nextStage: "KYC",
      agcId: this.agcId
    }).subscribe((e)=>{
      this.processingRequest = false;
      this.processStage();
    }, (error)=>{
      this.serverRequest.handleError(error);
      this.processingRequest = false;
    })
  }

  processStage() {
    this.events.broadcast('update-global-nav', true);
    this.router.navigateByUrl("/agc-application/know-your-customer/agc-information")
  }

}
