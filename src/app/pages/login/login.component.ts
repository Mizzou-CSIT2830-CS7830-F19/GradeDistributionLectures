import { Component, OnInit } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  constructor() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

    this.registerFormGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  ngOnInit() {}

  login() {
    console.log("login clicked");
    if (this.loginFormGroup.valid) {
      try {
      } catch (e) {
        console.log("Unable to log in");
      }
    }
  }

  register() {
    if (this.registerFormGroup.valid) {
      try {
      } catch (e) {
        console.log("Unable to register");
      }
    }
  }
}
