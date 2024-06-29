import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectPostComponent } from '../../projectAdmin/project-post/project-post.component';

@Component({
  selector: 'app-structure-project',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, SidebarComponent,ProjectPostComponent],
  templateUrl: './structure-project.component.html',
  styleUrl: './structure-project.component.css'
})
export class StructureProjectComponent {
  activeTab: 'project' = 'project';

}

