import { Component, OnInit } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
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

  async login() {
    console.log("login clicked");
    if (this.loginFormGroup.valid) {
      try {
        await this.authService.login(
          this.loginFormGroup.get("email").value,
          this.loginFormGroup.get("password").value
        );
        this.router.navigate([""]);
        console.log("Went to the dashboard");
      } catch (e) {
        console.log("Unable to log in");
      }
    }
  }

  register() {
    if (this.registerFormGroup.valid) {
    }
  }
}
