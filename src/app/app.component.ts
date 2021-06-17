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
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    this._myEventListener = _eventBroker.listen<User>('user-login', (user: User) => {
      this.user = user || localUser;
    });
  }

  public ngOnDestroy() {
    this._myEventListener.ignore();
  }

  goToUserProfile() {
    this.route.navigate([`/user/${this.user._id}`]);
  }

  onClickLogout() {
    this.user = {};
    localStorage.removeItem('user');
    this.route.navigate(['/login'])
  }
}
