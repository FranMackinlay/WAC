import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpUserResponse } from 'src/app/interfaces/http-user-response.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UsersSrv } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  @Input() user!: User | HttpUserResponse;
  @Output() userChange = new EventEmitter<User | HttpUserResponse>();

  hide: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private userSrv: UsersSrv) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.userSrv.signIn(this.loginForm.value).subscribe((data: HttpUserResponse) => {
      this.user = data;
      this.userChange.emit(this.user);
      this.router.navigate(['/dashboard'], { state: { data: { token: this.user.token } } });
    });
  }

}
