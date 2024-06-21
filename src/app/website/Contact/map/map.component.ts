import { Component, AfterViewInit, ViewChild, ElementRef ,Renderer2,HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{
  @ViewChild('circleElement') circleElement!: ElementRef;
  leave_cap = true;
  isPopupVisible = false;
  isPopupPinned = false;
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngAfterViewInit(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.el.nativeElement.contains(e.target)) {
        this.isPopupVisible = false;
        this.isPopupPinned = false;
      }
    });
  }

  togglePopup(): void {
    this.isPopupVisible = true;
    this.isPopupPinned = !this.isPopupPinned;
  }

  hover_pop(): void {
    if (!this.isPopupPinned) {
      this.isPopupVisible = true;
    }
  }

  leave_pop(): void {
    if (!this.isPopupPinned) {
      this.isPopupVisible = false;
    }
  }

}
