import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../website/service.service';
import { Expertise } from '../../../website/interfaces/interface.expertise';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { ServicePostComponent } from "../service-post/service-post.component";
import { Router, NavigationEnd,  } from '@angular/router';
import { FondateurPostComponent } from "../fondateur-post/fondateur-post.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PackPostComponent } from "../pack-post/pack-post.component";

@Component({
    selector: 'app-structure',
    standalone: true,
    templateUrl: './structure.component.html',
    styleUrl: './structure.component.css',
    providers: [ServiceService],
    imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, SidebarComponent, ServicePostComponent, RouterOutlet, FondateurPostComponent, PackPostComponent]
})
export class StructureComponent {
  activeTab: 'expertise' | 'fondateur' | 'pack' = 'expertise';


}
