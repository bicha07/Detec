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
import { FormulaireComponent } from './website/Home/formulaire/formulaire.component';
import { FormulairePostComponent } from './adminzone/FormAdmin/formulaire-post/formulaire-post.component';
import { StructureFormulaireComponent } from './adminzone/FormAdmin/structure-formulaire/structure-formulaire.component';
import { StructureProjectsComponent } from './adminzone/projectAdmin/structure-project/structure-project.component';
import { StructureServiceComponent } from './adminzone/ServiceAdmin/structure-service/structure-service.component';
import { ProjectDetailComponent } from './adminzone/projectAdmin/project-details/project-details.component';
import { StructureComponentt } from './employeeZone/gestionProfile/structure/structure.component';
import { StructureProjectComponent } from './employeeZone/gestionProjet/structure-project/structure-project.component';
import { EmployeeProjectDetailComponent } from './employeeZone/gestionProjet/employee-project-detail/employee-project-detail.component';
import { AdminGuard } from './guards/admin.guard';
import { EmployeeGuard } from './guards/employee.guard';
// import { ProjectDetailsComponent } from './adminzone/projectAdmin/project-details/project-details.component';

export const routes: Routes = [



    //// tous les utilisateur peux deplacer dans ces premiers path 

    // { path: '', component: LinkHomeComponent },
    {path:'' , redirectTo: 'home' , pathMatch: 'full'},
    { path: 'home', component: LinkHomeComponent },
    { path: '*', component: LinkHomeComponent },
    { path: 'about', component: LinkAboutComponent },
    { path: 'contact', component: LinkContactComponent },
    { path: 'sg/:id', component: SingleSComponent },
    { path: 'services', component: LinkServiceComponent },
    { path: 'portfolio', component: LinkPortfolioComponent },
    { path: 'sgc/:id', component: SingleSCComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'resetpwd', component: ResetpwdComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'formulaire', component: FormulaireComponent },




        // Admin routes
        { path: 'homeAdmin', component: StructureComponent, canActivate: [AdminGuard] },
        { path: 'aboutAdmin', component: StructureAboutComponent, canActivate: [AdminGuard] },
        { path: 'serviceAdmin', component: StructureServiceComponent, canActivate: [AdminGuard] },
        { path: 'portfolioAdmin', component: StructurePortfolioComponent, canActivate: [AdminGuard] },
        { path: 'contactAdmin', component: StructureContactComponent, canActivate: [AdminGuard] },
        { path: 'devis', component: StructureFormulaireComponent, canActivate: [AdminGuard] },
        { path: 'project', component: StructureProjectsComponent, canActivate: [AdminGuard] },
        { path: 'project-detail/:id', component: ProjectDetailComponent, canActivate: [AdminGuard] },
      
        // Employee routes
        { path: 'employee-project-detail/:id', component: EmployeeProjectDetailComponent, canActivate: [EmployeeGuard] },
        { path: 'profile', component: StructureComponentt, canActivate: [EmployeeGuard] },
        { path: 'newproject', component: StructureProjectComponent, canActivate: [EmployeeGuard] },
      
        // Default route
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: '**', redirectTo: '/home' }
      ];
      
