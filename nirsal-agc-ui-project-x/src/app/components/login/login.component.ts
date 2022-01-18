import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'ps-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public signup: boolean;
  public showBVNSignup: boolean = true;

  public loginData = {email: "", password: ""}
  public loginAs = {requester: ""}
 
  
 
 

  constructor(
    private formBuilder: FormBuilder,
    private api : LoginService,
    private route: ActivatedRoute,
    private router: Router) {
    const url = this.route.snapshot.url;
    if (url[0].path === 'sign-in') {
      this.signup = false;
    }


  }

  ngOnInit(): void {
  
  }

  public loginUser(){
    let res = "Respondent";
    let crc = "CRC Admin";
    let admin = "Admin";
    let pmro = "PMRO";

    if(this.loginAs.requester==res){
      this.router.navigate(['/dashboard'])
    } 
    else if(this.loginAs.requester==crc){
      this.router.navigate(['/crc-dashboard'])
    }
    else if(this.loginAs.requester==admin){
      this.router.navigate(['/admin-dashboard'])
    }
    else if(this.loginAs.requester==pmro){
      this.router.navigate(['/pmro-dashboard'])
    }
  }

  public forRespondent(){
    this.api.login(this.loginData.email, this.loginData.password)
  }

  public forCrc(){
    this.api.login(this.loginData.email, this.loginData.password)
  }

  public foradmin(){
    this.api.login(this.loginData.email, this.loginData.password)
  }

  public forPmro(){
    this.api.login(this.loginData.email, this.loginData.password)
  }

  public toggle() {
    this.signup = !this.signup;
  }

  public validateBvn() {
    this.showBVNSignup = false;
  }

    
  }

  

