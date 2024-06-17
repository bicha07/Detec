import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [  CommonModule,  BrowserModule, NgxMapLibreGLModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

}
