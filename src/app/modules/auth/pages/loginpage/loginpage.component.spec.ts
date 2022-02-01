import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRoutingModule } from '../../auth-routing.module';

import { LoginpageComponent } from './loginpage.component';

describe('LoginpageComponent', () => {
    let component: LoginpageComponent;
    let fixture: ComponentFixture<LoginpageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginpageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule, HttpClientTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginpageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
