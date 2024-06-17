import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive,],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
