import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})


export class LoginService {
	public email: any ;
	public password: any; 


  constructor(private http : HttpClient) {
  	this.email= ["one@gmail.com", "two@gmail.com", "three@gmail.com"];
	this.password = [123, 1234, 12345]
  }

  public login(data1, data2){
  	console.log(data1)
  	console.log(data2)
 	}

 	
  }

 		



