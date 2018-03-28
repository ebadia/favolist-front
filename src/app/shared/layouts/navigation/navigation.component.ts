import { Component, OnInit } from '@angular/core';

import { AccountsService } from '@services/accounts/accounts.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor( private _auth: AccountsService) { }

  ngOnInit() {
  }

  salir() {
    this._auth.logout()
  }

}
