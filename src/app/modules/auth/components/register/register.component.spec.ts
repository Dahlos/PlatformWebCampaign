import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
      declarations: [RegisterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a input elements quantity equals to formcontrols', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#registerForm');
    const inputElements = formElement.querySelectorAll('input');
    console.log("inputElements" + inputElements);
    expect(inputElements.length).toEqual(2);
  });

  it('Check initial form values LOGIN FormGroup', () => {
    const registerFormGroup = component.registerForm;
    const registerFormValues = {
      email: '',
      password: '',
    };
    expect(registerFormGroup.value).toEqual(registerFormValues);
  });

  it('Check email value and validation before set Value and Validation', () => {
    const registerFormEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#registerForm').querySelectorAll('input')[0];
    const emailValueFormGroup = component.registerForm.get('email');

    expect(registerFormEmailElement.value).toEqual(emailValueFormGroup?.value);
    expect(emailValueFormGroup?.errors).not.toBeNull();
    expect(emailValueFormGroup?.errors?.required).toBeTruthy();

  });

  it('Check email value and validation after set Value and Validation', () => {
    const registerFormEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#registerForm').querySelectorAll('input')[0];
    registerFormEmailElement.value = "example@gmail.com";
    registerFormEmailElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const emailValueFormGroup = component.registerForm.get('email');
      expect(registerFormEmailElement.value).toEqual(emailValueFormGroup?.value);
      expect(emailValueFormGroup?.errors).toBeNull();
    });
  });

  it('Check Login Form is valid when validations has data', () => {
    const registerFormEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#registerForm').querySelectorAll('input')[0];
    const registerFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#registerForm').querySelectorAll('input')[1];
    registerFormEmailElement.value = "example@gmail.com";
    registerFormPasswordElement.value = "123456";
    registerFormEmailElement.dispatchEvent(new Event('input'));
    registerFormPasswordElement.dispatchEvent(new Event('input'));
    const isRegisterFormValid = component.registerForm.valid;
    fixture.whenStable().then(() => {
      expect(isRegisterFormValid).toBeTruthy();
    });
  });
});
