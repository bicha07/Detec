import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Stat } from '../../../website/interfaces/interface.stat';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';
import { AlertComponent } from '../../../alert/alert.component';

@Component({
  selector: 'app-stat-post',
  standalone: true,
  templateUrl: './stat-post.component.html',
  styleUrls: ['./stat-post.component.css'],
  providers: [ServiceService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent, AlertComponent]
})
export class StatPostComponent implements OnInit {
  stats: Stat[] = [];
  showForm = false;
  isEditing = false;
  currentStat: Stat = new Stat(0, '', '', '');
  selectedFile: File | null = null;
  selectedIcon: string = '';
  selectedIconName: string = 'Select an icon';
  isOpen: boolean = false;

  alertType: string = '';
  alertMessage: string = '';

  icons = [
    { name: 'Address Book', class: 'fa fa-address-book' },
    { name: 'Address Book O', class: 'fa fa-address-book-o' },
    { name: 'Address Card', class: 'fa fa-address-card' },
    { name: 'Address Card O', class: 'fa fa-address-card-o' },
    { name: 'Bandcamp', class: 'fa fa-bandcamp' },
    { name: 'Bath', class: 'fa fa-bath' },
    { name: 'Bathtub', class: 'fa fa-bathtub' },
    { name: 'Drivers License', class: 'fa fa-drivers-license' },
    { name: 'Drivers License O', class: 'fa fa-drivers-license-o' },
    { name: 'Eercast', class: 'fa fa-eercast' },
    { name: 'Envelope Open', class: 'fa fa-envelope-open' },
    { name: 'Envelope Open O', class: 'fa fa-envelope-open-o' },
    { name: 'Etsy', class: 'fa fa-etsy' },
    { name: 'Free Code Camp', class: 'fa fa-free-code-camp' },
    { name: 'Grav', class: 'fa fa-grav' },
    { name: 'Handshake O', class: 'fa fa-handshake-o' },
    { name: 'ID Badge', class: 'fa fa-id-badge' },
    { name: 'ID Card', class: 'fa fa-id-card' },
    { name: 'ID Card O', class: 'fa fa-id-card-o' },
    { name: 'IMDB', class: 'fa fa-imdb' },
    { name: 'Linode', class: 'fa fa-linode' },
    { name: 'Meetup', class: 'fa fa-meetup' },
    { name: 'Microchip', class: 'fa fa-microchip' },
    { name: 'Podcast', class: 'fa fa-podcast' },
    { name: 'Quora', class: 'fa fa-quora' },
    { name: 'Ravelry', class: 'fa fa-ravelry' },
    { name: 'S15', class: 'fa fa-s15' },
    { name: 'Shower', class: 'fa fa-shower' },
    { name: 'Snowflake O', class: 'fa fa-snowflake-o' },
    { name: 'Superpowers', class: 'fa fa-superpowers' },
    { name: 'Telegram', class: 'fa fa-telegram' },
    { name: 'Thermometer', class: 'fa fa-thermometer' },
    { name: 'Thermometer 0', class: 'fa fa-thermometer-0' },
    { name: 'Thermometer 1', class: 'fa fa-thermometer-1' },
    { name: 'Thermometer 2', class: 'fa fa-thermometer-2' },
    { name: 'Thermometer 3', class: 'fa fa-thermometer-3' },
    { name: 'Thermometer 4', class: 'fa fa-thermometer-4' },
    { name: 'Thermometer Empty', class: 'fa fa-thermometer-empty' },
    { name: 'Thermometer Full', class: 'fa fa-thermometer-full' },
    { name: 'Thermometer Half', class: 'fa fa-thermometer-half' },
    { name: 'Thermometer Quarter', class: 'fa fa-thermometer-quarter' },
    { name: 'Thermometer Three Quarters', class: 'fa fa-thermometer-three-quarters' },
    { name: 'Times Rectangle', class: 'fa fa-times-rectangle' },
    { name: 'Times Rectangle O', class: 'fa fa-times-rectangle-o' },
    { name: 'User Circle', class: 'fa fa-user-circle' },
    { name: 'User Circle O', class: 'fa fa-user-circle-o' },
    { name: 'User O', class: 'fa fa-user-o' },
    { name: 'Vcard', class: 'fa fa-vcard' },
    { name: 'Vcard O', class: 'fa fa-vcard-o' },
    { name: 'Window Close', class: 'fa fa-window-close' },
    { name: 'Window Close O', class: 'fa fa-window-close-o' },
    { name: 'Window Maximize', class: 'fa fa-window-maximize' },
    { name: 'Window Minimize', class: 'fa fa-window-minimize' },
    { name: 'Window Restore', class: 'fa fa-window-restore' },
    { name: 'Wpexplorer', class: 'fa fa-wpexplorer' },
    { name: 'Adjust', class: 'fa fa-adjust' },
    { name: 'American Sign Language Interpreting', class: 'fa fa-american-sign-language-interpreting' },
    { name: 'Anchor', class: 'fa fa-anchor' },
    { name: 'Archive', class: 'fa fa-archive' },
    { name: 'Area Chart', class: 'fa fa-area-chart' },
    { name: 'Arrows', class: 'fa fa-arrows' },
    { name: 'Arrows H', class: 'fa fa-arrows-h' },
    { name: 'Arrows V', class: 'fa fa-arrows-v' },
    { name: 'Asl Interpreting', class: 'fa fa-asl-interpreting' },
    { name: 'Assistive Listening Systems', class: 'fa fa-assistive-listening-systems' },
    { name: 'Asterisk', class: 'fa fa-asterisk' },
    { name: 'At', class: 'fa fa-at' },
    { name: 'Audio Description', class: 'fa fa-audio-description' },
    { name: 'Automobile', class: 'fa fa-automobile' },
    { name: 'Balance Scale', class: 'fa fa-balance-scale' },
    { name: 'Ban', class: 'fa fa-ban' },
    { name: 'Bank', class: 'fa fa-bank' },
    { name: 'Bar Chart', class: 'fa fa-bar-chart' },
    { name: 'Bar Chart O', class: 'fa fa-bar-chart-o' },
    { name: 'Barcode', class: 'fa fa-barcode' },
    { name: 'Bars', class: 'fa fa-bars' },
    { name: 'Battery', class: 'fa fa-battery' },
    { name: 'Battery 0', class: 'fa fa-battery-0' },
    { name: 'Battery 1', class: 'fa fa-battery-1' },
    { name: 'Battery 2', class: 'fa fa-battery-2' },
    { name: 'Battery 3', class: 'fa fa-battery-3' },
    { name: 'Battery 4', class: 'fa fa-battery-4' },
    { name: 'Battery Empty', class: 'fa fa-battery-empty' },
    { name: 'Battery Full', class: 'fa fa-battery-full' },
    { name: 'Battery Half', class: 'fa fa-battery-half' },
    { name: 'Battery Quarter', class: 'fa fa-battery-quarter' },
    { name: 'Battery Three Quarters', class: 'fa fa-battery-three-quarters' },
    { name: 'Bed', class: 'fa fa-bed' },
    { name: 'Beer', class: 'fa fa-beer' },
    { name: 'Bell', class: 'fa fa-bell' },
    { name: 'Bell O', class: 'fa fa-bell-o' },
    { name: 'Bell Slash', class: 'fa fa-bell-slash' },
    { name: 'Bell Slash O', class: 'fa fa-bell-slash-o' },
    { name: 'Bicycle', class: 'fa fa-bicycle' },
    { name: 'Binoculars', class: 'fa fa-binoculars' },
    { name: 'Birthday Cake', class: 'fa fa-birthday-cake' },
    { name: 'Blind', class: 'fa fa-blind' },
    { name: 'Bluetooth', class: 'fa fa-bluetooth' },
    { name: 'Bluetooth B', class: 'fa fa-bluetooth-b' },
    { name: 'Bolt', class: 'fa fa-bolt' },
    { name: 'Bomb', class: 'fa fa-bomb' },
    { name: 'Book', class: 'fa fa-book' },
    { name: 'Bookmark', class: 'fa fa-bookmark' },
    { name: 'Bookmark O', class: 'fa fa-bookmark-o' },
    { name: 'Braille', class: 'fa fa-braille' },
    { name: 'Briefcase', class: 'fa fa-briefcase' },
    { name: 'Bug', class: 'fa fa-bug' },
    { name: 'Building', class: 'fa fa-building' },
    { name: 'Building O', class: 'fa fa-building-o' },
    { name: 'Bullhorn', class: 'fa fa-bullhorn' },
    { name: 'Bullseye', class: 'fa fa-bullseye' },
    { name: 'Bus', class: 'fa fa-bus' },
    { name: 'Cab', class: 'fa fa-cab' },
    { name: 'Calculator', class: 'fa fa-calculator' },
    { name: 'Calendar', class: 'fa fa-calendar' },
    { name: 'Calendar Check O', class: 'fa fa-calendar-check-o' },
    { name: 'Calendar Minus O', class: 'fa fa-calendar-minus-o' },
    { name: 'Calendar O', class: 'fa fa-calendar-o' },
    { name: 'Calendar Plus O', class: 'fa fa-calendar-plus-o' },
    { name: 'Calendar Times O', class: 'fa fa-calendar-times-o' },
    { name: 'Camera', class: 'fa fa-camera' },
    { name: 'Camera Retro', class: 'fa fa-camera-retro' },
    { name: 'Car', class: 'fa fa-car' },
    { name: 'Caret Square O Down', class: 'fa fa-caret-square-o-down' },
    { name: 'Caret Square O Left', class: 'fa fa-caret-square-o-left' },
    { name: 'Caret Square O Right', class: 'fa fa-caret-square-o-right' },
    { name: 'Caret Square O Up', class: 'fa fa-caret-square-o-up' },
    { name: 'Cart Arrow Down', class: 'fa fa-cart-arrow-down' },
    { name: 'Cart Plus', class: 'fa fa-cart-plus' },
    { name: 'Cc', class: 'fa fa-cc' },
    { name: 'Certificate', class: 'fa fa-certificate' },
    { name: 'Check', class: 'fa fa-check' },
    { name: 'Check Circle', class: 'fa fa-check-circle' },
    { name: 'Check Circle O', class: 'fa fa-check-circle-o' },
    { name: 'Check Square', class: 'fa fa-check-square' },
    { name: 'Check Square O', class: 'fa fa-check-square-o' },
    { name: 'Child', class: 'fa fa-child' },
    { name: 'Circle', class: 'fa fa-circle' },
    { name: 'Circle O', class: 'fa fa-circle-o' },
    { name: 'Circle O Notch', class: 'fa fa-circle-o-notch' },
    { name: 'Circle Thin', class: 'fa fa-circle-thin' },
    { name: 'Clock O', class: 'fa fa-clock-o' },
    { name: 'Clone', class: 'fa fa-clone' },
    { name: 'Close', class: 'fa fa-close' },
    { name: 'Cloud', class: 'fa fa-cloud' },
    { name: 'Cloud Download', class: 'fa fa-cloud-download' },
    { name: 'Cloud Upload', class: 'fa fa-cloud-upload' },
    { name: 'Code', class: 'fa fa-code' },
    { name: 'Code Fork', class: 'fa fa-code-fork' },
    { name: 'Coffee', class: 'fa fa-coffee' },
    { name: 'Cog', class: 'fa fa-cog' },
    { name: 'Cogs', class: 'fa fa-cogs' },
    { name: 'Comment', class: 'fa fa-comment' },
    { name: 'Comment O', class: 'fa fa-comment-o' },
    { name: 'Commenting', class: 'fa fa-commenting' },
    { name: 'Commenting O', class: 'fa fa-commenting-o' },
    { name: 'Comments', class: 'fa fa-comments' },
    { name: 'Comments O', class: 'fa fa-comments-o' },
    { name: 'Compass', class: 'fa fa-compass' },
    { name: 'Copyright', class: 'fa fa-copyright' },
    { name: 'Creative Commons', class: 'fa fa-creative-commons' },
    { name: 'Credit Card', class: 'fa fa-credit-card' },
    { name: 'Credit Card Alt', class: 'fa fa-credit-card-alt' },
    { name: 'Crop', class: 'fa fa-crop' },
    { name: 'Crosshairs', class: 'fa fa-crosshairs' },
    { name: 'Cube', class: 'fa fa-cube' },
    { name: 'Cubes', class: 'fa fa-cubes' },
    { name: 'Cutlery', class: 'fa fa-cutlery' },
    { name: 'Dashboard', class: 'fa fa-dashboard' },
    { name: 'Database', class: 'fa fa-database' },
    { name: 'Deaf', class: 'fa fa-deaf' },
    { name: 'Deafness', class: 'fa fa-deafness' },
    { name: 'Desktop', class: 'fa fa-desktop' },
    { name: 'Diamond', class: 'fa fa-diamond' },
    { name: 'Dot Circle O', class: 'fa fa-dot-circle-o' },
    { name: 'Download', class: 'fa fa-download' },
    { name: 'Edit', class: 'fa fa-edit' },
    { name: 'Ellipsis H', class: 'fa fa-ellipsis-h' },
    { name: 'Ellipsis V', class: 'fa fa-ellipsis-v' },
    { name: 'Envelope', class: 'fa fa-envelope' },
    { name: 'Envelope O', class: 'fa fa-envelope-o' },
    { name: 'Envelope Open', class: 'fa fa-envelope-open' },
    { name: 'Envelope Open O', class: 'fa fa-envelope-open-o' },
    { name: 'Envelope Square', class: 'fa fa-envelope-square' },
    { name: 'Eraser', class: 'fa fa-eraser' },
    { name: 'Exchange', class: 'fa fa-exchange' },
    { name: 'Exclamation', class: 'fa fa-exclamation' },
    { name: 'Exclamation Circle', class: 'fa fa-exclamation-circle' },
    { name: 'Exclamation Triangle', class: 'fa fa-exclamation-triangle' },
    { name: 'External Link', class: 'fa fa-external-link' },
    { name: 'External Link Square', class: 'fa fa-external-link-square' },
    { name: 'Eye', class: 'fa fa-eye' },
    { name: 'Eye Slash', class: 'fa fa-eye-slash' },
    { name: 'Eyedropper', class: 'fa fa-eyedropper' },
    { name: 'Fax', class: 'fa fa-fax' },
    { name: 'Feed', class: 'fa fa-feed' },
    { name: 'Female', class: 'fa fa-female' },
    { name: 'Fighter Jet', class: 'fa fa-fighter-jet' },
    { name: 'File Archive O', class: 'fa fa-file-archive-o' },
    { name: 'File Audio O', class: 'fa fa-file-audio-o' },
    { name: 'File Code O', class: 'fa fa-file-code-o' },
    { name: 'File Excel O', class: 'fa fa-file-excel-o' },
    { name: 'File Image O', class: 'fa fa-file-image-o' },
    { name: 'File Movie O', class: 'fa fa-file-movie-o' },
    { name: 'File PDF O', class: 'fa fa-file-pdf-o' },
    { name: 'File Photo O', class: 'fa fa-file-photo-o' },
    { name: 'File Picture O', class: 'fa fa-file-picture-o' },
    { name: 'File Powerpoint O', class: 'fa fa-file-powerpoint-o' },
    { name: 'File Sound O', class: 'fa fa-file-sound-o' },
    { name: 'File Video O', class: 'fa fa-file-video-o' },
    { name: 'File Word O', class: 'fa fa-file-word-o' },
    { name: 'File Zip O', class: 'fa fa-file-zip-o' },
    { name: 'Film', class: 'fa fa-film' },
    { name: 'Filter', class: 'fa fa-filter' },
    { name: 'Fire', class: 'fa fa-fire' },
    { name: 'Fire Extinguisher', class: 'fa fa-fire-extinguisher' },
    { name: 'Flag', class: 'fa fa-flag' },
    { name: 'Flag Checkered', class: 'fa fa-flag-checkered' },
    { name: 'Flag O', class: 'fa fa-flag-o' },
    { name: 'Flash', class: 'fa fa-flash' },
    { name: 'Flask', class: 'fa fa-flask' },
    { name: 'Folder', class: 'fa fa-folder' },
    { name: 'Folder O', class: 'fa fa-folder-o' },
    { name: 'Folder Open', class: 'fa fa-folder-open' },
    { name: 'Folder Open O', class: 'fa fa-folder-open-o' },
    { name: 'Frown O', class: 'fa fa-frown-o' },
    { name: 'Futbol O', class: 'fa fa-futbol-o' },
    { name: 'Gamepad', class: 'fa fa-gamepad' },
    { name: 'Gavel', class: 'fa fa-gavel' },
    { name: 'Gear', class: 'fa fa-gear' },
    { name: 'Gears', class: 'fa fa-gears' },
    { name: 'Gift', class: 'fa fa-gift' },
    { name: 'Glass', class: 'fa fa-glass' },
    { name: 'Globe', class: 'fa fa-globe' },
    { name: 'Graduation Cap', class: 'fa fa-graduation-cap' },
    { name: 'Group', class: 'fa fa-group' },
    { name: 'Hand Grab O', class: 'fa fa-hand-grab-o' },
    { name: 'Hand Lizard O', class: 'fa fa-hand-lizard-o' },
    { name: 'Hand Paper O', class: 'fa fa-hand-paper-o' },
    { name: 'Hand Peace O', class: 'fa fa-hand-peace-o' },
    { name: 'Hand Pointer O', class: 'fa fa-hand-pointer-o' },
    { name: 'Hand Rock O', class: 'fa fa-hand-rock-o' },
    { name: 'Hand Scissors O', class: 'fa fa-hand-scissors-o' },
    { name: 'Hand Spock O', class: 'fa fa-hand-spock-o' },
    { name: 'Hand Stop O', class: 'fa fa-hand-stop-o' },
    { name: 'Hard of Hearing', class: 'fa fa-hard-of-hearing' },
    { name: 'Hashtag', class: 'fa fa-hashtag' },
    { name: 'Hdd O', class: 'fa fa-hdd-o' },
    { name: 'Headphones', class: 'fa fa-headphones' },
    { name: 'Heart', class: 'fa fa-heart' },
    { name: 'Heart O', class: 'fa fa-heart-o' },
    { name: 'Heartbeat', class: 'fa fa-heartbeat' },
    { name: 'History', class: 'fa fa-history' },
    { name: 'Home', class: 'fa fa-home' },
    { name: 'Hotel', class: 'fa fa-hotel' },
    { name: 'Hourglass', class: 'fa fa-hourglass' },
    { name: 'Hourglass 1', class: 'fa fa-hourglass-1' },
    { name: 'Hourglass 2', class: 'fa fa-hourglass-2' },
    { name: 'Hourglass 3', class: 'fa fa-hourglass-3' },
    { name: 'Hourglass End', class: 'fa fa-hourglass-end' },
    { name: 'Hourglass Half', class: 'fa fa-hourglass-half' },
    { name: 'Hourglass O', class: 'fa fa-hourglass-o' },
    { name: 'Hourglass Start', class: 'fa fa-hourglass-start' },
    { name: 'I Cursor', class: 'fa fa-i-cursor' },
    { name: 'Image', class: 'fa fa-image' },
    { name: 'Inbox', class: 'fa fa-inbox' },
    { name: 'Industry', class: 'fa fa-industry' },
    { name: 'Info', class: 'fa fa-info' },
    { name: 'Info Circle', class: 'fa fa-info-circle' },
    { name: 'Institution', class: 'fa fa-institution' },
    { name: 'Key', class: 'fa fa-key' },
    { name: 'Keyboard O', class: 'fa fa-keyboard-o' },
    { name: 'Language', class: 'fa fa-language' },
    { name: 'Laptop', class: 'fa fa-laptop' },
    { name: 'Leaf', class: 'fa fa-leaf' },
    { name: 'Legal', class: 'fa fa-legal' },
    { name: 'Lemon O', class: 'fa fa-lemon-o' },
    { name: 'Level Down', class: 'fa fa-level-down' },
    { name: 'Level Up', class: 'fa fa-level-up' },
    { name: 'Life Bouy', class: 'fa fa-life-bouy' },
    { name: 'Life Buoy', class: 'fa fa-life-buoy' },
    { name: 'Life Ring', class: 'fa fa-life-ring' },
    { name: 'Life Saver', class: 'fa fa-life-saver' },
    { name: 'Lightbulb O', class: 'fa fa-lightbulb-o' },
    { name: 'Line Chart', class: 'fa fa-line-chart' },
    { name: 'Location Arrow', class: 'fa fa-location-arrow' },
    { name: 'Lock', class: 'fa fa-lock' },
    { name: 'Low Vision', class: 'fa fa-low-vision' },
    { name: 'Magic', class: 'fa fa-magic' },
    { name: 'Magnet', class: 'fa fa-magnet' },
    { name: 'Mail Forward', class: 'fa fa-mail-forward' },
    { name: 'Mail Reply', class: 'fa fa-mail-reply' },
    { name: 'Mail Reply All', class: 'fa fa-mail-reply-all' },
    { name: 'Male', class: 'fa fa-male' },
    { name: 'Map', class: 'fa fa-map' },
    { name: 'Map Marker', class: 'fa fa-map-marker' },
    { name: 'Map O', class: 'fa fa-map-o' },
    { name: 'Map Pin', class: 'fa fa-map-pin' },
    { name: 'Map Signs', class: 'fa fa-map-signs' },
    { name: 'Meh O', class: 'fa fa-meh-o' },
    { name: 'Microphone', class: 'fa fa-microphone' },
    { name: 'Microphone Slash', class: 'fa fa-microphone-slash' },
    { name: 'Minus', class: 'fa fa-minus' },
    { name: 'Minus Circle', class: 'fa fa-minus-circle' },
    { name: 'Minus Square', class: 'fa fa-minus-square' },
    { name: 'Minus Square O', class: 'fa fa-minus-square-o' },
    { name: 'Mobile', class: 'fa fa-mobile' },
    { name: 'Mobile Phone', class: 'fa fa-mobile-phone' },
    { name: 'Money', class: 'fa fa-money' },
    { name: 'Moon O', class: 'fa fa-moon-o' },
    { name: 'Mortar Board', class: 'fa fa-mortar-board' },
    { name: 'Motorcycle', class: 'fa fa-motorcycle' },
    { name: 'Mouse Pointer', class: 'fa fa-mouse-pointer' },
    { name: 'Music', class: 'fa fa-music' },
    { name: 'Navicon', class: 'fa fa-navicon' },
    { name: 'Newspaper O', class: 'fa fa-newspaper-o' },
    { name: 'Object Group', class: 'fa fa-object-group' },
    { name: 'Object Ungroup', class: 'fa fa-object-ungroup' },
    { name: 'Paint Brush', class: 'fa fa-paint-brush' },
    { name: 'Paper Plane', class: 'fa fa-paper-plane' },
    { name: 'Paper Plane O', class: 'fa fa-paper-plane-o' },
    { name: 'Paw', class: 'fa fa-paw' },
    { name: 'Pencil', class: 'fa fa-pencil' },
    { name: 'Pencil Square', class: 'fa fa-pencil-square' },
    { name: 'Pencil Square O', class: 'fa fa-pencil-square-o' },
    { name: 'Percent', class: 'fa fa-percent' },
    { name: 'Phone', class: 'fa fa-phone' },
    { name: 'Phone Square', class: 'fa fa-phone-square' },
    { name: 'Photo', class: 'fa fa-photo' },
    { name: 'Picture O', class: 'fa fa-picture-o' },
    { name: 'Pie Chart', class: 'fa fa-pie-chart' },
    { name: 'Plane', class: 'fa fa-plane' },
    { name: 'Plug', class: 'fa fa-plug' },
    { name: 'Plus', class: 'fa fa-plus' },
    { name: 'Plus Circle', class: 'fa fa-plus-circle' },
    { name: 'Plus Square', class: 'fa fa-plus-square' },
    { name: 'Plus Square O', class: 'fa fa-plus-square-o' },
    { name: 'Power Off', class: 'fa fa-power-off' },
    { name: 'Print', class: 'fa fa-print' },
    { name: 'Puzzle Piece', class: 'fa fa-puzzle-piece' },
    { name: 'Qrcode', class: 'fa fa-qrcode' },
    { name: 'Question', class: 'fa fa-question' },
    { name: 'Question Circle', class: 'fa fa-question-circle' },
    { name: 'Question Circle O', class: 'fa fa-question-circle-o' },
    { name: 'Quote Left', class: 'fa fa-quote-left' },
    { name: 'Quote Right', class: 'fa fa-quote-right' },
    { name: 'Random', class: 'fa fa-random' },
    { name: 'Recycle', class: 'fa fa-recycle' },
    { name: 'Refresh', class: 'fa fa-refresh' },
    { name: 'Registered', class: 'fa fa-registered' },
    { name: 'Remove', class: 'fa fa-remove' },
    { name: 'Reorder', class: 'fa fa-reorder' },
    { name: 'Reply', class: 'fa fa-reply' },
    { name: 'Reply All', class: 'fa fa-reply-all' },
    { name: 'Retweet', class: 'fa fa-retweet' },
    { name: 'Road', class: 'fa fa-road' },
    { name: 'Rocket', class: 'fa fa-rocket' },
    { name: 'Rss', class: 'fa fa-rss' },
    { name: 'Rss Square', class: 'fa fa-rss-square' },
    { name: 'Search', class: 'fa fa-search' },
    { name: 'Search Minus', class: 'fa fa-search-minus' },
    { name: 'Search Plus', class: 'fa fa-search-plus' },
    { name: 'Send', class: 'fa fa-send' },
    { name: 'Send O', class: 'fa fa-send-o' },
    { name: 'Server', class: 'fa fa-server' },
    { name: 'Share', class: 'fa fa-share' },
    { name: 'Share Alt', class: 'fa fa-share-alt' },
    { name: 'Share Alt Square', class: 'fa fa-share-alt-square' },
    { name: 'Share Square', class: 'fa fa-share-square' },
    { name: 'Share Square O', class: 'fa fa-share-square-o' },
    { name: 'Shield', class: 'fa fa-shield' },
    { name: 'Ship', class: 'fa fa-ship' },
    { name: 'Shopping Bag', class: 'fa fa-shopping-bag' },
    { name: 'Shopping Basket', class: 'fa fa-shopping-basket' },
    { name: 'Shopping Cart', class: 'fa fa-shopping-cart' },
    { name: 'Sign In', class: 'fa fa-sign-in' },
    { name: 'Sign Language', class: 'fa fa-sign-language' },
    { name: 'Sign Out', class: 'fa fa-sign-out' },
    { name: 'Signal', class: 'fa fa-signal' },
    { name: 'Signing', class: 'fa fa-signing' },
    { name: 'Sitemap', class: 'fa fa-sitemap' },
    { name: 'Sliders', class: 'fa fa-sliders' },
    { name: 'Smile O', class: 'fa fa-smile-o' },
    { name: 'Snowflake O', class: 'fa fa-snowflake-o' },
    { name: 'Soccer Ball O', class: 'fa fa-soccer-ball-o' },
    { name: 'Sort', class: 'fa fa-sort' },
    { name: 'Sort Alpha Asc', class: 'fa fa-sort-alpha-asc' },
    { name: 'Sort Alpha Desc', class: 'fa fa-sort-alpha-desc' },
    { name: 'Sort Amount Asc', class: 'fa fa-sort-amount-asc' },
    { name: 'Sort Amount Desc', class: 'fa fa-sort-amount-desc' },
    { name: 'Sort Asc', class: 'fa fa-sort-asc' },
    { name: 'Sort Desc', class: 'fa fa-sort-desc' },
    { name: 'Sort Down', class: 'fa fa-sort-down' },
    { name: 'Sort Numeric Asc', class: 'fa fa-sort-numeric-asc' },
    { name: 'Sort Numeric Desc', class: 'fa fa-sort-numeric-desc' },
    { name: 'Sort Up', class: 'fa fa-sort-up' },
    { name: 'Space Shuttle', class: 'fa fa-space-shuttle' },
    { name: 'Spinner', class: 'fa fa-spinner' },
    { name: 'Spoon', class: 'fa fa-spoon' },
    { name: 'Square', class: 'fa fa-square' },
    { name: 'Square O', class: 'fa fa-square-o' },
    { name: 'Star', class: 'fa fa-star' },
    { name: 'Star Half', class: 'fa fa-star-half' },
    { name: 'Star Half Empty', class: 'fa fa-star-half-empty' },
    { name: 'Star Half Full', class: 'fa fa-star-half-full' },
    { name: 'Star Half O', class: 'fa fa-star-half-o' },
    { name: 'Star O', class: 'fa fa-star-o' },
    { name: 'Sticky Note', class: 'fa fa-sticky-note' },
    { name: 'Sticky Note O', class: 'fa fa-sticky-note-o' },
    { name: 'Street View', class: 'fa fa-street-view' },
    { name: 'Suitcase', class: 'fa fa-suitcase' },
    { name: 'Sun O', class: 'fa fa-sun-o' },
    { name: 'Support', class: 'fa fa-support' },
    { name: 'Tablet', class: 'fa fa-tablet' },
    { name: 'Tachometer', class: 'fa fa-tachometer' },
    { name: 'Tag', class: 'fa fa-tag' },
    { name: 'Tags', class: 'fa fa-tags' },
    { name: 'Tasks', class: 'fa fa-tasks' },
    { name: 'Taxi', class: 'fa fa-taxi' },
    { name: 'Television', class: 'fa fa-television' },
    { name: 'Terminal', class: 'fa fa-terminal' },
    { name: 'Thermometer', class: 'fa fa-thermometer' },
    { name: 'Thermometer 0', class: 'fa fa-thermometer-0' },
    { name: 'Thermometer 1', class: 'fa fa-thermometer-1' },
    { name: 'Thermometer 2', class: 'fa fa-thermometer-2' },
    { name: 'Thermometer 3', class: 'fa fa-thermometer-3' },
    { name: 'Thermometer 4', class: 'fa fa-thermometer-4' },
    { name: 'Thermometer Empty', class: 'fa fa-thermometer-empty' },
    { name: 'Thermometer Full', class: 'fa fa-thermometer-full' },
    { name: 'Thermometer Half', class: 'fa fa-thermometer-half' },
    { name: 'Thermometer Quarter', class: 'fa fa-thermometer-quarter' },
    { name: 'Thermometer Three Quarters', class: 'fa fa-thermometer-three-quarters' },
    { name: 'Thumb Tack', class: 'fa fa-thumb-tack' },
    { name: 'Thumbs Down', class: 'fa fa-thumbs-down' },
    { name: 'Thumbs O Down', class: 'fa fa-thumbs-o-down' },
    { name: 'Thumbs O Up', class: 'fa fa-thumbs-o-up' },
    { name: 'Thumbs Up', class: 'fa fa-thumbs-up' },
    { name: 'Ticket', class: 'fa fa-ticket' },
    { name: 'Times', class: 'fa fa-times' },
    { name: 'Times Circle', class: 'fa fa-times-circle' },
    { name: 'Times Circle O', class: 'fa fa-times-circle-o' },
    { name: 'Times Rectangle', class: 'fa fa-times-rectangle' },
    { name: 'Times Rectangle O', class: 'fa fa-times-rectangle-o' },
    { name: 'Tint', class: 'fa fa-tint' },
    { name: 'Toggle Down', class: 'fa fa-toggle-down' },
    { name: 'Toggle Left', class: 'fa fa-toggle-left' },
    { name: 'Toggle Off', class: 'fa fa-toggle-off' },
    { name: 'Toggle On', class: 'fa fa-toggle-on' },
    { name: 'Toggle Right', class: 'fa fa-toggle-right' },
    { name: 'Toggle Up', class: 'fa fa-toggle-up' },
    { name: 'Trademark', class: 'fa fa-trademark' },
    { name: 'Trash', class: 'fa fa-trash' },
    { name: 'Trash O', class: 'fa fa-trash-o' },
    { name: 'Tree', class: 'fa fa-tree' },
    { name: 'Trophy', class: 'fa fa-trophy' },
    { name: 'Truck', class: 'fa fa-truck' },
    { name: 'Tty', class: 'fa fa-tty' },
    { name: 'Tv', class: 'fa fa-tv' },
    { name: 'Umbrella', class: 'fa fa-umbrella' },
    { name: 'Universal Access', class: 'fa fa-universal-access' },
    { name: 'University', class: 'fa fa-university' },
    { name: 'Unlock', class: 'fa fa-unlock' },
    { name: 'Unlock Alt', class: 'fa fa-unlock-alt' },
    { name: 'Unsorted', class: 'fa fa-unsorted' },
    { name: 'Upload', class: 'fa fa-upload' },
    { name: 'User', class: 'fa fa-user' },
    { name: 'User Circle', class: 'fa fa-user-circle' },
    { name: 'User Circle O', class: 'fa fa-user-circle-o' },
    { name: 'User O', class: 'fa fa-user-o' },
    { name: 'User Plus', class: 'fa fa-user-plus' },
    { name: 'User Secret', class: 'fa fa-user-secret' },
    { name: 'User Times', class: 'fa fa-user-times' },
    { name: 'Users', class: 'fa fa-users' },
    { name: 'Vcard', class: 'fa fa-vcard' },
    { name: 'Vcard O', class: 'fa fa-vcard-o' },
    { name: 'Video Camera', class: 'fa fa-video-camera' },
    { name: 'Volume Control Phone', class: 'fa fa-volume-control-phone' },
    { name: 'Volume Down', class: 'fa fa-volume-down' },
    { name: 'Volume Off', class: 'fa fa-volume-off' },
    { name: 'Volume Up', class: 'fa fa-volume-up' },
    { name: 'Warning', class: 'fa fa-warning' },
    { name: 'Wheelchair', class: 'fa fa-wheelchair' },
    { name: 'Wheelchair Alt', class: 'fa fa-wheelchair-alt' },
    { name: 'Wifi', class: 'fa fa-wifi' },
    { name: 'Window Close', class: 'fa fa-window-close' },
    { name: 'Window Close O', class: 'fa fa-window-close-o' },
    { name: 'Window Maximize', class: 'fa fa-window-maximize' },
    { name: 'Window Minimize', class: 'fa fa-window-minimize' },
    { name: 'Window Restore', class: 'fa fa-window-restore' },
    { name: 'Wrench', class: 'fa fa-wrench' }
  ];

  constructor(private StatService: ServiceService, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.StatService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.setAlert('success', 'Statistiques chargées avec succès.');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
        this.setAlert('danger', 'Erreur lors du chargement des statistiques.');
      }
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentStat = new Stat(0, '', '', '');
    this.selectedFile = null;
  }

  onEdit(stat: Stat): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentStat = Object.assign({}, stat);
    this.selectedFile = null;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.isEditing) {
      if (this.selectedFile) {
        this.currentStat.photo = this.selectedIcon;
        this.saveStat();
      } else {
        this.saveStat();
      }
    } else {
      const formData = new FormData();
      formData.append('photo', this.selectedIcon);
      formData.append('title', this.currentStat.title);
      formData.append('percent', this.currentStat.percent);

      this.StatService.createStat(formData).subscribe({
        next: () => {
          this.loadStats();
          this.setAlert('success', 'Statistique ajoutée avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la statistique:', error);
          this.setAlert('danger', 'Erreur lors de l\'ajout de la statistique.');
        }
      });
    }
    this.closeForm();
  }

  saveStat(): void {
    const updatedStat: Partial<Stat> = {
      title: this.currentStat.title,
      percent: this.currentStat.percent,
      photo: this.selectedIcon,
    };

    if (this.isEditing) {
      this.StatService.updateStat(this.currentStat.id, updatedStat).subscribe({
        next: () => {
          this.loadStats();
          this.setAlert('primary', 'Statistique mise à jour avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la statistique:', error);
          this.setAlert('danger', 'Erreur lors de la mise à jour de la statistique.');
        }
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette statistique ?')) {
      this.StatService.deleteStat(id).subscribe({
        next: () => {
          this.loadStats();
          this.setAlert('danger', 'Statistique supprimée avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la statistique:', error);
          this.setAlert('danger', 'Erreur lors de la suppression de la statistique.');
        }
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }

  setAlert(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;

    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectIcon(icon: { name: string, class: string }, event: Event): void {
    event.stopPropagation();
    this.selectedIcon = icon.class;
    this.selectedIconName = icon.name;
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
