import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) this.router.navigate(['/campaign']);
  }

}
