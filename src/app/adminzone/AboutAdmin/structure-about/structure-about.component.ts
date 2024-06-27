import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../website/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router, NavigationEnd,  } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StatPostComponent } from "../stat-post/stat-post.component";
import {  PartnerPostComponent } from "../partners-post/partners-post.component";


@Component({
    selector: 'app-structure-about',
    standalone: true,
    templateUrl: './structure-about.component.html',
    styleUrl: './structure-about.component.css',
    providers: [ServiceService],
    imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, SidebarComponent, RouterOutlet, StatPostComponent, PartnerPostComponent]
})
export class StructureAboutComponent {
  activeTab: 'partners' | 'stat'  = 'partners';

}
