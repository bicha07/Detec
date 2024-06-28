import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormulairePostComponent } from "../formulaire-post/formulaire-post.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-structure-formulaire',
    standalone: true,
    templateUrl: './structure-formulaire.component.html',
    styleUrl: './structure-formulaire.component.css',
    imports: [CommonModule,ReactiveFormsModule,FormsModule,FormulairePostComponent, SidebarComponent]
})  

export class StructureFormulaireComponent {
  activeTab: 'devis'= 'devis';

}
