import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServerRequestService } from '../../../shared/services/server-request.service';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'ps-agc-information',
  templateUrl: './agc-information.component.html',
  styleUrls: ['./agc-information.component.scss']
})
export class AgcInformationComponent implements OnInit {
  stageId: any = "kyc_agc_information"
  data: any = {
    commodityType: 'crop'
  };
  processingRequest: boolean = false;
  constructor(private router: Router, public storage: StorageService, public serverRequest: ServerRequestService) { }

  ngOnInit(): void {
  }

  processStage(): void {
    this.storage.setItem(this.stageId, JSON.stringify(this.data));
    this.router.navigateByUrl("/agc-application/know-your-customer/bvn-verification")
  }

}
