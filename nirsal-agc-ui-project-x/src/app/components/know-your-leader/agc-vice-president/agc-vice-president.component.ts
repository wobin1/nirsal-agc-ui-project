import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventsService } from '../../../shared/services/events.service';

@Component({
  selector: 'ps-agc-vice-president',
  templateUrl: './agc-vice-president.component.html',
  styleUrls: ['./agc-vice-president.component.scss']
})
export class AgcVicePresidentComponent implements OnInit {
   public stageData: any = {
    "stageLeader":"Vice President",
    "stageId":"kyl_vice_president_data"
  };
  constructor(private router: Router, public events: EventsService) { }

  ngOnInit(): void {
  }

  processStage(agcData: any): void {
    this.router.navigateByUrl("/agc-application/know-your-leader/director-of-finance")
  }
}
