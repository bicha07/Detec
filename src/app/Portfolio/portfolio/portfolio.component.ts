import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GalleryService } from './gallery.service';
import { Portfolio } from '../../interfaces/interface.portfolio';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet,CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements AfterViewInit{
  private galleryItem!: HTMLCollectionOf<Element>;
  private lightBoxContainer!: HTMLElement;
  private lightBoxContent!: HTMLElement;
  private lightBoxImg!: HTMLImageElement;
  private sliderexit!: HTMLImageElement;
  private lightBoxPrev!: HTMLElement;
  private lightBoxNext!: HTMLElement;
  private index: number = 1;
  constructor(private galleryService: GalleryService,private renderer: Renderer2,private serviceService: ServiceService) {}
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.serviceService.getPortfolios().subscribe(data => {
      this.portfolios = data;
    });
    this.galleryService.init('.gallery', '.gallery-track', '.card');
    this.galleryItem = document.getElementsByClassName('gallery-item');
    this.lightBoxContainer = this.renderer.createElement('div');
    this.lightBoxContent = this.renderer.createElement('div');
    this.sliderexit = this.renderer.createElement('div');
    this.lightBoxImg = this.renderer.createElement('img');
    this.lightBoxPrev = this.renderer.createElement('div');
    this.lightBoxNext = this.renderer.createElement('div');

    this.lightBoxContainer.classList.add('lightbox');
    this.lightBoxContent.classList.add('lightbox-content');
    this.sliderexit.classList.add('slider-exit' , 'fa' , 'fa-times');
    this.lightBoxPrev.classList.add('fa', 'fa-angle-left', 'lightbox-prev');
    this.lightBoxNext.classList.add('fa', 'fa-angle-right', 'lightbox-next');

    this.renderer.appendChild(this.lightBoxContent, this.sliderexit);
    this.renderer.appendChild(this.lightBoxContent, this.lightBoxImg);
    this.renderer.appendChild(this.lightBoxContent, this.lightBoxPrev);
    this.renderer.appendChild(this.lightBoxContent, this.lightBoxNext);
    this.renderer.appendChild(this.lightBoxContainer, this.lightBoxContent);
    this.renderer.appendChild(document.body, this.lightBoxContainer);

    for (let i = 0; i < this.galleryItem.length; i++) {
      this.galleryItem[i].addEventListener('click', this.currentImage.bind(this));
    }

    this.lightBoxPrev.addEventListener('click', this.prevImage.bind(this));
    this.lightBoxNext.addEventListener('click', this.nextImage.bind(this));
    this.lightBoxContainer.addEventListener('click', this.closeLightBox.bind(this));
    this.sliderexit.addEventListener('click', this.closeFromX.bind(this));
  }
  showLightBox(n: number): void {
    if (n > this.galleryItem.length) {
      this.index = 1;
    } else if (n < 1) {
      this.index = this.galleryItem.length;
    }
    const imageLocation = this.galleryItem[this.index - 1].children[0].getAttribute('src');
    if (imageLocation) {
      this.lightBoxImg.setAttribute('src', imageLocation);
    }
  }

  currentImage(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    this.lightBoxContainer.style.display = 'block';
    const imageIndex = parseInt(target.getAttribute('data-index') || '1', 10);
    this.showLightBox((this.index = imageIndex));
  }

  slideImage(n: number): void {
    this.showLightBox((this.index += n));
  }

  prevImage(): void {
    this.slideImage(-1);
  }

  nextImage(): void {
    this.slideImage(1);
  }

  closeLightBox(event: Event): void {
    if (event.target === this.lightBoxContainer) {
      this.lightBoxContainer.style.display = 'none';
    }
  }
  closeFromX(){
    this.lightBoxContainer.style.display = 'none';
  }
  portfolios: Portfolio[] = []; // Utilisez l'interface Category pour typer le tableau


  

  // Method to update the content dynamically
  updatePortfolioContent(updatedData: any): void {
    this.portfolios = updatedData.porfolios;
  }
}