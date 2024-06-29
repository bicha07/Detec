import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CertifPostComponent } from "../certif-post/certif-post.component";

@Component({
    selector: 'app-structure-service',
    standalone: true,
    templateUrl: './structure-service.component.html',
    styleUrl: './structure-service.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent, CommonModule, CertifPostComponent]
})
export class StructureServiceComponent {
  activeTab: 'certif'= 'certif';

}
