import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../website/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { Router, NavigationEnd,  } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileComponent } from "../profile/profile.component";


@Component({
    selector: 'app-structure',
    standalone: true,
    templateUrl: './structure.component.html',
    styleUrl: './structure.component.css',
    providers: [ServiceService],
    imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, SidebarComponent, RouterOutlet, ProfileComponent]
})
export class StructureComponentt {
  activeTab:'profile' = 'profile';


}
