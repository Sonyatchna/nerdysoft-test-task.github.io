import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormBuilderService } from '../../../services/formBuilders/login-form-builder.service';
import { AuthorizationService } from '../../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showPassword = false;
  public loginForm: FormGroup;

  constructor(
    private loginFormBuilder: LoginFormBuilderService,
    private authorizationService: AuthorizationService
  ) {
    this.loginForm = this.loginFormBuilder.getLoginForm();
  }

  ngOnInit() {
  }

  public login(): void {
    this.authorizationService.login(this.loginForm.value);
  }

}
