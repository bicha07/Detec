import { AfterViewInit, Component, ChangeDetectorRef, OnInit, AfterContentChecked } from '@angular/core';
import { Partner } from '../../interfaces/interface.partner';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
import { ContactTel } from '../../interfaces/interface.contactTel';
import { ContactEmail } from '../../interfaces/interface.contactEmail';

declare var $: any; // Declare jQuery
declare var initializeOwlCarousel: any; // Declare the function
declare var removeDirectChildOwlStageItems: any; // Declare the function


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit, AfterContentChecked {
  contactstel: ContactTel[] = [];
  contactsemail: ContactEmail[] = [];
  partners: Partner[] = [];
  baseUrl : String;
  private isCarouselInitialized = false;

  constructor(private serviceService: ServiceService, private cdr: ChangeDetectorRef) {
    this.baseUrl = this.serviceService.apiUrlbase;

  }

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
    this.serviceService.getPartners().subscribe(data => {
      this.partners = data;
      this.destroyCarousel();
      this.cdr.detectChanges();
    });

    this.serviceService.getContactsTel().subscribe(data => {
      this.contactstel = data;
      this.cdr.detectChanges();
    });

    this.serviceService.getContactsEmail().subscribe(data => {
      this.contactsemail = data;
      this.cdr.detectChanges();
    });
  }

  checkInitialization(): void {
    if (this.partners.length && !this.isCarouselInitialized) {
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

  updatePartnersContent(updatedData: any): void {
    this.partners = updatedData.partners;
    this.destroyCarousel();
    this.cdr.detectChanges();
  }

  updateContactTelContent(updatedData: any): void {
    this.contactstel = updatedData.contactstel;
    this.cdr.detectChanges();
  }

  updateContactEmailContent(updatedData: any): void {
    this.contactsemail = updatedData.contactsemail;
    this.cdr.detectChanges();
  }
}
