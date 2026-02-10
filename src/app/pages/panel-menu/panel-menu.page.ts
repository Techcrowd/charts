import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CoPanelMenuComponent, PanelMenu } from '../../components/co-panel-menu/co-panel-menu.component';
import { MarkdownComponent, LanguagePipe } from 'ngx-markdown';

// SVG paths (Heroicons solid 20x20)
const ICONS = {
  creditCard: 'M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z',
  wallet: 'M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0117.25 17H2.75A1.75 1.75 0 011 15.25V4.75zm13.5 7a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z',
  chartBar: 'M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v12.5a.75.75 0 01-1.5 0V3.5H3.5v12.5a.75.75 0 01-1.5 0V3.5h-.25A.75.75 0 011 2.75zM5 11a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm5-4a1 1 0 011 1v7a1 1 0 11-2 0V8a1 1 0 011-1zm5-2a1 1 0 011 1v9a1 1 0 11-2 0V6a1 1 0 011-1z',
  cog: 'M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z',
  users: 'M7 8a3 3 0 100-6 3 3 0 000 6zm7.5 1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z',
};

@Component({
  selector: 'app-panel-menu-page',
  standalone: true,
  imports: [AsyncPipe, CoPanelMenuComponent, MarkdownComponent, LanguagePipe],
  templateUrl: './panel-menu.page.html',
})
export class PanelMenuPage {
  // Demo data
  favoriteItems: PanelMenu[] = [
    { label: 'Hlavní účet CZK', routerLink: '/ucet-czk' },
    { label: 'Spořicí účet', routerLink: '/sporici' },
  ];

  overviewItems: PanelMenu[] = [
    {
      icon: ICONS.wallet,
      label: 'Účty a platby',
      expandable: true,
      items: [
        { label: 'Hlavní účet CZK', routerLink: '/ucet-czk' },
        { label: 'EUR účet', routerLink: '/ucet-eur' },
        { label: 'Spořicí účet', routerLink: '/sporici' },
        { label: 'Trvalé příkazy', routerLink: '/trvale-prikazy' },
      ],
    },
    {
      icon: ICONS.creditCard,
      label: 'Karty',
      expandable: true,
      items: [
        { label: 'Debetní karta', routerLink: '/debetni' },
        { label: 'Kreditní karta', routerLink: '/kreditni' },
      ],
    },
    {
      icon: ICONS.chartBar,
      label: 'Investice',
      expandable: true,
      items: [
        { label: 'Podílové fondy', routerLink: '/fondy' },
        { label: 'Akcie', routerLink: '/akcie' },
        { label: 'Dluhopisy', routerLink: '/dluhopisy' },
      ],
    },
    {
      icon: ICONS.users,
      label: 'Pojištění',
      expandable: false,
      routerLink: '/pojisteni',
    },
    {
      icon: ICONS.cog,
      label: 'Nastavení',
      expandable: false,
      routerLink: '/nastaveni',
    },
  ];

  // Empty menu for minimal demo
  emptyFavorites: PanelMenu[] = [];

  // Interakce log
  lastAction$ = new BehaviorSubject<string>('Žádná');

  onItemClick(item: PanelMenu): void {
    this.lastAction$.next(`Klik: ${item.label} → ${item.routerLink || '—'}`);
  }

  onFavoriteToggle(item: PanelMenu): void {
    this.lastAction$.next(`Oblíbené toggle: ${item.label}`);
    const idx = this.favoriteItems.findIndex(f => f.label === item.label);
    if (idx >= 0) {
      this.favoriteItems = this.favoriteItems.filter((_, i) => i !== idx);
    } else {
      this.favoriteItems = [...this.favoriteItems, { label: item.label, routerLink: item.routerLink }];
    }
  }

  // Code examples
  code = {
    basic: `<co-panel-menu
  [overviewItems]="menuItems"
  [favoriteItems]="favorites"
  (itemClick)="onItemClick($event)"
  (favoriteToggle)="onToggle($event)"
/>`,
    interface: `export interface PanelMenu {
  icon?: string;       // SVG path pro ikonu
  label: string;
  items?: PanelMenu[]; // podpoložky
  routerLink?: string;
  expanded?: boolean;
  expandable?: boolean;
}`,
    data: `overviewItems: PanelMenu[] = [
  {
    icon: ICONS.wallet,
    label: 'Účty a platby',
    expandable: true,
    items: [
      { label: 'Hlavní účet CZK', routerLink: '/ucet-czk' },
      { label: 'EUR účet', routerLink: '/ucet-eur' },
    ],
  },
  {
    icon: ICONS.cog,
    label: 'Nastavení',
    expandable: false,
    routerLink: '/nastaveni',
  },
];`,
    loading: `<co-panel-menu [isLoading]="true" />`,
    noFavorites: `<co-panel-menu
  [overviewItems]="menuItems"
  [showFavoriteIcons]="false"
/>`,
  };
}
