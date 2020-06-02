import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/today',
    pathMatch: 'full',
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'login',
        canActivateChild: [LoginGuard],
        loadChildren: () =>
          import('./modules/login/login.module').then((mod) => mod.LoginModule),
      },
      {
        path: 'auth',
        canActivateChild: [LoginGuard],
        loadChildren: () =>
          import('./core/auth/auth.module').then((mod) => mod.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'today',
        canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./modules/today/today.module').then((mod) => mod.TodayModule),
      },
      {
        path: 'feed',
        canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./modules/feed/feed.module').then((mod) => mod.FeedModule),
      },
      {
        path: 'progress',
        canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./modules/progress/progress.module').then(
            (mod) => mod.ProgressModule
          ),
      },
      {
        path: 'profile',
        canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (mod) => mod.ProfileModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'today' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
