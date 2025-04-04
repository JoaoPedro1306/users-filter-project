import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersList } from './data/users-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  usersList : IUser[] = [];
  showUserDetails: boolean = false;
  userSelected: IUser = {} as IUser;
  
  ngOnInit() {
    setTimeout(() => {
      this.usersList = UsersList;
    }, 2000);
  }
  
  onUserSelected(user: IUser){
    this.showUserDetails = true;
    this.userSelected = user;
  }
}
