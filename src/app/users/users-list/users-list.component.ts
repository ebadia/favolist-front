import { Component, OnInit } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { UsersModule } from '@app/users/users.module'
import { UsersService } from '@app/services/users/users.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any[]

  constructor(private _router: Router, private _service: UsersService) {}

  ngOnInit() {
    this._service.getAll().subscribe(
      res => {
        this.users = res
      },
      error => console.log('Error retrieving users')
    )
  }

  edit(user) {
    //
  }

  order(user) {
    //
    localStorage.setItem('current_client', user.id)
    this._router.navigate(['favolist', 'orders', 'new', user.id])
  }
}
