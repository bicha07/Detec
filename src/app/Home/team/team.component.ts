import { AfterViewInit, Component, ChangeDetectorRef, OnInit, AfterContentChecked } from '@angular/core';
import { Personne } from '../../interfaces/interface.personne';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

declare var $: any; // Declare jQuery
declare var initializeOwlCarousel: any; // Declare the function
declare var removeDirectChildOwlStageItems: any; // Declare the function

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, AfterViewInit, AfterContentChecked {
  personnes: Personne[] = [];

  private isCarouselInitialized = false;

  constructor(private serviceService: ServiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  ngAfterContentChecked(): void {
    this.checkInitialization();
  }

  loadAllData(): void {
    this.serviceService.getPersonnes().subscribe(data => {
      this.personnes = data;
      this.destroyCarousel();
      this.cdr.detectChanges();
    });
  }

  checkInitialization(): void {
    if (this.personnes.length && !this.isCarouselInitialized) {
      this.isCarouselInitialized = true;
      this.initializeCarousel();
    }
  }

  initializeCarousel(): void {
    setTimeout(() => {
      initializeOwlCarousel(); // Call the global function
      removeDirectChildOwlStageItems();
    }, 0); // Timeout to ensure DOM is updated before initializing the carousel
  }

  destroyCarousel(): void {
    setTimeout(() => {
      if (this.isCarouselInitialized) {
        $('.owl-carousel').trigger('destroy.owl.carousel').removeClass('owl-loaded');
        this.isCarouselInitialized = false;
      }
    }, 0); // Timeout to ensure DOM is updated before destroying the carousel
  }

  updatePersonneContent(updatedData: any): void {
    this.personnes = updatedData.personnes;
    this.destroyCarousel();
    this.cdr.detectChanges();
  }
}
