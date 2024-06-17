import { Component, Renderer2, ElementRef, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

declare var windowLoadInit: any; // Declare the function globally

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'] // Fixed typo: styleUrl -> styleUrls
})
export class BannerComponent implements AfterViewInit, OnDestroy {
  private routerSubscription: Subscription | undefined;

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) {
    this.handleMobileView();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleMobileView();
  }

  ngAfterViewInit() {
    // Initialize animations after the view is initialized
    this.initAnimations();

    // Subscribe to router events to reinitialize animations on route changes
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.initAnimations();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private handleMobileView(): void {
    const width = window.innerWidth;
    if (width <= 768) {
      // Apply overflow-x hidden when on mobile view
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'overflow-x', 'hidden');
    } else {
      // Reset style when not on mobile view
      this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body, 'overflow-x');
    }
  }

  private initAnimations() {
    if (typeof windowLoadInit === 'function') {
      windowLoadInit(); // Call the global animation initialization function
    }
  }
}
