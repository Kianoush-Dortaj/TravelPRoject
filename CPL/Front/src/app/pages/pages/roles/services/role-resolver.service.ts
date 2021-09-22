import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { RoleEdit } from '../models/role-edit';
import { RoleService } from './role.service';


@Injectable({
	providedIn: 'root'
})

export class RoleResolverService implements Resolve<RoleEdit> {

	constructor(
		private roleService: RoleService,
		private router: Router) { }

	resolve(route: ActivatedRouteSnapshot): Observable<RoleEdit> {

		const id = route.params['id'];


		return this.roleService
			.getRoleDetials(id)
			.pipe(
				map(role => {

					if (role) {
						return role.result as RoleEdit;
					}
					this.backToMenu();
					return null;
				}), catchError(error => {
					this.backToMenu();
					return of(null);
				})
			);
	}

	backToMenu(): void {
		this.router.navigate(['/roles-manager/list']);

	}
}
