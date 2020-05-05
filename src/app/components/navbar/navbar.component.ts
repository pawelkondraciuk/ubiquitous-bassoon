import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() isHandset: boolean;

  @Output() toggleSidebar = new EventEmitter();

  onMenuClick() {
    this.toggleSidebar.emit();
  }
}
