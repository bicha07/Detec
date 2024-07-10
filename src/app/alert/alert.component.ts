import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() type: string | undefined;
  @Input() message: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  get cssClass(): string {
    switch (this.type) {
      case 'primary':
        return 'alert-primary';
      case 'secondary':
        return 'alert-secondary';
      case 'success':
        return 'alert-success';
      case 'danger':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert-primary';
    }
  }
}
