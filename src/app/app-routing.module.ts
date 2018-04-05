import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';





import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const appRoutes: Routes = [
   { path: '', component: HomeComponent }, 
   
   { path: 'home', component: HomeComponent }, 
  
   {  path: 'auth', loadChildren: './auth.module#AuthModule' },  

    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found'}
  ]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules // <-This is our preloading
  })],
  exports: [RouterModule]
  
})    

export class AppRoutingModule {

}