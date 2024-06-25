import { Component } from '@angular/core';
import { PortfolioImgPostComponent } from "../portfolio-img-post/portfolio-img-post.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-structure-portfolio',
    standalone: true,
    templateUrl: './structure-portfolio.component.html',
    styleUrl: './structure-portfolio.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive,PortfolioImgPostComponent, SidebarComponent,CommonModule]
})
export class StructurePortfolioComponent {
  activeTab: 'portfolio'= 'portfolio';

}
