
import { Component,Renderer2, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { ServiceService } from '../../website/service.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  currentUser: any;
  baseUrl: string;

  constructor(private renderer: Renderer2, private router: Router,    private userService: ServiceService,  ) {
    this.baseUrl = this.userService.apiUrlbase;

  }

  ngAfterViewInit() {
    this.loadUserProfile();
    const checkbox = this.renderer.selectRootElement('#the-btn', true);
    this.renderer.listen(checkbox, 'change', (event: Event) => {
      if (!(event.target as HTMLInputElement).checked) {
        this.collapseAllCards();
      }
    });
  }
  
  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => console.error('Error loading profile:', error)
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
  navigate(path: string) {
    this.router.navigate([path]);
  }
}
