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
  usersList: IUser[] = [];
  usersListFiltered: IUser[] = [];
  showUserDetails: boolean = false;
  userSelected: IUser = {} as IUser;
  filterOptions: IFIlterOptions = {} as IFIlterOptions;

  ngOnInit() {
    setTimeout(() => {
      this.usersList = UsersList;
      this.usersListFiltered = UsersList;
    }, 1);
  }

  onUserSelected(user: IUser) {
    this.showUserDetails = true;
    this.userSelected = user;
  }

  onFilter(filterOptions: IFIlterOptions) {
    console.log(filterOptions);

    this.usersListFiltered = this.filterUsersList(filterOptions, this.usersList);
  }

  filterUsersList(filterOptions: IFIlterOptions, usersList: IUser[]): IUser[] {
    let filterdList: IUser[] = [];

    filterdList = this.filterUsersListByName(filterOptions.name, usersList);
    filterdList = this.filterUsersByStatus(filterOptions.status, filterdList);

    return filterdList;
  }
  
  filterUsersListByName(name: string | undefined, usersList: IUser[]): IUser[] {
    const NAME_NOT_TYPPED = name === undefined;

    if(NAME_NOT_TYPPED)
      return usersList;

    const filteredList = usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));

    return filteredList;
  }

  filterUsersByStatus(status: boolean | undefined, usersList: IUser[]): IUser[]{
    const STATUS_NOT_SELECTED = status === undefined;

    if(STATUS_NOT_SELECTED)
      return usersList;

    const filteredList = usersList.filter((user) => user.ativo === status);
    return filteredList;
  }

}
