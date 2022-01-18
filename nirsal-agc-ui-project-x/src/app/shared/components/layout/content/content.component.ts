import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { NavService } from '../../../services/nav.service';
import { LayoutService } from '../../../services/layout.service';
import { fadeInAnimation } from '../../../data/router-animation/router-animation';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [fadeInAnimation]
})
export class ContentComponent implements OnInit, AfterViewInit {

  public right_side_bar: boolean;

  constructor(public navServices: NavService, public layout: LayoutService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  ngOnInit() {
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  public rightSidebar($event) {
    this.right_side_bar = $event;
  }

}

