import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '@valencia/creatr/layout';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    component: MainLayoutComponent,
    loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'legal',
    component: MainLayoutComponent,
    loadChildren: () => import('@valencia/creatr/legal').then((m) => m.LegalModule),
  },
  {
    // SECURITY ROUTES (ENABLED IN SecurityModule/Child-Routes);
    path: 'security', //use top-level URL [segment] to load the module; SecurityModule has child-routes;
    component: MainLayoutComponent,
    loadChildren: () => import('@valencia/security').then((m) => m.SecurityModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      enableTracing: true,
      preloadingStrategy: PreloadAllModules,
      useHash: false,
    }),
  ],
})
export class AppRoutesModule {}
