import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterFormBuilderService } from '../../../services/formBuilders/register-form-builder.service';
import { AuthorizationService } from '../../../services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public showPassword = false;
  public registerForm: FormGroup;

  constructor(
    private registerFormBuilder: RegisterFormBuilderService,
    private authorizationService: AuthorizationService
  ) {
    this.registerForm = this.registerFormBuilder.getRegisterForm();
  }

  ngOnInit() {
  }

  public register(): void {
    this.authorizationService.register(this.registerForm.value);
  }

}
