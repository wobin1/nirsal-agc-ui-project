import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventsService } from '../../../shared/services/events.service';

@Component({
  selector: 'ps-agc-executive-director',
  templateUrl: './agc-executive-director.component.html',
  styleUrls: ['./agc-executive-director.component.scss']
})
export class AgcExecutiveDirectorComponent implements OnInit {
   public stageData: any = {
    "stageLeader":"Director of Finance",
    "stageId":"kyl_director_of_finance_data"
  };
  constructor(private router: Router, public events: EventsService) { }

  ngOnInit(): void {
  }

  processStage(agcData: any): void {
    this.router.navigateByUrl("/agc-application/know-your-leader/kyl-summary")
  }

}
