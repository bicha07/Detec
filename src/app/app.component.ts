import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarComponent } from './website/navbar/navbar.component';


declare var windowLoadInit: any; // Global declaration for existing init function
declare var initializeToggleMenu: any; // Global declaration for toggle menu function

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent,RouterOutlet]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'canada';
  currentTheme: string = 'ds';
  private routerSubscription: Subscription;

  constructor(private router: Router) {
    // Listen to navigation end events
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to top of the viewport after each navigation
        window.scrollTo(0, 0);
        // Reinitialize jQuery functionalities after each navigation
        this.reinitializeJQueryFunctions();
      }
    });
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
}
