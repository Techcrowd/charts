import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface MenuItem {
  label: string;
  path: string;
  ready: boolean;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  menuItems: MenuItem[] = [
    { label: 'Donut Chart', path: '/donut-chart', ready: true },
    { label: 'Column Chart', path: '/column-chart', ready: true },
    { label: 'Bar Chart', path: '/bar-chart', ready: true },
    { label: 'Value Performance Chart', path: '/value-performance-chart', ready: true },
  ];
}
