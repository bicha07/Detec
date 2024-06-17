import { Routes } from '@angular/router';
import { LinkHomeComponent } from './Home/link-home/link-home.component';
import { LinkAboutComponent } from './About/link-about/link-about.component';
import { LinkContactComponent } from './Contact/link-contact/link-contact.component';
import { LinkPortfolioComponent } from './Portfolio/link-portfolio/link-portfolio.component';

import { LinkServiceComponent } from './Service/link-service/link-service.component';
import { SingleSComponent } from './Service/single-s/single-s.component';

export const routes: Routes = [
    {path:"", component:LinkHomeComponent },
    {path:"home", component:LinkHomeComponent },
    {path:"about", component:LinkAboutComponent },
    {path:"contact", component:LinkContactComponent },
    {path:"sg", component:SingleSComponent },
    {path:"services", component:LinkServiceComponent },
    // {path:"portfolio", component:LinkPortfolioComponent },



];
