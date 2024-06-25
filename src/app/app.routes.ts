import { Routes } from '@angular/router';
import { LinkHomeComponent } from './website/Home/link-home/link-home.component';
import { LinkAboutComponent } from './website/About/link-about/link-about.component';
import { LinkContactComponent } from './website/Contact/link-contact/link-contact.component';
import { LinkPortfolioComponent } from './website/Portfolio/link-portfolio/link-portfolio.component';
import { LinkServiceComponent } from './website/Service/link-service/link-service.component';
import { SingleSComponent } from './website/Service/single-s/single-s.component';
import { SingleSCComponent } from './website/Service/single-sc/single-sc.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { ResetpwdComponent } from './registration/resetpwd/resetpwd.component';
import { SignupComponent } from './registration/signup/signup.component';
import { ServicePostComponent } from './adminzone/HomeAdmin/service-post/service-post.component';
import { StructureComponent } from './adminzone/HomeAdmin/structure/structure.component';
import { FondateurPostComponent } from './adminzone/HomeAdmin/fondateur-post/fondateur-post.component';
import { TeamComponent } from './website/Home/team/team.component';
import { PackPostComponent } from './adminzone/HomeAdmin/pack-post/pack-post.component';
import { StructureAboutComponent } from './adminzone/AboutAdmin/structure-about/structure-about.component';
import { StructurePortfolioComponent } from './adminzone/portfolioAdmin/structure-portfolio/structure-portfolio.component';
import { StructureContactComponent } from './adminzone/contactAdmin/structure-contact/structure-contact.component';

export const routes: Routes = [
    { path: '', component: LinkHomeComponent },
    { path: 'home', component: LinkHomeComponent },
    { path: 'about', component: LinkAboutComponent },
    { path: 'contact', component: LinkContactComponent },
    { path: 'sg/:id', component: SingleSComponent },
    { path: 'services', component: LinkServiceComponent },
    { path: 'portfolio', component: LinkPortfolioComponent },
    { path: 'sgc/:id', component: SingleSCComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'resetpwd', component: ResetpwdComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'homeAdmin', component: StructureComponent },
    { path: 'aboutAdmin', component: StructureAboutComponent},
    { path: 'serviceAdmin', component: StructureComponent },
    { path: 'portfolioAdmin', component: StructurePortfolioComponent },
    { path: 'contactAdmin', component: StructureContactComponent },





    { path: '**', redirectTo: 'home' } 
];
