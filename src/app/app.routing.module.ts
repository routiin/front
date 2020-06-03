import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { BlankLayoutComponent } from './layouts/blank/blank.component';
import { MainLayoutComponent } from './layouts/main/main.component';

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
        canActivate: [LoginGuard],
        loadChildren: () =>
          import('./modules/login/login.module').then((mod) => mod.LoginModule),
      },
      {
        path: 'auth',
        canActivate: [LoginGuard],
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
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/today/today.module').then((mod) => mod.TodayModule),
      },
      {
        path: 'feed',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/feed/feed.module').then((mod) => mod.FeedModule),
      },
      {
        path: 'progress',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/progress/progress.module').then(
            (mod) => mod.ProgressModule
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
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
