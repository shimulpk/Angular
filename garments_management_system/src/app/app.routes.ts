import { Routes } from '@angular/router';
import { HomeComponent } from './shared/layout/home-component/home-component';
import { LoginComponent } from './feature/auth/login-component/login-component';
import { ProfileAdmin } from './feature/auth/profile-admin/profile-admin';
import { authGuard } from './core/guards/auth-guards';
import { ProfileMarchandiser } from './feature/auth/profile-marchandiser/profile-marchandiser';
import { ProfileProductionManager } from './feature/auth/profile-production-manager/profile-production-manager';
import { BuyerComponent } from './feature/buyer/buyer';
import { StyleComponent } from './feature/style/style';
import { OrderComponent } from './feature/order-component/order-component';
import { BomComponent } from './feature/bom-component/bom-component';
import { ProductionDashboardComponent } from './feature/production/production-dashboard/production-dashboard';
import { ProductionReportComponent } from './feature/production/production-report/production-report';
import { ProductionStageComponent } from './feature/production/production-stage/production-stage';

















export const routes: Routes = [

  // HOME
  {
    path: 'home',
    component: HomeComponent
  },

  // LOGIN
  {
    path: 'login',
    component: LoginComponent
  },

  // ADMIN PROFILE
  {
    path: 'profile-admin',

    component: ProfileAdmin,

    canActivate: [authGuard],

    data: {
      roles: ['Admin']
    }

  },

  // MARCHANDISER PROFILE
  {
    path: 'profile-marchandiser',

    component: ProfileMarchandiser,

    canActivate: [authGuard],

    data: {
      roles: ['Marchandiser']
    }

  },

  // PRODUCTION PROFILE
  {
    path: 'profile-production_manager',

    component: ProfileProductionManager,

    canActivate: [authGuard],

    data: {
      roles: ['Production_Manager']
    }

  },

  // BUYERS
  {
    path: 'buyers',

    component: BuyerComponent,

    canActivate: [authGuard],

    data: {
      roles: [
        'Admin',
        'Marchandiser'
      ]
    }

  },

  {
    path: 'pro-stage',

    component: ProductionStageComponent,

    canActivate: [authGuard],

    data: {
      roles: [
        'Admin',
        'Marchandiser'
      ]
    }

  },

  // STYLES
  {
    path: 'styles',

    component: StyleComponent,

    canActivate: [authGuard],

    data: {
      roles: [
        'Admin',
        'Marchandiser'
      ]
    }

  },

  // ORDERS
  {
    path: 'orders',

    component: OrderComponent,

    canActivate: [authGuard],

    data: {
      roles: [
        'Admin',
        'Marchandiser'
      ]
    }

  },

  // BOMS
  {
    path: 'boms',

    component: BomComponent,

    canActivate: [authGuard],

    data: {
      roles: [
        'Admin',
        'Marchandiser'
      ]
    }

  },

  // PRODUCTIONS
  {
    path: 'productions',

    component:
      ProductionDashboardComponent,
      
      

    canActivate: [authGuard],

    data: {
      roles: [
        'Admin',
        'Production_Manager'
      ]
    }

  },
  // PRODUCTIONS
  {
    path: 'productions',

    component:
      ProductionReportComponent,
      
      

    canActivate: [authGuard],

    data: {
      roles: [
        'Admin',
        'Production_Manager'
      ]
    }

  },
  // PRODUCTIONS
  {
    path: 'productions',

    component:
      ProductionStageComponent,
      
      

    canActivate: [authGuard],

    data: {
      roles: [
        'Admin',
        'Production_Manager'
      ]
    }

  },

  // DEFAULT ROUTE
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // NOT FOUND
  {
    path: '**',
    redirectTo: 'home'
  }

];