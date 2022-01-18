import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BvnErrorService {

  constructor() { }

  getText(errorCode) {
    let text = '';
    switch(errorCode) {
      case "00": {
        text = "The function call was successful";
        break;
      }
      case "01": {
        text = "The supplied BVN is unrecognized. Please confirm that there is no input error and try again";
        break;
      }
      default: {
        text = "Please try again or contact an administrator if the error persists";
        break;
      }
    }

    return text;
  }
}
