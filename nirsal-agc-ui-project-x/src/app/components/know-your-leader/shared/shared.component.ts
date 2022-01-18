import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ServerRequestService } from '../../../shared/services/server-request.service';
import { SwalService } from '../../../shared/services/swal.service';
import { BvnErrorService } from '../../../shared/services/bvn-error.service';
import { EventsService } from '../../../shared/services/events.service';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'ps-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  @Input() stageData: any;
  @Output() processStage: EventEmitter<any> = new EventEmitter();

  showBvnForm: boolean = true;
  processingRequest: boolean = false;
  agcData: any = {
    "bvn":"",
    "questionnaire":[
    ]
  }

  bvnData: any = {
    "Base64Image":""
  };

  agcId: any = 0;
  stageInfo: any = {};
  noOfBvnRequest: any = 4;

  constructor(public serverRequest: ServerRequestService, public events: EventsService,
    public swal: SwalService, private bvnError: BvnErrorService, public storage: StorageService,
    private router: Router) {
    this.storage.getItem("current_agc_id").subscribe((data)=>{
      this.agcId = data;
    });
  }

  ngOnInit(): void {
    if (this.agcId == null || this.agcId == 0){
      alert("Please specify an AGC application to continue");
      this.router.navigateByUrl("/new-agc-application")
    }

    this.serverRequest.get("agc/application/get-stage?stage=KYL&agcId="+this.agcId).subscribe((e)=>{
      let resp = this.serverRequest.processResponse(e);

      this.stageInfo = resp;

      if (typeof this.stageInfo !== "undefined" && this.stageInfo.stage_status == 1){
        this.router.navigateByUrl("/agc-application/know-your-leader/kyl-summary")
      }
    })

    this.agcData.questionnaire = [
      {
        "question":"Has the "+this.stageData.stageLeader+" ever coordinated/mobilized a group of farmers?",
        "answer":""
      },
      {
        "question":"Has the "+this.stageData.stageLeader+" successfully held a leadership role in a group?",
        "answer":""
      },
      {
        "question":"Does the "+this.stageData.stageLeader+" possess knowledge of farm management?",
        "answer":""
      },
      {
        "question":"Does the "+this.stageData.stageLeader+" possess excellent report writing skills?",
        "answer":""
      },
      {
        "question":"Does the "+this.stageData.stageLeader+" use a smartphone (i.e: Whatsapp)?",
        "answer":""
      }
    ]
  }

  validateBvn(): void {
    this.processingRequest = true;
    const requestData = {
      "bvnList":[this.agcData.bvn],
      "fields":["NameOnCard", "Email", "PhoneNumber1", "DateOfBirth", "Gender", "Base64Image"],
      "userId":1
    };

    this.serverRequest.post("bvn/search/get-bvn-data", requestData).subscribe((e)=>{
      this.processingRequest = false;
      let resp = this.serverRequest.processResponse(e);
      if (typeof resp[this.agcData.bvn] !== "undefined"){
        if (resp[this.agcData.bvn].status != 1){
          const text = this.bvnError.getText(resp[this.agcData.bvn].status);
          this.swal.warning("BVN Validation Error", text);
        }
        else {
          this.bvnData = resp[this.agcData.bvn].data;
          this.showBvnForm = false

          // this.agcData.Photo = this.bvnData.Base64Image;
          this.agcData.FullName = this.bvnData.NameOnCard
          this.agcData.Email = this.bvnData.Email
          this.agcData.PhoneNumber = this.bvnData.PhoneNumber1
          this.agcData.DateOfBirth = this.bvnData.DateOfBirth
          this.agcData.Gender = this.bvnData.Gender
        }
      }
      else {
          const text = this.bvnError.getText(0);
          this.swal.warning("BVN Validation Error", text);
      }
    }, (error)=>{
      this.serverRequest.handleError(error);
      this.processingRequest = false;
    })
  }


  public processBvnRequestNum(){
    if(this.noOfBvnRequest<=3)
    {
      this.validateBvn(); 

    }else
    {
       alert("You have made the maximum number of edit on this column please contact you PMRO if you still need to make this change")
       this.validateBvn(); 
    }
  }



  proceed(): void {
    this.storage.setItem(this.stageData.stageId, JSON.stringify(this.agcData));
    this.storage.setItem(this.stageData.stageId+"_photo", this.bvnData.Base64Image);
    this.processStage.emit(this.agcData);
  }

}
