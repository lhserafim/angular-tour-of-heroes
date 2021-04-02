import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }, //The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //The method is called forRoot() because you configure the router at the application's root level. 
  exports: [RouterModule]
})
export class AppRoutingModule { } //Next, AppRoutingModule exports RouterModule so it will be available throughout the app.

// First, the app-routing.module.ts file imports RouterModule and Routes so the application can have routing 
//functionality. The next import, HeroesComponent, will give the Router somewhere to go once you configure the routes.