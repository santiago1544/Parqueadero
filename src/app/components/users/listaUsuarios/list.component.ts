import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    loading = false;

    constructor(private accountService: AccountService, private alertService: AlertService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe({
              next:() => {
                this.users = this.users.filter(x => x.id !== id)
                this.alertService.error('Usuario eliminado', { keepAfterRouteChange: true });
              }
            });
    }
}
