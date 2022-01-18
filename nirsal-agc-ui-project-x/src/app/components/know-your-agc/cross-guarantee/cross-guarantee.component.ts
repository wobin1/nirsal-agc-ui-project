import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { StorageService } from '../../../shared/services/storage.service';
import { ServerRequestService } from '../../../shared/services/server-request.service';

@Component({
  selector: 'ps-cross-guarantee',
  templateUrl: './cross-guarantee.component.html',
  styleUrls: ['./cross-guarantee.component.scss']
})
export class CrossGuaranteeComponent implements OnInit {

stageIds: any = {
    "president":"kyl_president_data",
    "vicePresident":"kyl_vice_president_data",
    "directorOfFinance":"kyl_director_of_finance_data",
    "agcInfo":"kyc_agc_information",
    "bvnList":"kyc_bvn_verification"
  }

  stageId: any = "kyf_farm_allocation";

  agcInfo: any = {};
  bvnList: any = [];
  allocation: any = [];

  stageData: any = {
    president:{},
    vicePresident:{},
    directorOfFinance:{},
    presidentPhoto:"",
    vicePresidentPhoto:"",
    directorOfFinancePhoto:""
  }


  public farmersBvn: any = [];
  constructor(private ModalService: NgbModal, public storage: StorageService, public serverRequest: ServerRequestService, private router: Router ) { }

  ngOnInit(): void {

  	this.agcInfo = JSON.parse(this.storage.getItem(this.stageIds.agcInfo).value);
    this.bvnList = JSON.parse(this.storage.getItem(this.stageIds.bvnList).value);
    console.log(this.agcInfo, this.bvnList);

    for(let i = 0; i < this.bvnList.length; i++){
      this.allocation.push({
        farmerId: (this.agcInfo.agcName+"-agc-00"+(i+1)).toLowerCase(),
        share: '',
        farmerInfo: this.bvnList[i]
      })
    }
  }

  processStage(): void {
    console.log(this.allocation);
    this.storage.setItem(this.stageId, JSON.stringify(this.allocation));
    alert(this.allocation)
    this.router.navigateByUrl("/agc-application/know-your-farm/farm-boundary")
  }

  }


