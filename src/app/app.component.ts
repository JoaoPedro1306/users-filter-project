import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersList } from './data/users-list';
import { IFIlterOptions } from './interfaces/filter-options.interface';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  usersList : IUser[] = [];
  showUserDetails: boolean = false;
  userSelected: IUser = {} as IUser;
  filterOptions: IFIlterOptions = {} as IFIlterOptions;

  ngOnInit() {
    setTimeout(() => {
      this.usersList = UsersList;
    }, 1);
  }

  onUserSelected(user: IUser){
    this.showUserDetails = true;
    this.userSelected = user;
  }

  onFilter(filterOptions: IFIlterOptions){
    console.log(filterOptions);
  }
}
