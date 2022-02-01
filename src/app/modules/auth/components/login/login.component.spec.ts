import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a input elements quantity equals to formcontrols', () => {
        const formElement = fixture.debugElement.nativeElement.querySelector('#loginForm');
        const inputElements = formElement.querySelectorAll('input');
        console.log('inputElements' + inputElements);
        expect(inputElements.length).toEqual(2);
    });

    it('Check initial form values LOGIN FormGroup', () => {
        const loginFormGroup = component.loginForm;
        const loginFormValues = {
            email: '',
            password: '',
        };
        expect(loginFormGroup.value).toEqual(loginFormValues);
    });

    it('Check email value and validation before set Value and Validation', () => {
        const loginFormEmailElement: HTMLInputElement = fixture.debugElement.nativeElement
            .querySelector('#loginForm')
            .querySelectorAll('input')[0];
        const emailValueFormGroup = component.loginForm.get('email');

        expect(loginFormEmailElement.value).toEqual(emailValueFormGroup?.value);
        expect(emailValueFormGroup?.errors).not.toBeNull();
        expect(emailValueFormGroup?.errors?.required).toBeTruthy();
    });

    it('Check email value and validation after set Value and Validation', () => {
        const loginFormEmailElement: HTMLInputElement = fixture.debugElement.nativeElement
            .querySelector('#loginForm')
            .querySelectorAll('input')[0];
        loginFormEmailElement.value = 'example@gmail.com';
        loginFormEmailElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const emailValueFormGroup = component.loginForm.get('email');
            expect(loginFormEmailElement.value).toEqual(emailValueFormGroup?.value);
            expect(emailValueFormGroup?.errors).toBeNull();
        });
    });

    it('Check Login Form is valid when validations has data', () => {
        const loginFormEmailElement: HTMLInputElement = fixture.debugElement.nativeElement
            .querySelector('#loginForm')
            .querySelectorAll('input')[0];
        const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement
            .querySelector('#loginForm')
            .querySelectorAll('input')[1];
        loginFormEmailElement.value = 'example@gmail.com';
        loginFormPasswordElement.value = '123456';
        loginFormEmailElement.dispatchEvent(new Event('input'));
        loginFormPasswordElement.dispatchEvent(new Event('input'));
        const isLoginFormValid = component.loginForm.valid;
        fixture.whenStable().then(() => {
            expect(isLoginFormValid).toBeTruthy();
        });
    });
});
