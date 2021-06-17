import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersSrv } from 'src/app/services/user.service';
import { EventBrokerService } from 'src/app/services/event-broker.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {


  userForm!: FormGroup;
  user!: User;
  hide: boolean = true;


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UsersSrv, private _eventBroker: EventBrokerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ _id }) => {
      this.getUserInfo(_id);
    })

  }

  getUserInfo(_id: string) {
    this.userService.getUser(_id).subscribe((res) => {
      this.user = res.user;
      this._eventBroker.emit<User>('user-login', this.user);
      this.hydrateForm(this.user);
    });
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard']);
  }

  hydrateForm(user: User) {
    this.userForm = this.fb.group({
      _id: [user._id, [Validators.required]],
      name: [user.name, [Validators.required, Validators.minLength(3)]],
      email: [user.email, [Validators.required, Validators.minLength(6)]],
      password: [user.password, [Validators.required, Validators.minLength(8)]],
    })
  }

  formHasChanged(): boolean {
    debugger;
    return (
      this.userForm.value.name !== this.user.name ||
      this.userForm.value.email !== this.user.email ||
      this.userForm.value.password !== this.user.password
    )
  }

  onSubmit(): void {
    if (this.userForm.errors) return alert('Please check the form again.');
    console.log(`!this.formHasChanged()`, !this.formHasChanged());
    debugger;
    if (!this.formHasChanged()) {
      alert('No changes');
    } else {
      this.userService.updateUser(this.userForm.value).subscribe((res) => {
        this.user = res.user;
        this._eventBroker.emit<User>('user-login', this.user);
      });
    }
  }

}
