import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './interfaces/user.interface';
import { EventBrokerService, IEventListener } from './services/event-broker.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'WAC';

  user: Partial<User> = {};

  private _myEventListener: IEventListener;

  constructor(private _eventBroker: EventBrokerService, private route: Router) {
    this._myEventListener = _eventBroker.listen<User>('user-login', (user: User) => {
      this.user = user;
    });
  }

  public ngOnDestroy() {
    this._myEventListener.ignore();
  }

  onClickLogout() {
    this.user = {};
    localStorage.removeItem('user');
    this.route.navigate(['/login'])
  }
}
