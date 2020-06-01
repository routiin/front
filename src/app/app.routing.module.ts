import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then((mod) => mod.LoginModule),
      },
      {
        path: 'today',
        loadChildren: () =>
          import('./modules/today/today.module').then((mod) => mod.TodayModule),
      },
      {
        path: 'feed',
        loadChildren: () =>
          import('./modules/feed/feed.module').then((mod) => mod.FeedModule),
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('./modules/progress/progress.module').then(
            (mod) => mod.ProgressModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (mod) => mod.ProfileModule
          ),
      },
      {
        path: '',
        redirectTo: '/today',
        pathMatch: 'full',
      },
    ],
  },
  // { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
