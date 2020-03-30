import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormBuilderService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public getRegisterForm(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      secondName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(16)
      ]))
    });
  }

}
