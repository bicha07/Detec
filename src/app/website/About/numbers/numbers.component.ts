import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Stat } from '../../interfaces/interface.stat';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

declare var windowLoadInit: any; // Global declaration for existing init function
declare var initializeToggleMenu: any; // Global declaration for toggle menu function

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit, AfterViewInit, OnDestroy {
  stats: Stat[] = [];
  currentTheme: string = 'ds';
  private routerSubscription: Subscription;

  constructor(private serviceService: ServiceService, private router: Router) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        this.reinitializeJQueryFunctions();
      }
    });
  }

  ngOnInit(): void {
    this.serviceService.getStats().subscribe(data => {
      this.stats = data;
      // Initialize animations after data is loaded
      this.initAnimations();
    });
  }

  // Method to update the content dynamically
  updateStatContent(updatedData: any): void {
    this.stats = updatedData.stats;
    // Reinitialize animations after updating data
    this.initAnimations();
  }

  ngAfterViewInit(): void {
    this.initAnimations();
    this.reinitializeJQueryFunctions();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'ds' ? 'ls' : 'ds';
  }

  private initAnimations(): void {
    if (typeof windowLoadInit === 'function') {
      windowLoadInit();
    }
  }

  private reinitializeJQueryFunctions(): void {
    if (typeof initializeToggleMenu === 'function') {
      initializeToggleMenu();
    }
  }
}
