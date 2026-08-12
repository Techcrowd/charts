import { Type } from '@angular/core';

import { ButtonDemoComponent } from './button-demo.component';
import { ButtonBarBottomDemoComponent } from './button-bar-bottom-demo.component';
import { ContentCardDemoComponent } from './content-card-demo.component';
import { InputDemoComponent } from './input-demo.component';
import { SpinnerDemoComponent } from './spinner-demo.component';
import { DividerDemoComponent } from './divider-demo.component';
import { AccordionDemoComponent } from './accordion-demo.component';
import { SwitchDemoComponent } from './switch-demo.component';
import { ItemNavigationDemoComponent } from './item-navigation-demo.component';
import { ProductDemoComponent } from './product-demo.component';
import { HeaderDemoComponent } from './header-demo.component';
import { InlineMessageDemoComponent } from './inline-message-demo.component';
import { SnackbarDemoComponent } from './snackbar-demo.component';
import { AvatarDemoComponent } from './avatar-demo.component';
import { CheckboxDemoComponent } from './checkbox-demo.component';
import { SectionHeaderDemoComponent } from './section-header-demo.component';
import { HorizontalChartDemoComponent } from './horizontal-chart-demo.component';

/**
 * Registry mapping showcase component names to their real Angular demo components.
 * Components not in this map will use the FallbackDemoComponent.
 */
export const DEMO_REGISTRY: Record<string, Type<unknown>> = {
  'CO Button': ButtonDemoComponent,
  'CO Button Bar Bottom': ButtonBarBottomDemoComponent,
  'CO Button Bar Dynamic': ButtonBarBottomDemoComponent, // same layout
  'CO Content Card': ContentCardDemoComponent,
  'CO Input': InputDemoComponent,
  'CO Spinner': SpinnerDemoComponent,
  'CO Divider': DividerDemoComponent,
  'CO Accordion Header': AccordionDemoComponent,
  'CO Item Switch': SwitchDemoComponent,
  'CO Item Navigation': ItemNavigationDemoComponent,
  'CO Product': ProductDemoComponent,
  'CO Header': HeaderDemoComponent,
  'CO InlineMessage': InlineMessageDemoComponent,
  'CO Snackbar': SnackbarDemoComponent,
  'Avatar': AvatarDemoComponent,
  'CO Item Checkbox': CheckboxDemoComponent,
  'TMPL Section Header': SectionHeaderDemoComponent,
  'CO Chart V4 Horizontal': HorizontalChartDemoComponent,
};
