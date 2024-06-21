import { Component, HostListener, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private renderer: Renderer2) {}

  toggleTheme() {
    // Get all elements with class 'ds' or 'ls'
    const dsElements = document.querySelectorAll('.ds');
    const lsElements = document.querySelectorAll('.ls');

    // Change 'ds' to 'ls'
    dsElements.forEach((element) => {
      this.renderer.removeClass(element, 'ds');
      this.renderer.addClass(element, 'ls');
    });

    // Change 'ls' to 'ds'
    lsElements.forEach((element) => {
      this.renderer.removeClass(element, 'ls');
      this.renderer.addClass(element, 'ds');
    });

    // Change the icon
    const icon = document.getElementById('toggle-icon') as HTMLImageElement;
    const logo = document.getElementById('detec') as HTMLImageElement;
    const banner1 = document.getElementById('banner1') as HTMLImageElement;
    const banner2 = document.getElementById('banner2') as HTMLImageElement;
    const banner3 = document.getElementById('banner3') as HTMLImageElement;
    const logof = document.getElementById('logof') as HTMLImageElement;
    const lang = document.getElementById('lang') as HTMLImageElement;





    if (icon) {
      if (icon.src.includes('sun.png')) {
        icon.src = './assets/images/moon.png';
        logo.src='./assets/images/LOGOR.svg'
        logof.src='./assets/images/LOGOR.svg'
        lang.src='./assets/images/langb.png'
        banner1.src='./assets/images/16.jpg'
        banner2.src='./assets/images/6.jpg'
        banner3.src='./assets/images/17.jpg'



      } else {
        icon.src = './assets/images/sun.png';
        logo.src='./assets/images/LOGOW.svg'
        logof.src='./assets/images/LOGOW.svg'
        lang.src='./assets/images/langw.png'
        banner1.src='./assets/images/9.jpg'
        banner2.src='./assets/images/8.jpg'
        banner3.src='./assets/images/14.jpg'


      }
    }
  }
  private lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        navbar.classList.add('hidden');
      } else {
        // Scrolling up
        navbar.classList.remove('hidden');
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    }
  }
}