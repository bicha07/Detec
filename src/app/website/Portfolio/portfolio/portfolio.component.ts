import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../service.service';
import { Portfolio } from '../../interfaces/interface.portfolio';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  portfolios: Portfolio[] = [];
  showModal: boolean = false;
  selectedIndex: number = 0;
  transform: string = 'translateX(0)';
  isDragging: boolean = false;
  startX: number = 0;
  currentX: number = 0;
  dragOffset: number = 0;
  baseUrl : String;
  @ViewChild('sliderTrack') sliderTrack!: ElementRef;

  constructor(private serviceService: ServiceService, private renderer: Renderer2) { 
    this.baseUrl = this.serviceService.apiUrlbase;
  }

  ngOnInit(): void {
    this.serviceService.getPortfolios().subscribe(data => {
      this.portfolios = data;
    });
  }

  ngAfterViewInit(): void {
    this.addDragListeners();
  }

  addDragListeners(): void {
    this.renderer.listen(this.sliderTrack.nativeElement, 'mousedown', this.onDragStart.bind(this));
    this.renderer.listen(this.sliderTrack.nativeElement, 'mousemove', this.onDragMove.bind(this));
    this.renderer.listen(document, 'mouseup', this.onDragEnd.bind(this));
    this.renderer.listen(this.sliderTrack.nativeElement, 'mouseleave', this.onDragEnd.bind(this));
    this.renderer.listen(this.sliderTrack.nativeElement, 'touchstart', this.onDragStart.bind(this));
    this.renderer.listen(this.sliderTrack.nativeElement, 'touchmove', this.onDragMove.bind(this));
    this.renderer.listen(this.sliderTrack.nativeElement, 'touchend', this.onDragEnd.bind(this));
  }

  openModal(index: number): void {
    this.selectedIndex = index;
    this.showModal = true;
    this.updateTransform();
  }

  closeModal(): void {
    this.showModal = false;
  }

  closeModalOnBackground(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  prevSlide(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.updateTransform();
    }
  }

  nextSlide(): void {
    if (this.selectedIndex < this.portfolios.length - 1) {
      this.selectedIndex++;
      this.updateTransform();
    }
  }

  goToSlide(index: number): void {
    this.selectedIndex = index;
    this.updateTransform();
  }

  updateTransform(): void {
    const width = 100; // Assuming each slide is 100% width
    this.transform = `translateX(-${this.selectedIndex * width}%)`;
  }

  onDragStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.currentX = this.startX;
    this.dragOffset = 0;
    event.preventDefault();
  }

  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    this.currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.dragOffset = this.currentX - this.startX;
    const width = this.sliderTrack.nativeElement.clientWidth;
    const maxDragOffset = this.selectedIndex * width;
    const minDragOffset = (this.portfolios.length - this.selectedIndex - 1) * width;

    // Prevent dragging beyond the first and last slides
    if (this.dragOffset > maxDragOffset) {
      this.dragOffset = maxDragOffset;
    } else if (-this.dragOffset > minDragOffset) {
      this.dragOffset = -minDragOffset;
    }

    this.sliderTrack.nativeElement.style.transform = `translateX(${this.transformOffset()}px)`;
  }

  onDragEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.dragOffset > 50 && this.selectedIndex > 0) {
      this.prevSlide();
    } else if (this.dragOffset < -50 && this.selectedIndex < this.portfolios.length - 1) {
      this.nextSlide();
    } else {
      this.updateTransform();
    }
    this.dragOffset = 0;
  }

  transformOffset(): number {
    const width = this.sliderTrack.nativeElement.clientWidth;
    const percentageOffset = (this.selectedIndex * -width) + this.dragOffset;
    return percentageOffset;
  }

  updatePortfolioContent(updatedData: any): void {
    this.portfolios = updatedData.portfolios;
  }
}
