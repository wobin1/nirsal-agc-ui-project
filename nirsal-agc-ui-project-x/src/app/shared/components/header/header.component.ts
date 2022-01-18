import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { TranslateService } from '@ngx-translate/core';

const body = document.getElementsByTagName('body')[0];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public openNav = false;
  public openNavL = false;
  public right_sidebar = false;
  public text: string;
  public isOpenMobile = false;
  public url: any;
  public open = false;
  public open_search = true;
  public sidebarhidden: boolean;
  public elem;
  public headerStrech: boolean = false;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  public menuItems: Menu[];
  public items: Menu[];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public bookmarkItems: any[] = [];

  constructor(
    public navServices: NavService,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.translate.setDefaultLang('en');
  }
  public changeLanguage(lang) {
    this.translate.use(lang)
  }

  ngOnDestroy() {
    this.removeFix();
  }
  ToggleSearch() {
    this.open = !this.open;
    this.removeFix();
  }

  right_side_bar() {
    this.right_sidebar = !this.right_sidebar;
    this.rightSidebarEvent.emit(this.right_sidebar);
  }

  collapseSidebar() {

    let sidebar = document.getElementById('pages-sidebar');

    if(!this.navServices.collapseSidebarMainMenu && this.navServices.collapseSidebarSecondMenu) {
      this.navServices.collapseSidebarMainMenu = false;
      this.navServices.collapseSidebarSecondMenu = false;
    } else if (sidebar.classList.contains('iconsidebar-menu') && !this.navServices.collapseSidebarMainMenu) {
      this.navServices.collapseSidebarMainMenu = true;
    } else if (sidebar.classList.contains('iconbar-mainmenu-close') && sidebar.classList.contains('iconsidebar-menu')) {
      this.navServices.collapseSidebarMainMenu = false;
      this.navServices.collapseSidebarSecondMenu = true;
    } else {
      this.navServices.collapseSidebarMainMenu = false;
      this.navServices.collapseSidebarSecondMenu = false;
    }

    this.sidebarhidden = true;
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  ngOnInit() {
    this.elem = document.documentElement;
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems;
    });

    // document.getElementById('completeStatus').append(this.completeStatus);
  }

  // Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0) {
      return;
    }
    // Image upload validation
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }


  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  opensearch() {
    this.navServices.openclass = !this.navServices.openclass;
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];
    let items = [];
    term = term.toLowerCase();
    this.items.filter(menuItems => {
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }
      if (!menuItems.children) return false
      menuItems.children.filter(subItems => {
        if (subItems.title.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon
          items.push(subItems);
        }
        if (!subItems.children) return false
        subItems.children.filter(suSubItems => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon
            items.push(suSubItems);
          }
        })
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items
      console.log(this.menuItems);
      
    });
  }

  checkSearchResultEmpty(items) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    body.classList.add("offcanvas");
  }

  removeFix() {
    this.searchResult = false;
    body.classList.remove("offcanvas");
    this.text = "";
  }
}
