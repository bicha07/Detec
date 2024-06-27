import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './website/navbar/navbar.component';
import { CommonModule } from '@angular/common';

declare var windowLoadInit: any; // Global declaration for existing init function
declare var initializeToggleMenu: any; // Global declaration for toggle menu function

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, NavbarComponent, RouterOutlet]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'canada';
  currentTheme: string = 'ds';
  showNavbar: boolean = true;
  private routerSubscription: Subscription;

  constructor(private router: Router) {
    // Listen to navigation end events
    this.routerSubscription = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbar = this.shouldShowNavbar(event.urlAfterRedirects);
      // Scroll to top of the viewport after each navigation
      window.scrollTo(0, 0);
      // Reinitialize jQuery functionalities after each navigation
      this.reinitializeJQueryFunctions();
    });
  }

  ngOnInit() {
    // Check initial route on component initialization
    this.showNavbar = this.shouldShowNavbar(this.router.url);
  }

  ngAfterViewInit() {
    // Initialize any animations after the view is initially loaded
    this.initAnimations();
    // Ensure that jQuery functionalities are initialized after the initial view is loaded
    this.reinitializeJQueryFunctions();
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leak
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleTheme() {
    // Toggle between 'ds' and 'ls' themes
    this.currentTheme = this.currentTheme === 'ds' ? 'ls' : 'ds';
  }

  private initAnimations() {
    // Call the global animation initialization function if it exists
    if (typeof windowLoadInit === 'function') {
      windowLoadInit();
    }
  }

  private reinitializeJQueryFunctions() {
    // Call the global function to initialize jQuery toggle menu if it exists
    if (typeof initializeToggleMenu === 'function') {
      initializeToggleMenu();
    }
  }

  private shouldShowNavbar(url: string): boolean {
    // Define routes that should show the navbar
    const navbarRoutes = [
      '',
      'home',
      'about',
      'contact',
      'services',
      'portfolio',
      'sg',
      'sgc',
      'registration',
      'resetpwd',
      'signup'
    ];
    // Check if the current route starts with any of the routes in the list
    return navbarRoutes.some(route => {
      const fullRoute = `/${route}`;
      return url === fullRoute || url.startsWith(`${fullRoute}/`);
    });
  }
}
