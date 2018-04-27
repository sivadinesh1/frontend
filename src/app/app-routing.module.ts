import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';





import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { SeekerDashboardComponent } from './modules/dashboard/seeker-dashboard/seeker-dashboard.component';
import { AboutUsComponent } from './shared/about-us/about-us.component';

import { UniversityComponent } from './modules/whyskillmatic/university/university.component';
import { SeekersComponent } from './modules/whyskillmatic/seekers/seekers.component';
import { ProvidersComponent } from './modules/whyskillmatic/providers/providers.component';
import { IndustryComponent } from './modules/whyskillmatic/industry/industry.component';
import { ExpertsComponent } from './modules/whyskillmatic/experts/experts.component';
import { DashboardResolver } from './services/dashboard-resolver.service';
import { ProviderDashboardComponent } from './modules/dashboard/provider-dashboard/provider-dashboard.component';
import { UniversityDashboardComponent } from './modules/dashboard/university-dashboard/university-dashboard.component';
import { IndustryDashboardComponent } from './modules/dashboard/industry-dashboard/industry-dashboard.component';
import { SeekerProfileComponent } from './modules/profiles/seeker-profile/seeker-profile.component';
import { ProviderProfileComponent } from './modules/profiles/provider-profile/provider-profile.component';
import { UniversityProfileComponent } from './modules/profiles/university-profile/university-profile.component';
import { IndustryProfileComponent } from './modules/profiles/industry-profile/industry-profile.component';



const appRoutes: Routes = [
   { path: '', component: HomeComponent },

   { path: 'home', component: HomeComponent, data: { title: 'SkillmaTic - Home Page' } },
   

   { path: 'aboutus', component: AboutUsComponent, data: { title: 'SkillmaTic - Aboutus Page' } },
   { path: 'experts', component: ExpertsComponent, data: { title: 'SkillmaTic - Experts Page' } },
   { path: 'industry', component: IndustryComponent, data: { title: 'SkillmaTic - Industry Page' } },
   { path: 'provider', component: ProvidersComponent, data: { title: 'SkillmaTic - Providers Page' } },
   { path: 'seeker', component: SeekersComponent, data: { title: 'SkillmaTic - Seekers Page' }  },
   { path: 'universities', component: UniversityComponent, data: { title: 'SkillmaTic - Universities Page' }  },

  //  { path: 'dashboard/seeker/:userid', component: SeekerDashboardComponent, data: { title: 'SkillmaTic - Seeker Page' }  },



  { path: 'profile/seeker/:userid', component: SeekerProfileComponent,
  resolve: { userdata: DashboardResolver },
  data: { path: 'profile/seeker/:userid' }

},
{ path: 'profile/provider/:userid', component: ProviderProfileComponent,
 resolve: { userdata: DashboardResolver },
 data: { path: 'profile/provider/:userid' }

},
{ path: 'profile/university/:userid', component: UniversityProfileComponent,
 resolve: { userdata: DashboardResolver },
 data: { path: 'profile/university/:userid' }

},
{ path: 'profile/industry/:userid', component: IndustryProfileComponent,
 resolve: { userdata: DashboardResolver },
 data: { path: 'profile/industry/:userid' }
},


   { path: 'dashboard/seeker/:userid', component: SeekerDashboardComponent,
     resolve: { userdata: DashboardResolver },
     data: { path: 'dashboard/seeker/:userid' }

  },
  { path: 'dashboard/provider/:userid', component: ProviderDashboardComponent,
    resolve: { userdata: DashboardResolver },
    data: { path: 'dashboard/provider/:userid' }

  },
  { path: 'dashboard/university/:userid', component: UniversityDashboardComponent,
    resolve: { userdata: DashboardResolver },
    data: { path: 'dashboard/university/:userid' }

  },
  { path: 'dashboard/industry/:userid', component: IndustryDashboardComponent,
    resolve: { userdata: DashboardResolver },
    data: { path: 'dashboard/industry/:userid' }
  },
  {  path: 'auth', loadChildren: './auth.module#AuthModule' },
  { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules // <-This is our preloading
  })],
  exports: [RouterModule]

})

export class AppRoutingModule {

}
