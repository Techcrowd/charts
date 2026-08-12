/** Convert component name to URL slug: "CO Button Bar Bottom" → "co-button-bar-bottom" */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/** Find component by slug */
export function findBySlug(slug: string): ShowcaseComponent | undefined {
  return SHOWCASE_CATALOG.find(c => slugify(c.name) === slug);
}

export enum ComponentCategory {
  CO_COMPONENTS = 'CO Components',
  ESSENTIALS = 'Essentials',
  TEMPLATES = 'Templates',
  IDS = 'IDS',
  AUXILIARY = 'Auxiliary',
  OTHERS = 'Others',
}

export interface ComponentInput {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentOutput {
  name: string;
  type: string;
  description: string;
}

export interface CodeExample {
  label: string;
  html: string;
  typescript?: string;
}

export interface ShowcaseComponent {
  name: string;
  version: string;
  category: ComponentCategory;
  description?: string;
  variants?: string[];
  inputs: ComponentInput[];
  outputs: ComponentOutput[];
  codeExamples: CodeExample[];
  screenshots?: string[];
}

export const SHOWCASE_CATALOG: ShowcaseComponent[] = [
  // ─── CO Components ───────────────────────────────────────────────────────────
  {
    name: 'CO Accordion Header',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Expandable accordion header with optional action buttons and dropdown.',
    inputs: [
      { name: '[title]', type: 'string', description: 'Header title text' },
      { name: '[headerActionButtonIcon]', type: 'string', description: 'Icon for the header action button' },
      { name: '[secondaryButtonLabel]', type: 'string', description: 'Label for secondary button' },
      { name: '[dropdownItemsList]', type: 'any[]', description: 'Items for the dropdown menu' },
      { name: '[isExpanded]', type: 'boolean', default: 'false', description: 'Whether the accordion is expanded' },
      { name: '[isLoading]', type: 'boolean', default: 'false', description: 'Show loading state' },
    ],
    outputs: [
      { name: '(headerButtonClickEvent)', type: 'EventEmitter<void>', description: 'Header action button clicked' },
      { name: '(secondaryButtonClickEvent)', type: 'EventEmitter<void>', description: 'Secondary button clicked' },
      { name: '(buttonDropdownItemClickEvent)', type: 'EventEmitter<any>', description: 'Dropdown item clicked' },
      { name: '(toggleHeader)', type: 'EventEmitter<boolean>', description: 'Accordion toggled' },
    ],
    codeExamples: [
      {
        label: 'Basic usage',
        html: `<co-accordion-header
  [title]="'Section Title'"
  [isExpanded]="true"
  (toggleHeader)="onToggle($event)">
  <p>Accordion content here</p>
</co-accordion-header>`,
      },
    ],
  },
  {
    name: 'CO Action Stack',
    version: '3.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Stack of action items displayed as a pile or a row.',
    variants: ['Pile', 'Row'],
    inputs: [
      { name: '[variant]', type: "'pile' | 'row'", default: "'pile'", description: 'Layout variant' },
      { name: '[items]', type: 'ActionItem[]', description: 'Array of action items to render' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Pile variant',
        html: `<co-action-stack variant="pile" [items]="actions"></co-action-stack>`,
      },
      {
        label: 'Row variant',
        html: `<co-action-stack variant="row" [items]="actions"></co-action-stack>`,
      },
    ],
  },
  {
    name: 'CO Button',
    version: '4.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Primary action button with multiple visual variants and width options.',
    variants: ['Primary', 'Secondary', 'Tertiary'],
    inputs: [
      { name: 'co-button', type: 'directive', description: 'Button directive selector' },
      { name: '[variant]', type: "'button-primary' | 'button-secondary' | 'button-tertiary'", description: 'Visual variant' },
      { name: '[label]', type: 'string', description: 'Button label text' },
      { name: '[width]', type: "'full-width' | 'in-line'", default: "'in-line'", description: 'Button width mode' },
      { name: '[disabled]', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: '[co-icon]', type: 'string', description: 'Optional icon name' },
    ],
    outputs: [
      { name: '(click)', type: 'EventEmitter<MouseEvent>', description: 'Button click event' },
    ],
    codeExamples: [
      {
        label: 'Primary — full width',
        html: `<button co-button variant="button-primary" label="$label" width="full-width"></button>`,
      },
      {
        label: 'Primary — inline',
        html: `<button co-button variant="button-primary" label="$label" width="in-line"></button>`,
      },
      {
        label: 'Primary — with icon',
        html: `<button co-button variant="button-primary" label="$Label" width="full-width">
  <co-icon [iconName]="'Home'" [iconSvgSize]="'icon-24'"></co-icon>
</button>`,
      },
      {
        label: 'Primary — disabled with icon',
        html: `<button disabled co-button variant="button-primary" label="$label" width="full-width" data-testid="coIconHome">
  <co-icon [iconName]="'Home'" [iconSvgSize]="'icon-24'"></co-icon>
</button>`,
      },
      {
        label: 'Secondary — full width',
        html: `<button co-button variant="button-secondary" label="$label" width="full-width"></button>`,
      },
      {
        label: 'Secondary — inline',
        html: `<button co-button variant="button-secondary" label="$label" width="in-line"></button>`,
      },
      {
        label: 'Tertiary — full width',
        html: `<button co-button variant="button-tertiary" label="$label" width="full-width"></button>`,
      },
      {
        label: 'Tertiary — inline',
        html: `<button co-button variant="button-tertiary" label="$label" width="in-line"></button>`,
      },
    ],
  },
  {
    name: 'CO Button Bar Bottom',
    version: '4.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Fixed bottom bar with up to 3 action buttons.',
    variants: ['One button', 'Two buttons', 'Primary + Tertiary'],
    inputs: [
      { name: 'content', type: 'projection', description: 'co-button elements (max 3)' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'One button',
        html: `<co-button-bar-bottom>
  <button co-button variant="button-primary" label="$label"></button>
</co-button-bar-bottom>`,
      },
      {
        label: 'One button — secondary',
        html: `<co-button-bar-bottom>
  <button co-button variant="button-secondary" label="$label"></button>
</co-button-bar-bottom>`,
      },
      {
        label: 'Two buttons',
        html: `<co-button-bar-bottom>
  <button co-button variant="button-primary" label="$label"></button>
  <button co-button variant="button-secondary" label="$label"></button>
</co-button-bar-bottom>`,
      },
      {
        label: 'Two buttons — primary and tertiary',
        html: `<co-button-bar-bottom>
  <button co-button variant="button-primary" label="$label"></button>
  <button co-button variant="button-tertiary" label="$label"></button>
</co-button-bar-bottom>`,
      },
    ],
  },
  {
    name: 'CO Button Bar Dynamic',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Dynamic button bar that adjusts layout based on content.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-button-bar-dynamic>\n  <button co-button variant="button-primary" label="Action"></button>\n</co-button-bar-dynamic>` },
    ],
  },
  {
    name: 'CO Button Bar Chat',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Button bar optimized for chat interface actions.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-button-bar-chat>\n  <button co-button variant="button-primary" label="Send"></button>\n</co-button-bar-chat>` },
    ],
  },
  {
    name: 'CO Button Bar Summary',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Button bar with summary information above actions.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-button-bar-summary>\n  <button co-button variant="button-primary" label="Submit"></button>\n</co-button-bar-summary>` },
    ],
  },
  {
    name: 'CO Button Dropdown',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Button that opens a dropdown menu with selectable items.',
    inputs: [
      { name: 'co-button-dropdown', type: 'directive', description: 'Dropdown button directive' },
      { name: '[variant]', type: 'string', description: 'Visual variant' },
      { name: '[label]', type: 'string', description: 'Button label' },
      { name: '[itemList]', type: 'DropdownItem[]', description: 'List of dropdown items' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Basic usage',
        html: `<button co-button-dropdown
  variant="button-primary"
  label="Options"
  [itemList]="dropdownItems">
</button>`,
      },
    ],
  },
  {
    name: 'CO Content Card',
    version: '5.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Versatile content card with multiple visual styles for different content types.',
    variants: ['Content Card', 'Promo', 'Notification', 'Promo Rating'],
    inputs: [
      { name: '[class]', type: "'card-primary' | 'card-secondary' | 'card-highlight'", description: 'Card style class' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Primary card',
        html: `<co-content-card class="card-primary">
  <h3>Primary Card</h3>
  <p>Primary Card</p>
  <p>Primary Card</p>
</co-content-card>`,
      },
      {
        label: 'Secondary card',
        html: `<co-content-card class="card-secondary">
  <h3>Secondary card</h3>
  <p>Secondary card</p>
  <p>Secondary card</p>
</co-content-card>`,
      },
      {
        label: 'Highlight card',
        html: `<co-content-card class="card-highlight">
  <h3>Highlight card</h3>
  <p>Highlight card</p>
  <p>Highlight card</p>
</co-content-card>`,
      },
    ],
  },
  {
    name: 'CO Datepicker',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Date picker component for selecting dates.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-datepicker></co-datepicker>` },
    ],
  },
  {
    name: 'CO Digit Picker',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Numeric picker with min/max range for selecting a digit value.',
    inputs: [
      { name: '[minValue]', type: 'number', description: 'Minimum selectable value' },
      { name: '[maxValue]', type: 'number', description: 'Maximum selectable value' },
      { name: '[selectedDigit]', type: 'number', description: 'Currently selected digit' },
    ],
    outputs: [
      { name: '(digitClick)', type: 'EventEmitter<number>', description: 'Digit selected' },
    ],
    codeExamples: [
      {
        label: 'Basic usage',
        html: `<co-digit-picker
  [minValue]="1"
  [maxValue]="12"
  [selectedDigit]="6"
  (digitClick)="onDigit($event)">
</co-digit-picker>`,
      },
    ],
  },
  {
    name: 'CO Divider',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Visual separator line between content sections.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-divider></co-divider>` },
    ],
  },
  {
    name: 'CO Document Rendering',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Component for rendering document previews (PDF, images, etc.).',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-document-rendering [document]="doc"></co-document-rendering>` },
    ],
  },
  {
    name: 'CO Dropdown',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Generic dropdown component.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-dropdown [items]="items"></co-dropdown>` },
    ],
  },
  {
    name: 'CO File QR Upload',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'File upload component with QR code scanning support.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-file-qr-upload></co-file-qr-upload>` },
    ],
  },
  {
    name: 'CO Header',
    version: '4.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'App header with multiple layout variants including navigation, content projection, and flow/dialog modes.',
    variants: ['Ground', 'Navigation menu', 'Content projection', 'Flow and Dialog', 'Bottom Sheet', 'Back button preset'],
    inputs: [
      { name: '[variant]', type: 'string', description: 'Header layout variant' },
      { name: 'content', type: 'projection', description: 'Content projection for co-icon, co-aux-avatar, etc.' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Ground',
        html: `<co-header
  [rightIconName]="'Placeholder'"
  [backClicksEvent]="notify(backButtonClicked)"
  [backButtonClicked]="notify(backButtonClicked?)"
>
  <co-glyph>
    <ng-container coPartIconLeft>
      <div class="flex justify-content-start layout-header-title">
        <h1 data-testid="coHeaderGroundTitle">$title</h1>
      </div>
    </ng-container>
  </co-glyph>
</co-header>`,
      },
      {
        label: 'Navigation menu',
        html: `<co-header variant="navigation-menu">
  <co-icon name="menu" slot="left"></co-icon>
  <span slot="center">$title</span>
  <co-aux-avatar slot="right" [iconName]="'Placeholder'"></co-aux-avatar>
</co-header>`,
      },
      {
        label: 'Content projection',
        html: `<co-header variant="content-projection">
  <ng-container coHeaderContent>
    <div class="custom-header-content">Custom content here</div>
  </ng-container>
</co-header>`,
      },
      {
        label: 'Flow and Dialog first or last step',
        html: `<co-header variant="flow-dialog">
  <co-icon name="close" slot="right" (click)="close()"></co-icon>
  <span slot="center">Step 1 of 3</span>
</co-header>`,
      },
      {
        label: 'Bottom Sheet',
        html: `<co-header variant="bottom-sheet">
  <span slot="center">$title</span>
  <co-icon name="close" slot="right"></co-icon>
</co-header>`,
      },
      {
        label: 'Back button preset',
        html: `<co-header variant="back-button" [backButtonClicked]="goBack()">
  <span slot="center">Detail</span>
</co-header>`,
      },
    ],
  },
  {
    name: 'CO Chart',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Chart component (v1) for data visualization.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-chart [data]="chartData" [options]="chartOptions"></co-chart>` },
    ],
  },
  {
    name: 'CO Chart V2',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Chart component (v2) with improved API and additional chart types.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-chart-v2 [data]="chartData" [config]="chartConfig"></co-chart-v2>` },
    ],
  },
  {
    name: 'CO Chart V4 Horizontal',
    version: '4.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Horizontal chart (v4) — account flows, savings progress and investments allocation variants with skeleton loading states.',
    variants: ['HorizontalAccount', 'HorizontalSavings', 'HorizontalInvestments'],
    inputs: [
      { name: '[variant]', type: `'account' | 'savings' | 'investments'`, description: 'Chart variant (required)' },
      { name: '[accountItems]', type: 'HorizontalAccountItem[]', default: '[]', description: 'Rows for the account variant (label, value, direction in/out)' },
      { name: '[savingsData]', type: 'HorizontalSavingsData', description: 'Data for the savings variant (label, value, maxLabel, maxValue)' },
      { name: '[sections]', type: 'HorizontalInvestmentsSection[]', default: '[]', description: 'Sections for the investments variant (name, value)' },
      { name: '[colors]', type: 'ChartColor[]', description: 'Custom section colors for investments (allowed palette only)' },
      { name: '[valueUnit]', type: 'string', description: `Unit appended to values (e.g. 'Kč', '%')` },
      { name: '[compactValues]', type: 'boolean', default: 'false', description: 'Shorten values (1 215 211 → 1,2M)' },
      { name: '[minSectionPercent]', type: 'number', default: '3', description: 'Minimum investments section width in % of bar' },
      { name: '[loading]', type: 'boolean', default: 'false', description: 'Show skeleton loading state' },
      { name: '[skeletonRowCount]', type: 'number', default: '2', description: 'Skeleton row count for the account variant' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Account',
        html: `<co-horizontal-chart variant="account" [accountItems]="items" [valueUnit]="'Kč'" />`,
        typescript: `items: HorizontalAccountItem[] = [
  { label: 'Odchozí platby', value: 42350, direction: 'out' },
  { label: 'Příchozí platby', value: 78500, direction: 'in' },
];`,
      },
      {
        label: 'Savings',
        html: `<co-horizontal-chart variant="savings" [savingsData]="savings" [valueUnit]="'Kč'" [compactValues]="true" />`,
        typescript: `savings: HorizontalSavingsData = {
  label: 'Naspořeno',
  value: 125000,
  maxLabel: 'Cíl',
  maxValue: 300000,
};`,
      },
      {
        label: 'Investments',
        html: `<co-horizontal-chart variant="investments" [sections]="sections" />`,
        typescript: `sections: HorizontalInvestmentsSection[] = [
  { name: 'Akcie', value: 1215211 },
  { name: 'Fondy', value: 845000 },
  { name: 'Dluhopisy', value: 620500 },
];`,
      },
    ],
  },
  {
    name: 'CO Illustrated Message',
    version: '1.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Full-page message with illustration, heading, text, and optional action buttons.',
    inputs: [
      { name: '[textHeading]', type: 'string', description: 'Heading text' },
      { name: '[text]', type: 'string', description: 'Message body text' },
      { name: '[illustration]', type: 'string', description: 'Illustration identifier' },
      { name: '[primaryButtonLabel]', type: 'string', description: 'Primary action button label' },
      { name: '[secondaryButtonLabel]', type: 'string', description: 'Secondary action button label' },
    ],
    outputs: [
      { name: '(primaryButtonClickEvent)', type: 'EventEmitter<void>', description: 'Primary button clicked' },
      { name: '(secondaryButtonClickEvent)', type: 'EventEmitter<void>', description: 'Secondary button clicked' },
    ],
    codeExamples: [
      {
        label: 'Error message',
        html: `<co-illustrated-message
  [textHeading]="'Something went wrong'"
  [text]="'Please try again later.'"
  [illustration]="'error'"
  [primaryButtonLabel]="'Retry'"
  (primaryButtonClickEvent)="onRetry()">
</co-illustrated-message>`,
      },
    ],
  },
  {
    name: 'CO Illustration',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Standalone illustration component for decorative or informational images.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-illustration name="empty-state"></co-illustration>` },
    ],
  },
  {
    name: 'CO Information List',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'List of key-value information pairs.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-information-list [items]="infoItems"></co-information-list>` },
    ],
  },
  {
    name: 'CO InlineMessage',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Inline notification message (info, success, warning, error).',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-inline-message type="info" message="This is an info message."></co-inline-message>` },
    ],
  },
  {
    name: 'CO Input',
    version: '7.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Text input component with basic, mega, and directive variants. Supports amount formatting via coAmount directive.',
    variants: ['Basic', 'Mega', 'Directive'],
    inputs: [
      { name: '[variant]', type: "'basic' | 'mega' | 'directive'", description: 'Input variant' },
      { name: '[formControl]', type: 'FormControl', description: 'Reactive form control' },
      { name: '[placeholder]', type: 'string', description: 'Placeholder text' },
      { name: '[coAmount]', type: 'directive', description: 'Amount formatting directive' },
      { name: '[integerPart]', type: 'number', description: 'Max integer digits (coAmount)' },
      { name: '[decimalPart]', type: 'number', description: 'Max decimal digits (coAmount)' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Basic',
        html: `<co-input-basic [variant]="'Basic'" data-testid="coInputBasic">
  <label for="basic" data-testid="coInputBasicLabel">Popisek</label>
  <input id="basic" coInput [formControl]="inputControl" data-testid="inputBasic" [attr.aria-label]="'Popisek' + 'Info message'" />
  <co-aux-message
    coInputMessage
    [messageIconDisplayed]="false"
    messageType="info"
    message="Info message"
    data-testid="coInputBasicAuxMessage"
  ></co-aux-message>
</co-input-basic>`,
      },
      {
        label: 'Basic Placeholder',
        html: `<co-input-basic [variant]="'Basic'">
  <label for="testId">Basic</label>
  <input id="testId" coInput placeholder="placeholder" [formControl]="inputControl" />
  <co-aux-message coInputMessage [messageIconDisplayed]="false" messageType="info" message="Info message"></co-aux-message>
</co-input-basic>`,
      },
      {
        label: 'Basic Error',
        html: `<co-input-basic [variant]="'Basic'">
  <label for="errorId">Error</label>
  <input id="errorId" coInput [formControl]="errorControl" />
  <co-aux-message coInputMessage messageType="error" message="Error message"></co-aux-message>
</co-input-basic>`,
      },
      {
        label: 'Basic Disabled',
        html: `<co-input-basic [variant]="'Basic'">
  <label for="disabledId">Disabled</label>
  <input id="disabledId" coInput [formControl]="disabledControl" disabled />
</co-input-basic>`,
      },
      {
        label: 'Mega input',
        html: `<co-input-basic [variant]="'Mega'">
  <label for="megaId">Amount</label>
  <input id="megaId" coInput [formControl]="amountCtrl" coAmount [integerPart]="10" [decimalPart]="2" />
</co-input-basic>`,
      },
    ],
  },
  {
    name: 'CO Input Date',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Date input field with calendar picker.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-input-date [formControl]="dateCtrl"></co-input-date>` },
    ],
  },
  {
    name: 'CO Input Date Shadow',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Date input with shadow DOM encapsulation.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-input-date-shadow [formControl]="dateCtrl"></co-input-date-shadow>` },
    ],
  },
  {
    name: 'CO Input Digits',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Input for entering digit sequences (e.g. PIN codes, verification codes).',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-input-digits [length]="6" (complete)="onCode($event)"></co-input-digits>` },
    ],
  },
  {
    name: 'CO Input Search Bar',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Search bar input with search icon and clear functionality.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-input-search-bar placeholder="Search..." (search)="onSearch($event)"></co-input-search-bar>` },
    ],
  },
  {
    name: 'CO Input Select',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Select input (dropdown) for choosing from predefined options.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-input-select [items]="options" [formControl]="selectCtrl"></co-input-select>` },
    ],
  },
  {
    name: 'CO Input SuperField',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Advanced input field with combined label, prefix/suffix, and validation.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-input-superfield [formControl]="ctrl" label="Amount" suffix="CZK"></co-input-superfield>` },
    ],
  },
  {
    name: 'CO Input TextArea',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Multi-line text area input.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-input-textarea [formControl]="textCtrl" placeholder="Enter text..."></co-input-textarea>` },
    ],
  },
  {
    name: 'CO Item Account Display',
    version: '1.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Account display item with configurable sections and message types.',
    inputs: [
      { name: '[showOwner]', type: 'boolean', default: 'true', description: 'Show account owner' },
      { name: '[showCaptions]', type: 'boolean', default: 'true', description: 'Show captions' },
      { name: '[showMessage]', type: 'boolean', default: 'false', description: 'Show message area' },
      { name: '[messageType]', type: "'info' | 'success' | 'error' | 'warning'", default: "'info'", description: 'Message visual type' },
      { name: '[width]', type: "'auto' | 'wide' | 'narrow'", default: "'auto'", description: 'Display width' },
      { name: '[loading]', type: 'boolean', default: 'false', description: 'Show loading state' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Basic account display',
        html: `<co-item-account-display
  [showOwner]="true"
  [showCaptions]="true"
  width="wide">
</co-item-account-display>`,
      },
    ],
  },
  {
    name: 'CO Item Autocomplete',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Autocomplete list item for search suggestions.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-item-autocomplete [items]="suggestions" (select)="onSelect($event)"></co-item-autocomplete>` },
    ],
  },
  {
    name: 'CO Item Display',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Generic display item for key-value data.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-item-display label="Name" value="John Doe"></co-item-display>` },
    ],
  },
  {
    name: 'CO Item Chat',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Chat message item with avatar and timestamp.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-item-chat [message]="chatMessage"></co-item-chat>` },
    ],
  },
  {
    name: 'CO Item Checkbox',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Checkbox list item.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-item-checkbox label="Accept terms" [formControl]="checkCtrl"></co-item-checkbox>` },
    ],
  },
  {
    name: 'CO Item Checkbox Tristate List',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Checkbox list with tristate (checked, unchecked, indeterminate) support.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-item-checkbox-tristate-list [items]="checkItems"></co-item-checkbox-tristate-list>` },
    ],
  },
  {
    name: 'CO Item Navigation',
    version: '5.2',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Navigation list item with multiple variants including success, error, warning, info, and loading states.',
    variants: ['Success', 'Error', 'Warning/Info', 'Loading'],
    inputs: [
      { name: '[variant]', type: "'navigation'", description: 'Item variant' },
      { name: '[label]', type: 'string', description: 'Primary label text' },
      { name: '[caption]', type: 'string', description: 'Secondary caption text' },
      { name: '[message]', type: 'string', description: 'Message text below caption' },
      { name: '[messageType]', type: "'success' | 'error' | 'warning' | 'info'", description: 'Message visual type' },
      { name: '[screenReaderText]', type: 'string', description: 'Custom screen reader text' },
      { name: 'coPartIconLeft', type: 'projection', description: 'Left icon slot (co-icon or co-aux-avatar)' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Success Destructive Off Icon 24',
        html: `<co-item
  variant="navigation"
  label="$label"
  caption="$caption"
  message="$message"
  messageType="success"
  [screenReaderText]="'custom screen reader text'"
>
  <co-icon coPartIconLeft [iconName]="'Placeholder'" [iconSvgSize]="'icon-24'"></co-icon>
</co-item>`,
      },
      {
        label: 'Success Destructive Off Icon 32',
        html: `<co-item
  variant="navigation"
  label="$label"
  caption="$caption"
  message="$message"
  messageType="success"
>
  <co-aux-avatar coPartIconLeft iconName="Placeholder"></co-aux-avatar>
</co-item>`,
      },
      {
        label: 'Success Destructive On Icon 24',
        html: `<co-item
  variant="navigation"
  label="-2000 CZK"
  caption="$caption"
  message="$message"
  messageType="success"
>
  <co-icon coPartIconLeft [iconName]="'Placeholder'" [iconSvgSize]="'icon-24'"></co-icon>
</co-item>`,
      },
      {
        label: 'Error',
        html: `<co-item
  variant="navigation"
  label="$label"
  caption="$caption"
  message="$message"
  messageType="error"
>
  <co-icon coPartIconLeft [iconName]="'Placeholder'" [iconSvgSize]="'icon-24'"></co-icon>
</co-item>`,
      },
    ],
  },
  {
    name: 'CO Item Radiobutton',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Radio button list item.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-item-radiobutton label="Option A" [value]="'a'" [formControl]="radioCtrl"></co-item-radiobutton>` },
    ],
  },
  {
    name: 'CO Item Switch',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Toggle switch list item.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-item-switch label="Notifications" [formControl]="switchCtrl"></co-item-switch>` },
    ],
  },
  {
    name: 'CO Item Transaction',
    version: '5.2',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Transaction list item with rich display options for financial transactions.',
    variants: ['Incoming', 'Outgoing', 'Waiting', 'Error', 'Done', 'Paused', 'Settlement', 'Inactive', 'Others', 'Loading', 'Payment', 'Showcase'],
    inputs: [
      { name: '[avatarSubIcon]', type: 'string', description: 'Sub-icon overlay on avatar' },
      { name: '[avatarIcon]', type: 'string', description: 'Main avatar icon' },
      { name: '[label]', type: 'string', description: 'Transaction label' },
      { name: '[caption]', type: 'string', description: 'Secondary caption text' },
      { name: '[value]', type: 'string', description: 'Primary value (amount)' },
      { name: '[secondaryValue]', type: 'string', description: 'Secondary value' },
      { name: '[tertiaryValue]', type: 'string', description: 'Tertiary value' },
      { name: '[tertiaryCaption]', type: 'string', description: 'Tertiary caption text' },
      { name: '[message]', type: 'string', description: 'Status message' },
      { name: '[messageType]', type: "'info' | 'success' | 'error' | 'warning'", description: 'Message visual type' },
      { name: '[valueColor]', type: 'string', description: 'Value text color' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Incoming transaction',
        html: `<co-item-transaction
  avatarIcon="arrow-down"
  label="Salary"
  caption="Company Inc."
  value="+45 000 CZK"
  valueColor="green">
</co-item-transaction>`,
      },
    ],
  },
  {
    name: 'CO Item Transaction Select',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Selectable transaction item with checkbox.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-item-transaction-select [transaction]="tx" (select)="onSelect($event)"></co-item-transaction-select>` },
    ],
  },
  {
    name: 'CO Listbox Menu',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Listbox-style menu with selectable items.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-listbox-menu [items]="menuItems" (select)="onSelect($event)"></co-listbox-menu>` },
    ],
  },
  {
    name: 'CO Modal Alert',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Modal alert dialog for confirmations and warnings.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-modal-alert\n  title="Confirm"\n  message="Are you sure?"\n  (confirm)="onConfirm()"\n  (cancel)="onCancel()">\n</co-modal-alert>` },
    ],
  },
  {
    name: 'CO Navigation',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Bottom navigation bar (v1).',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-navigation [items]="navItems" (navigate)="onNavigate($event)"></co-navigation>` },
    ],
  },
  {
    name: 'CO Navigation2',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Bottom navigation bar (v2) with improved API.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-navigation2 [items]="navItems" (navigate)="onNavigate($event)"></co-navigation2>` },
    ],
  },
  {
    name: 'CO Page Header Menu',
    version: '1.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Page header with optional action buttons and loading state.',
    variants: ['Default header', 'Loading state', 'Header with button', 'Header with icon button', 'Header with info button', 'Header with back button'],
    inputs: [
      { name: '[title]', type: 'string', description: 'Page title' },
      { name: '[loading]', type: 'boolean', default: 'false', description: 'Show loading state' },
      { name: '[showBackButton]', type: 'boolean', default: 'false', description: 'Show back button' },
      { name: '[actionButton]', type: 'string', description: 'Action button label' },
    ],
    outputs: [],
    codeExamples: [
      {
        label: 'Default header',
        html: `<co-page-header-menu [title]="'Dashboard'"></co-page-header-menu>`,
      },
      {
        label: 'With back button',
        html: `<co-page-header-menu [title]="'Detail'" [showBackButton]="true"></co-page-header-menu>`,
      },
    ],
  },
  {
    name: 'CO Paginator',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Pagination component for navigating through pages of data.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-paginator [totalItems]="100" [pageSize]="10" (pageChange)="onPage($event)"></co-paginator>` },
    ],
  },
  {
    name: 'CO Panel Menu',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Expandable panel menu with favorites, icons, and nested items.',
    inputs: [
      { name: '[overviewItems]', type: 'PanelMenu[]', description: 'Menu items' },
      { name: '[favoriteItems]', type: 'PanelMenu[]', description: 'Favorite items' },
      { name: '[showFavoriteIcons]', type: 'boolean', default: 'true', description: 'Show favorite toggle icons' },
      { name: '[isLoading]', type: 'boolean', default: 'false', description: 'Loading state' },
    ],
    outputs: [
      { name: '(itemClick)', type: 'EventEmitter<PanelMenu>', description: 'Item clicked' },
      { name: '(favoriteToggle)', type: 'EventEmitter<PanelMenu>', description: 'Favorite toggled' },
    ],
    codeExamples: [
      {
        label: 'Basic usage',
        html: `<co-panel-menu
  [overviewItems]="menuItems"
  [favoriteItems]="favorites"
  (itemClick)="onItemClick($event)"
  (favoriteToggle)="onToggle($event)">
</co-panel-menu>`,
      },
    ],
  },
  {
    name: 'CO Panel Menu Settings',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Panel menu variant for settings/preferences screens.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-panel-menu-settings [items]="settingsItems"></co-panel-menu-settings>` },
    ],
  },
  {
    name: 'CO Personalisation',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Component for user personalisation options (themes, colors, layout).',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-personalisation></co-personalisation>` },
    ],
  },
  {
    name: 'CO Product',
    version: '1.3',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Product card for displaying financial products with rich variant support.',
    variants: ['insurance', 'loan', 'primary', 'other', 'subheader', 'investment', 'investment external', 'current account', 'savings', 'envelope'],
    inputs: [
      { name: '[variant]', type: 'string', description: 'Product type variant' },
      { name: '[name]', type: 'string', description: 'Product name' },
      { name: '[value]', type: 'string', description: 'Product value' },
      { name: '[currency]', type: 'string', description: 'Currency code' },
      { name: '[number]', type: 'string', description: 'Account/product number' },
      { name: '[overdraft]', type: 'string', description: 'Overdraft amount' },
      { name: '[trustee]', type: 'string', description: 'Trustee name' },
      { name: '[message]', type: 'string', description: 'Status message' },
      { name: '[messageType]', type: 'string', description: 'Message type' },
      { name: '[investmentCaption]', type: 'string', description: 'Investment caption' },
      { name: '[investmentYieldPerformance]', type: 'string', description: 'Yield performance value' },
      { name: '[investmentPerformance]', type: 'string', description: 'Performance percentage' },
      { name: '[investmentPeriod]', type: 'string', description: 'Investment period' },
      { name: '[enabled]', type: 'boolean', default: 'true', description: 'Enabled state' },
    ],
    outputs: [
      { name: '(click)', type: 'EventEmitter<void>', description: 'Product card clicked' },
    ],
    codeExamples: [
      {
        label: 'variant: insurance',
        html: `<co-product variant="insurance" name="$name" caption="$caption" (click)="test()" message="$message" messageType="info"></co-product>`,
      },
      {
        label: 'variant: detail-insurance',
        html: `<co-product variant="detail-insurance" name="$name" caption="$caption"></co-product>`,
      },
      {
        label: 'variant: loan',
        html: `<co-product variant="loan" name="$name" caption="$caption" message="$message" messageType="info"></co-product>`,
      },
      {
        label: 'variant: primary',
        html: `<co-product variant="primary" name="$name" value="125 430" currency="CZK" number="123-4567890/0100" overdraft="50 000" message="$message" messageType="success"></co-product>`,
      },
      {
        label: 'variant: current account',
        html: `<co-product variant="current account" name="$name" value="125 430" currency="CZK" number="123-4567890/0100"></co-product>`,
      },
      {
        label: 'variant: savings',
        html: `<co-product variant="savings" name="$name" value="50 000" currency="CZK" number="987-6543210/0300"></co-product>`,
      },
      {
        label: 'variant: investment',
        html: `<co-product variant="investment" name="$name" value="50 000" currency="CZK" investmentCaption="Výnos" investmentPerformance="+5.2%" investmentPeriod="1Y"></co-product>`,
      },
      {
        label: 'variant: envelope',
        html: `<co-product variant="envelope" name="$name" value="10 000" currency="CZK"></co-product>`,
      },
    ],
  },
  {
    name: 'CO Product Account / Card',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Combined account and card product display.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-product-account-card [account]="account"></co-product-account-card>` },
    ],
  },
  {
    name: 'CO Product Card',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Card-style product display.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-product-card [product]="product"></co-product-card>` },
    ],
  },
  {
    name: 'CO Product Detail',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Detailed product view with all product information.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-product-detail [product]="product"></co-product-detail>` },
    ],
  },
  {
    name: 'CO Promo Content Card',
    version: '6.0',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Promotional content card with title, caption, image, and action handlers.',
    inputs: [
      { name: '[title]', type: 'string', description: 'Promo title' },
      { name: '[caption]', type: 'string', description: 'Promo caption text' },
      { name: '[image]', type: 'string', description: 'Image URL' },
    ],
    outputs: [
      { name: '(clickEvent)', type: 'EventEmitter<void>', description: 'Card clicked' },
      { name: '(closeEvent)', type: 'EventEmitter<void>', description: 'Card dismissed' },
    ],
    codeExamples: [
      {
        label: 'Basic promo card',
        html: `<co-promo-content-card
  [title]="'New Feature'"
  [caption]="'Try our latest product'"
  [image]="'assets/promo.png'"
  (clickEvent)="onPromoClick()"
  (closeEvent)="onPromoDismiss()">
</co-promo-content-card>`,
      },
    ],
  },
  {
    name: 'CO Rating',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Star/value rating component.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-rating [value]="4" [max]="5" (ratingChange)="onRate($event)"></co-rating>` },
    ],
  },
  {
    name: 'CO Segmented Control',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Segmented control (tab-like toggle) for switching between views.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-segmented-control [segments]="['Day', 'Week', 'Month']" (change)="onSegment($event)"></co-segmented-control>` },
    ],
  },
  {
    name: 'CO Snackbar',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Snackbar/toast notification for brief messages.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-snackbar message="Operation successful" type="success"></co-snackbar>` },
    ],
  },
  {
    name: 'CO Spinner',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Loading spinner indicator.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-spinner></co-spinner>` },
    ],
  },
  {
    name: 'CO Tab',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Tab component for tabbed navigation.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-tab [tabs]="['Tab 1', 'Tab 2', 'Tab 3']" (tabChange)="onTab($event)"></co-tab>` },
    ],
  },
  {
    name: 'CO Tab Menu',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Tab-based menu for section navigation.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-tab-menu [items]="tabItems" (select)="onTabSelect($event)"></co-tab-menu>` },
    ],
  },
  {
    name: 'CO Text Heading',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Typography component for heading text with predefined styles.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-text-heading level="1">Page Title</co-text-heading>` },
    ],
  },
  {
    name: 'CO Text Paragraph',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Typography component for paragraph text with predefined styles.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-text-paragraph>Body text content here.</co-text-paragraph>` },
    ],
  },
  {
    name: 'CO Toolbar',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Toolbar with action buttons and icons.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-toolbar [actions]="toolbarActions"></co-toolbar>` },
    ],
  },
  {
    name: 'CO Tooltip',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Tooltip overlay for providing contextual information.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-tooltip text="Helpful information">\n  <button>Hover me</button>\n</co-tooltip>` },
    ],
  },
  {
    name: 'CO Transaction Detail',
    version: '',
    category: ComponentCategory.CO_COMPONENTS,
    description: 'Detailed view of a single transaction with all metadata.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-transaction-detail [transaction]="tx"></co-transaction-detail>` },
    ],
  },

  // ─── IDS Components ──────────────────────────────────────────────────────────
  {
    name: 'IDS Tooltip',
    version: '',
    category: ComponentCategory.IDS,
    description: 'Internal Design System tooltip component.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<ids-tooltip text="Info">\n  <span>Hover target</span>\n</ids-tooltip>` },
    ],
  },

  // ─── Essentials ──────────────────────────────────────────────────────────────
  {
    name: 'ES Colors',
    version: '',
    category: ComponentCategory.ESSENTIALS,
    description: 'Design token color palette: content, background, interactive, attention, dialog, and shadow tokens.',
    inputs: [],
    outputs: [],
    codeExamples: [
      {
        label: 'Color tokens',
        html: `<!-- Content tokens -->
color-content-primary
color-content-secondary
color-content-tertiary

<!-- Background tokens -->
color-background-primary
color-background-secondary

<!-- Interactive tokens -->
color-interactive-primary
color-interactive-on-primary

<!-- Attention tokens -->
color-attention-success
color-attention-warning
color-attention-error
color-attention-info`,
      },
    ],
  },
  {
    name: 'ES Icons',
    version: '',
    category: ComponentCategory.ESSENTIALS,
    description: 'Icon library with 120+ SVG icons available through the co-icon component.',
    inputs: [],
    outputs: [],
    codeExamples: [
      {
        label: 'Using icons',
        html: `<co-icon name="arrow-left"></co-icon>
<co-icon name="check" size="24"></co-icon>
<co-icon name="close" color="red"></co-icon>`,
      },
    ],
  },
  {
    name: 'ES Icon Flag',
    version: '',
    category: ComponentCategory.ESSENTIALS,
    description: 'Country flag icon variants.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<es-icon-flag country="cz"></es-icon-flag>` },
    ],
  },
  {
    name: 'ES Icon / Interaction Icon / SubIcon',
    version: '',
    category: ComponentCategory.ESSENTIALS,
    description: 'Icon variants: standard icons, interactive icons with hover/focus states, and sub-icons for overlays.',
    inputs: [],
    outputs: [],
    codeExamples: [
      {
        label: 'Icon types',
        html: `<!-- Standard icon -->
<es-icon name="settings"></es-icon>

<!-- Interaction icon (with hover state) -->
<es-interaction-icon name="edit" (click)="onEdit()"></es-interaction-icon>

<!-- SubIcon (overlay on avatar) -->
<es-sub-icon name="verified"></es-sub-icon>`,
      },
    ],
  },
  {
    name: 'ES Illustration',
    version: '',
    category: ComponentCategory.ESSENTIALS,
    description: 'Illustration assets for empty states, onboarding, and informational screens.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<es-illustration name="empty-inbox"></es-illustration>` },
    ],
  },
  {
    name: 'ES Surface Effect',
    version: '',
    category: ComponentCategory.ESSENTIALS,
    description: 'Surface effect styles (elevation, shadows, blur) for card and container elements.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Surface levels', html: `<div class="surface-effect-level-1">Subtle shadow</div>\n<div class="surface-effect-level-2">Medium shadow</div>\n<div class="surface-effect-level-3">Strong shadow</div>` },
    ],
  },
  {
    name: 'ES Text Styles',
    version: '',
    category: ComponentCategory.ESSENTIALS,
    description: 'Typography scale: headings, body, caption, and label text styles with weight variants.',
    inputs: [],
    outputs: [],
    codeExamples: [
      {
        label: 'Text styles',
        html: `<!-- Headings -->
<span class="heading-primary">Heading Primary</span>
<span class="heading-secondary">Heading Secondary</span>

<!-- Body -->
<span class="body-primary">Body Primary</span>
<span class="body-secondary">Body Secondary</span>

<!-- Caption -->
<span class="caption-primary">Caption Primary</span>
<span class="caption-secondary">Caption Secondary</span>`,
      },
    ],
  },

  // ─── Auxiliary ────────────────────────────────────────────────────────────────
  {
    name: 'Avatar',
    version: '',
    category: ComponentCategory.AUXILIARY,
    description: 'Avatar component for user/entity profile images with fallback initials.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-aux-avatar [src]="avatarUrl" [initials]="'MN'" size="40"></co-aux-avatar>` },
    ],
  },

  // ─── Templates ───────────────────────────────────────────────────────────────
  {
    name: 'TMPL Corporate Header',
    version: '',
    category: ComponentCategory.TEMPLATES,
    description: 'Template for corporate-style page header with branding.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<tmpl-corporate-header [logo]="logoUrl" [title]="'Corporate App'"></tmpl-corporate-header>` },
    ],
  },
  {
    name: 'TMPL Section Header',
    version: '1.0',
    category: ComponentCategory.TEMPLATES,
    description: 'Section header with avatar, title, microbutton, and action buttons. Single-line: vertically centered. Multi-line: avatar and buttons stay at top, title expands down.',
    variants: ['Single line', 'Multi-line (wide)', 'Multi-line (narrow)'],
    inputs: [
      { name: '[title]', type: 'string', description: 'Section title text' },
      { name: '[avatarIcon]', type: 'string', default: "'Person'", description: 'Avatar icon name' },
      { name: '[showMicrobutton]', type: 'boolean', default: 'true', description: 'Show link/edit microbutton' },
    ],
    outputs: [
      { name: '(microbuttonClick)', type: 'EventEmitter<void>', description: 'Microbutton clicked' },
    ],
    codeExamples: [
      {
        label: 'Tailwind template',
        html: `<!-- Key: items-start + leading-8 on title (32px = avatar height)
     Single line → all 32px tall → looks centered
     Multi line  → title grows down, rest stays top -->
<div class="flex items-start gap-3 py-3 px-4 border border-gray-300 rounded-lg bg-white">
  <co-aux-avatar iconName="Person" avatarSize="small"></co-aux-avatar>
  <h6 class="flex-1 min-w-0 font-bold text-base leading-8 m-0 break-words">
    Nadpis sekce
  </h6>
  <button class="w-8 h-8 flex items-center justify-center rounded-full shrink-0
                 text-gray-400 hover:text-gray-900 hover:bg-gray-100">
    <co-icon iconName="edit" iconSvgSize="icon-16" tabindex="0"></co-icon>
  </button>
  <div class="flex items-center gap-2 shrink-0">
    <button co-button variant="button-secondary" label="Stáhnout" width="in-line"></button>
    <button co-button variant="button-secondary" label="\u22EE" width="in-line"></button>
  </div>
</div>`,
      },
      {
        label: 'Multi-line (Tailwind)',
        html: `<div class="flex items-start gap-3 py-3 px-4 border border-gray-300 rounded-lg bg-white">
  <co-aux-avatar iconName="Person" avatarSize="small"></co-aux-avatar>
  <h6 class="flex-1 min-w-0 font-bold text-base leading-8 m-0 break-words">
    Nesmyslně dlouhý a komplikovaný nadpis sekce, který se nevejde na řádek
  </h6>
  <button class="w-8 h-8 flex items-center justify-center rounded-full shrink-0
                 text-gray-400 hover:text-gray-900 hover:bg-gray-100">
    <co-icon iconName="edit" iconSvgSize="icon-16" tabindex="0"></co-icon>
  </button>
  <div class="flex items-center gap-2 shrink-0">
    <button co-button variant="button-secondary" label="Stáhnout" width="in-line"></button>
    <button co-button variant="button-secondary" label="\u22EE" width="in-line"></button>
  </div>
</div>`,
      },
      {
        label: 'Narrow width (40%)',
        html: `<div class="flex items-start gap-3 py-3 px-4 border border-gray-300 rounded-lg bg-white"
     style="width: 40%">
  <co-aux-avatar iconName="Person" avatarSize="small"></co-aux-avatar>
  <h6 class="flex-1 min-w-0 font-bold text-base leading-8 m-0 break-words">
    Nesmyslně dlouhý a komplikovaný nadpis sekce, který se nevejde na řádek
  </h6>
  <button class="w-8 h-8 flex items-center justify-center rounded-full shrink-0
                 text-gray-400 hover:text-gray-900 hover:bg-gray-100">
    <co-icon iconName="edit" iconSvgSize="icon-16" tabindex="0"></co-icon>
  </button>
  <div class="flex items-center gap-2 shrink-0">
    <button co-button variant="button-secondary" label="Stáhnout" width="in-line"></button>
    <button co-button variant="button-secondary" label="\u22EE" width="in-line"></button>
  </div>
</div>`,
      },
    ],
  },

  // ─── Others ──────────────────────────────────────────────────────────────────
  {
    name: 'Data Types',
    version: '',
    category: ComponentCategory.OTHERS,
    description: 'Reference of shared data types and interfaces used across components.',
    inputs: [],
    outputs: [],
    codeExamples: [],
  },
  {
    name: 'Directive - checkTextEllipsis',
    version: '',
    category: ComponentCategory.OTHERS,
    description: 'Directive that detects text overflow and shows a tooltip when text is ellipsed.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<span checkTextEllipsis>Long text that might get truncated...</span>` },
    ],
  },
  {
    name: 'Directive - Mockable',
    version: '',
    category: ComponentCategory.OTHERS,
    description: 'Directive for marking components as mockable in testing/preview environments.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-product mockable [mockData]="mockProduct"></co-product>` },
    ],
  },
  {
    name: 'Drag and Drop',
    version: '',
    category: ComponentCategory.OTHERS,
    description: 'Drag and drop functionality for reordering and moving items.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<div coDragDrop (drop)="onDrop($event)">\n  <div coDraggable *ngFor="let item of items">{{ item.label }}</div>\n</div>` },
    ],
  },
  {
    name: 'Editor',
    version: '',
    category: ComponentCategory.OTHERS,
    description: 'Rich text editor component.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-editor [formControl]="editorCtrl"></co-editor>` },
    ],
  },
  {
    name: 'Message Detail',
    version: '',
    category: ComponentCategory.OTHERS,
    description: 'Detailed message view with metadata, actions, and thread support.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-message-detail [message]="msg"></co-message-detail>` },
    ],
  },
  {
    name: 'Navigation Detail',
    version: '',
    category: ComponentCategory.OTHERS,
    description: 'Detailed navigation view showing breadcrumbs and nested navigation paths.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-navigation-detail [path]="navPath"></co-navigation-detail>` },
    ],
  },
  {
    name: 'Even Layout',
    version: '',
    category: ComponentCategory.OTHERS,
    description: 'Layout utility that distributes children evenly in a container.',
    inputs: [],
    outputs: [],
    codeExamples: [
      { label: 'Basic usage', html: `<co-even-layout>\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</co-even-layout>` },
    ],
  },
];
