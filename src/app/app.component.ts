import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersList } from './data/users-list';
import { IFIlterOptions } from './interfaces/filter-options.interface';
import { filter } from 'rxjs';
import { isWithinInterval } from 'date-fns';

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
    this.usersListFiltered = this.filterUsersList(filterOptions, this.usersList);
  }

  filterUsersList(filterOptions: IFIlterOptions, usersList: IUser[]): IUser[] {
    let filteredList: IUser[] = [];

    filteredList = this.filterUsersListByName(filterOptions.name, usersList);
    filteredList = this.filterUsersListByStatus(filterOptions.status, filteredList);
    filteredList = this.filterUsersListByDate(filterOptions.startDate, filterOptions.endDate, filteredList);
    return filteredList;
  }
  
  filterUsersListByName(name: string | undefined, usersList: IUser[]): IUser[] {
    const NAME_NOT_TYPPED = name === undefined;

    if(NAME_NOT_TYPPED)
      return usersList;

    const filteredList = usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));

    return filteredList;
  }

  filterUsersListByStatus(status: boolean | undefined, usersList: IUser[]): IUser[]{
    const STATUS_NOT_SELECTED = status === undefined;

    if(STATUS_NOT_SELECTED)
      return usersList;

    const filteredList = usersList.filter((user) => user.ativo === status);
    return filteredList;
  }

  filterUsersListByDate(startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] {
    const DATES_NOT_SELECTED = startDate === undefined || endDate === undefined;

    if(DATES_NOT_SELECTED)
      return usersList;

    const listFiltered = usersList.filter((user) => isWithinInterval(new Date(user.dataCadastro), {
      start: startDate,
      end: endDate
    }));

    return listFiltered;
  }

}
