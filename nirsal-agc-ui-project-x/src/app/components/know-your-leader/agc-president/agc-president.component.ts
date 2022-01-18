import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../../shared/services/events.service';

@Component({
  selector: 'ps-agc-president',
  templateUrl: './agc-president.component.html',
  styleUrls: ['./agc-president.component.scss']
})
export class AgcPresidentComponent implements OnInit {
  public stageData: any = {
    "stageLeader":"President",
    "stageId":"kyl_president_data"
  };
  constructor(private router: Router, public events: EventsService) { }

  ngOnInit(): void {
  }

  processStage(agcData: any): void {
    this.router.navigateByUrl("/agc-application/know-your-leader/vice-president")
  }

}
