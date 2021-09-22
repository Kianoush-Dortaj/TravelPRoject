import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { AuthGuard } from './core/auth/services';

const childrenRoutes: VexRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: 'dashboards/analytics',
    pathMatch: 'full',
  },
  {
    path: 'dashboards/analytics',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboards/dashboard-analytics/dashboard-analytics.module')
      .then(m => m.DashboardAnalyticsModule),
  },
  {
    path: 'claims-manager',
    loadChildren: () => import('./pages/pages/claims-manager/claims-manager.module')
      .then(m => m.ClaimsManagerModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'CLAIM_GROUP_MANAGER'
    },
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/pages/setting/setting.module')
      .then(m => m.SettingModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'SETTING'
    },
  },
  {
    path: 'country',
    loadChildren: () => import('./pages/pages/country/country.module')
      .then(m => m.CountryModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'COUNTRY'
    },
  },
  {
    path: 'subscribe',
    loadChildren: () => import('./pages/pages/subscribe/subscribe.module')
      .then(m => m.SubscribeModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'SUBSCRIBE'
    },
  },
  {
    path: 'discount',
    loadChildren: () => import('./pages/pages/discount/discount.module')
      .then(m => m.DiscountModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'DISCOUNT'
    },
  },
  {
    path: 'visitor',
    loadChildren: () => import('./pages/pages/visitor/visitor.module')
      .then(m => m.VisitorModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'VISITOR'
    },
  },
  {
    path: 'managers',
    loadChildren: () => import('./pages/pages/managers/managers.module')
      .then(m => m.ManagersModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'MANAGERS'
    },
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/pages/users/users.module')
      .then(m => m.UsersModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'Users'
    },
  },
  {
    path: 'travel-type',
    loadChildren: () => import('./pages/pages/travel-type/travel-type.module')
      .then(m => m.TravelTypeModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'TRAVEL_TYPE'
    }
  },
  {
    path: 'travel-type-residence',
    loadChildren: () => import('./pages/pages/travel-type-residence/travel-type-residence.module')
      .then(m => m.TravelTyResidencepeModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'TRAVEL_TYPE_RESIDENCE'
    }
  },
  {
    path: 'interst',
    loadChildren: () => import('./pages/pages/intrest/intrest.module')
      .then(m => m.IntrestModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'INTERST'
    }
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/pages/category/category.module')
      .then(m => m.CategoryModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'CATEGORY'
    },
  },
  {
    path: 'roles-manager',
    loadChildren: () => import('./pages/pages/roles/roles.module')
      .then(m => m.RolesModule),
    data: {
      toolbarShadowEnabled: true,
      breadcrumb: 'ROLES_MANAGER'
    },
  }
];

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/pages/auth/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: CustomLayoutComponent,
    children: childrenRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
