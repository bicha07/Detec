import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../website/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { Router, NavigationEnd,  } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EmployeeProjectsComponent } from "../new-project/new-project.component";
import { OldProjectComponent } from "../old-project/old-project.component";

@Component({
    selector: 'app-structure-project',
    standalone: true,
    templateUrl: './structure-project.component.html',
    styleUrl: './structure-project.component.css',
    providers: [ServiceService],
    imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, SidebarComponent, RouterOutlet, EmployeeProjectsComponent, OldProjectComponent]
})
export class StructureProjectComponent {

  activeTab:'newproject'|'oldproject' = 'newproject';


}
