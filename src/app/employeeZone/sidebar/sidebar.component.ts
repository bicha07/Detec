
import { Component,Renderer2, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { ServiceService } from '../../website/service.service';
import { LoginService } from '../../registration/login.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  username: string = 'Bicha'; // Default value
  role: string = 'Admin'; // Default value
  photo: string = 'null.png';
  baseUrl: string;

  constructor(private renderer: Renderer2, private router: Router, private serviceService1: ServiceService, private loginService:LoginService) {
    this.baseUrl = this.serviceService1.apiUrlbase;
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  ngAfterViewInit() {
    const checkbox = this.renderer.selectRootElement('#the-btn', true);
    this.renderer.listen(checkbox, 'change', (event: Event) => {
      if (!(event.target as HTMLInputElement).checked) {
        this.collapseAllCards();
      }
    });
  }

  loadUserProfile() {
    this.serviceService1.getUserProfile().subscribe({
      next: (profile) => {
        this.username = profile.username;
        this.role = profile.role;
        this.photo = profile.photo;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
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

  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.loginService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/login']); // Redirect to login page after logout
      },
      error: (error) => {
        console.error('Error during logout:', error);
      }
    });
  }
}
