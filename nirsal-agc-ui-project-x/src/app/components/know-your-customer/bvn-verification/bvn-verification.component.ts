import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


import { StorageService } from '../../../shared/services/storage.service';
import { ServerRequestService } from '../../../shared/services/server-request.service';

@Component({
  selector: 'ps-bvn-verification',
  templateUrl: './bvn-verification.component.html',
  styleUrls: ['./bvn-verification.component.scss']
})
export class BvnVerificationComponent implements OnInit {
  stageIds: any = {
    "president":"kyl_president_data",
    "vicePresident":"kyl_vice_president_data",
    "directorOfFinance":"kyl_director_of_finance_data",
    "agcInfo":"kyc_agc_information"
  }

  stageId: any = "kyc_bvn_verification";

  agcInfo: any = {};

  stageData: any = {
    president:{},
    vicePresident:{},
    directorOfFinance:{},
    presidentPhoto:"",
    vicePresidentPhoto:"",
    directorOfFinancePhoto:""
  }

  modalIndex;

  public farmersBvn: any = [];
  constructor(private modalService: NgbModal, private router: Router, 
    public storage: StorageService, public serverRequest: ServerRequestService) { }

  open(content, index) {
    this.modalIndex = index;
    this.modalService.open(content, {ariaLabelledBy: ''}).result.then((result) => {
    }, (reason) => {
    });
  }
  
  addBvnToList(data: any) {
    this.farmersBvn.push(data);
  }

  ngOnInit(): void {
    this.agcInfo = JSON.parse(this.storage.getItem(this.stageIds.agcInfo).value);
    console.log(this.agcInfo);
    this.stageData.president = JSON.parse(this.storage.getItem(this.stageIds.president).value);
    this.stageData.presidentPhoto = this.storage.getItem(this.stageIds.president+"_photo").value

    this.stageData.vicePresident = JSON.parse(this.storage.getItem(this.stageIds.vicePresident).value);
    this.stageData.vicePresidentPhoto = this.storage.getItem(this.stageIds.vicePresident+"_photo").value

    this.stageData.directorOfFinance = JSON.parse(this.storage.getItem(this.stageIds.directorOfFinance).value);
    this.stageData.directorOfFinancePhoto = this.storage.getItem(this.stageIds.directorOfFinance+"_photo").value


    this.addBvnToList({
      bvn: this.stageData.president.bvn,
      name: this.stageData.president.FullName,
      gender: this.stageData.president.Gender,
      phoneNumber: this.stageData.president.PhoneNumber,
      photo: this.stageData.presidentPhoto,
      validated: true,
      constant: true
    });

    this.addBvnToList({
      bvn: this.stageData.vicePresident.bvn,
      name: this.stageData.vicePresident.FullName,
      gender: this.stageData.vicePresident.Gender,
      phoneNumber: this.stageData.vicePresident.PhoneNumber,
      photo: this.stageData.vicePresidentPhoto,
      validated: true,
      constant: true
    });

    this.addBvnToList({
      bvn: this.stageData.directorOfFinance.bvn,
      name: this.stageData.directorOfFinance.FullName,
      gender: this.stageData.directorOfFinance.Gender,
      phoneNumber: this.stageData.directorOfFinance.PhoneNumber,
      photo: this.stageData.directorOfFinancePhoto,
      validated: true,
      constant: true
    });

    for(let i = 0; i < this.agcInfo.agcTotalFarmers - 3; i++){
      this.addBvnToList({
        bvn: '',
        name: '',
        gender: '',
        phoneNumber: '',
        photo: '',
        validated: false,
        constant: false
      });
    }
  }

  processStage(): void {
    this.storage.setItem(this.stageId, JSON.stringify(this.farmersBvn));
    this.router.navigateByUrl("/agc-application/know-your-customer/crc")
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  validateBvn(index: any): any {
    let bvn = this.farmersBvn[index].bvn;

    // this.processingRequest = true;
    const requestData = {
      "bvnList":[bvn],
      "fields":["NameOnCard", "Email", "PhoneNumber1", "DateOfBirth", "Gender", "Base64Image"],
      "userId":1
    };

    this.serverRequest.post("bvn/search/get-bvn-data", requestData).subscribe((e)=>{
      // this.processingRequest = false;
      let resp = this.serverRequest.processResponse(e);
      if (typeof resp[bvn] !== "undefined"){
        if (resp[bvn].status != 1){
          // const text = this.bvnError.getText(resp[bvn].status);
          alert("An error occurred");
        }
        else {
          let bvnData = resp[bvn].data;
          this.farmersBvn[index].name=bvnData.NameOnCard;
          this.farmersBvn[index].gender=bvnData.Gender;
          this.farmersBvn[index].photo=bvnData.Base64Image;
          this.farmersBvn[index].phoneNumber=bvnData.PhoneNumber1;
          this.farmersBvn[index].validated = true;
        }
      }
      else {
          // const text = this.bvnError.getText(0);
          alert("An Error Occurred");
          // this.swal.warning("BVN Validation Error", text);
      }
    }, (error)=>{
      this.serverRequest.handleError(error);
      // this.processingRequest = false;
    })

  }

  removeBvn(index: any): any {
    this.farmersBvn[index] = {
      bvn: '',
      name: '',
      gender: '',
      phoneNumber: '',
      photo: '',
      validated: false,
      constant: false
    };
  }

}
