import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranslationService } from 'src/app/core/services/translationService';
import { TranslateService } from '@ngx-translate/core';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'pfa-bread-crumps',
  templateUrl: './bread-crumps.component.html',
  styleUrls: ['./bread-crumps.component.scss']
})
export class BreadCrumpsComponent implements OnInit {
  
  public breadcrumbs: any[];
	translateSubscription: Subscription;
  HOME = 'HOME';
  rtlIcon="chevron_right";
  lrtIcon="chevron_left";
	formName: string;
	unsubscribeAll$: Subject<any>;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private translationService: TranslationService,
		private translateService: TranslateService) {

		this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);


	}

	ngOnInit(): void {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				distinctUntilChanged()).subscribe(() => {
					this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
				});
				console.log(this.breadcrumbs)
	}

	buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {

		let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
		let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
		this.formName = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.formName : '';
		const lastRoutePart = path.split('/').pop();
		const isDynamicRoute = lastRoutePart.startsWith(':');
		if (isDynamicRoute && !!route.snapshot) {
			const paramName = lastRoutePart.split(':')[1];
			path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
			label = route.snapshot.params[paramName];
		}
		const nextUrl = path ? `${url}/${path}` : url;

		const breadcrumb: any = {
			label: label,
			url: nextUrl,
		};
		// Only adding route with non-empty label
		const Breadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
		if (route.firstChild) {
			return this.buildBreadCrumb(route.firstChild, nextUrl, Breadcrumbs);
		}
		const newBreadCrumbs: any[] = [];
		for (const item of Breadcrumbs) {
			newBreadCrumbs.push({
				label: item.label.toUpperCase().replace(' ', '_'),
				url: item.url
			});
		}
		return newBreadCrumbs;
	}

	getTranslate(item: string): string {
		let translate: string;
		this.translateService.get('BREAD_CRUMP.' + item).subscribe(
			v => {
				translate = v;
			}
		);
		return translate;
	}
}
