import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TelPostComponent } from "../tel-post/tel-post.component";
import { MailPostComponent } from "../email-post/email-post.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-structure-contact',
    standalone: true,
    templateUrl: './structure-contact.component.html',
    styleUrl: './structure-contact.component.css',
    imports: [SidebarComponent, TelPostComponent, MailPostComponent,CommonModule]
})
export class StructureContactComponent {
    activeTab: 'tel' | 'email'  = 'tel';

}
