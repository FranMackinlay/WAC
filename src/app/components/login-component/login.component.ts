import { Injectable, Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpUserResponse } from 'src/app/interfaces/http-user-response.interface';
import { User } from 'src/app/interfaces/user.interface';
import { EventBrokerService } from 'src/app/services/event-broker.service';
import { UsersSrv } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
@Injectable()
export class LoginComponent implements OnInit {

  @Input() user!: User;
  @Output() userChange = new EventEmitter<User>();

  hide: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private userSrv: UsersSrv, private _eventBroker: EventBrokerService) {
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

    this.userSrv.signIn(this.loginForm.value).subscribe((data: User) => {
      this.user = data;
      this._eventBroker.emit<User>('user-login', this.user);
      this.router.navigate(['/dashboard'], { state: { data: { token: this.user.token } } });
    });
  }

}
