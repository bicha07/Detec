import { Injectable,Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private gallery: HTMLElement | null = null;
  private track: HTMLElement | null = null;
  private cards: NodeListOf<HTMLElement> | null = null;
  private easing: number = 0.05;
  private startY: number = 0;
  private endY: number = 0;
  private raf: number | null = null;
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
   }
   private lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }
  private updateScroll(): void {
    if (this.gallery && this.track) {
      this.startY = this.lerp(this.startY, this.endY, this.easing);
      this.renderer.setStyle(this.gallery, 'height', `${this.track.clientHeight}px`);
      this.renderer.setStyle(this.track, 'transform', `translateY(-${this.startY}px)`);
      this.activateParallax();
      this.raf = requestAnimationFrame(() => this.updateScroll());
      if (this.startY.toFixed(1) === window.scrollY.toFixed(1) && this.raf) {
        cancelAnimationFrame(this.raf);
      }
    }
  }

  private startScroll(): void {
    this.endY = window.scrollY;
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
    this.raf = requestAnimationFrame(() => this.updateScroll());
  }

  private parallax(card: HTMLElement): void {
    const wrapper = card.querySelector('.card-image-wrapper') as HTMLElement;
    if (wrapper) {
      const diff = card.offsetHeight - wrapper.offsetHeight;
      const { top } = card.getBoundingClientRect();
      const progress = top / window.innerHeight;
      const yPos = diff * progress;
      this.renderer.setStyle(wrapper, 'transform', `translateY(${yPos}px)`);
    }
  }

  private activateParallax(): void {
    if (this.cards) {
      this.cards.forEach(card => this.parallax(card));
    }
  }

  public init(gallerySelector: string, trackSelector: string, cardSelector: string): void {
    this.gallery = document.querySelector(gallerySelector);
    this.track = document.querySelector(trackSelector);
    this.cards = document.querySelectorAll(cardSelector);

    if (this.gallery && this.track && this.cards) {
      this.activateParallax();
      this.startScroll();

      window.addEventListener('load', () => this.updateScroll(), false);
      window.addEventListener('scroll', () => this.initScroll(), false);
      window.addEventListener('resize', () => this.updateScroll(), false);
    }
  }

  private initScroll(): void {
    this.activateParallax();
    this.startScroll();
  }
}
