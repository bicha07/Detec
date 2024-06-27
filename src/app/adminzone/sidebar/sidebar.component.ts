
import { Component,Renderer2, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const checkbox = this.renderer.selectRootElement('#the-btn', true);
    this.renderer.listen(checkbox, 'change', (event: Event) => {
      if (!(event.target as HTMLInputElement).checked) {
        this.collapseAllCards();
      }
    });
  }

  collapseAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const headerLink = card.querySelector('.card-header a') as HTMLElement;
      const collapseDiv = card.querySelector('.collapse') as HTMLElement;

      if (headerLink && collapseDiv) {
        if (!headerLink.classList.contains('collapsed') && collapseDiv.classList.contains('show')) {
          this.renderer.addClass(headerLink, 'collapsed');
          this.renderer.removeClass(collapseDiv, 'show');
        }
      }
    });
  }

  collapseDown() {
    const checkbox = this.renderer.selectRootElement('#the-btn', true);
    this.renderer.setProperty(checkbox, 'checked', true);
  }
}
