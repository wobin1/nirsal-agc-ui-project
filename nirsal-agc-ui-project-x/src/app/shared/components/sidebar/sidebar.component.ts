import { Component, ViewEncapsulation, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from '../../services/nav.service';

import { ServerRequestService } from '../../services/server-request.service';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {

  public iconSidebar;
  public menuItems: Menu[];
  public url: any;

  stages: any = [];

  constructor(private router: Router, public navServices: NavService, 
    private serverRequest: ServerRequestService, private storage: StorageService,
    private events: EventsService) {
    this.storage.getItem("current_agc_id").subscribe((data)=>{
      let agcId = data;

      this.serverRequest.get("agc/application/get-stages/"+agcId).subscribe((e)=>{
        let resp = this.serverRequest.processResponse(e);
        this.stages = resp;
        this.updateNavs();
      });

      this.updateNavs();

      this.events.getEvent("update-global-nav").subscribe((e)=>{
        if (e == true){
          this.serverRequest.get("agc/application/get-stages/"+agcId).subscribe((e)=>{
            let resp = this.serverRequest.processResponse(e);
            this.stages = resp;
            this.updateNavs();
          });
        }
      })
    });
  }

  updateNavs(): void {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.menuItems.forEach((menuItem, key) => {
        if (typeof this.stages[menuItem.stageName] !== "undefined"){
          const stage = this.stages[menuItem.stageName];

          if (stage.stage_status == "-1"){
            this.menuItems[key].badgeType="info";
            this.menuItems[key].badgeValue="In progress";
          }
          else if (stage.stage_status == "1"){
            this.menuItems[key].badgeType="success";
            this.menuItems[key].badgeValue="Complete";
          }

        }
      })
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path == event.url) {
              this.setNavActive(items);
            }
            if (!items.children) { return false; }
            items.children.filter(subItems => {
              if (subItems.path == event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) { return false; }
              subItems.children.filter(subSubItems => {
                if (subSubItems.path == event.url) {
                  this.setNavActive(subSubItems);
                }
              });
            });
          });
        }
      });
    });
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return false; }
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }

}
