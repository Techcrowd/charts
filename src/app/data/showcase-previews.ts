/**
 * Visual HTML preview mockups for each Golem DS component.
 * Uses .gds-* CSS classes from _golem-preview.scss.
 */
export const PREVIEW_MAP: Record<string, string> = {

  // ─── CO Components ─────────────────────────────────────────────────────────

  'CO Accordion Header': `
<div class="gds-preview">
  <div style="display:flex;align-items:center;gap:8px;padding:12px 0;border-bottom:1px solid #ededed">
    <span style="font-size:14px;color:#717171">&#9660;</span>
    <span style="font-size:16px;font-weight:600;color:#212121;flex:1">Title</span>
    <span style="font-size:14px;color:#717171">&#9432;</span>
    <button class="gds-btn gds-btn--secondary gds-btn--sm">$label</button>
    <span style="font-size:16px;color:#717171">&#8942;</span>
  </div>
  <div style="padding:16px 0;font-size:14px;color:#717171">
    Accordion body content — collapsible section with header action button, secondary button and dropdown menu.
  </div>
</div>`,

  'CO Action Stack': `
<div class="gds-preview">
  <div class="gds-preview-label">Pile (1-7 položek)</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden">
    <div style="padding:14px 16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#212121">Time</div>
    <div style="padding:14px 16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#212121">Card</div>
    <div style="padding:14px 16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#212121">Card</div>
    <div style="padding:14px 16px;font-size:14px;color:#be0000">Pay me</div>
  </div>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Loading Pile</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden;padding:12px 16px;display:flex;flex-direction:column;gap:12px">
    <div style="width:80px;height:12px;background:#ededed;border-radius:4px"></div>
    <div style="width:60px;height:12px;background:#ededed;border-radius:4px"></div>
    <div style="width:90px;height:12px;background:#ededed;border-radius:4px"></div>
    <div style="width:70px;height:12px;background:#ededed;border-radius:4px"></div>
  </div>
</div>`,

  'CO Button': `
<div class="gds-preview">
  <div class="gds-preview-label">Primary – full width</div>
  <button class="gds-btn gds-btn--primary gds-btn--full">$label</button>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Primary – in-line</div>
  <button class="gds-btn gds-btn--primary">$label</button>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Primary – icon + label</div>
  <button class="gds-btn gds-btn--primary gds-btn--full"><span style="margin-right:6px">&#8962;</span> $label</button>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Disabled</div>
  <button class="gds-btn gds-btn--primary gds-btn--full" disabled><span style="margin-right:6px">&#8962;</span> $label</button>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Loading</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div style="height:44px;background:#ededed;border-radius:24px"></div>
    <div style="display:flex;gap:8px"><div style="flex:1;height:44px;background:#ededed;border-radius:24px"></div><div style="width:80px;height:44px;background:#ededed;border-radius:24px"></div></div>
  </div>
</div>`,

  'CO Button Bar Bottom': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">One button</div>
  <div style="display:flex;justify-content:flex-end"><button class="gds-btn gds-btn--primary">$label</button></div>
  <div class="gds-preview-label">One button – secondary</div>
  <div style="display:flex;justify-content:flex-end"><button class="gds-btn gds-btn--secondary">$label</button></div>
  <div class="gds-preview-label">Two buttons</div>
  <div style="display:flex;justify-content:flex-end;gap:8px"><button class="gds-btn gds-btn--primary">$label</button><button class="gds-btn gds-btn--secondary">$label</button></div>
  <div class="gds-preview-label">Two buttons – primary and tertiary</div>
  <div style="display:flex;justify-content:flex-end;gap:8px"><button class="gds-btn gds-btn--primary">$label</button><button class="gds-btn gds-btn--tertiary">$label</button></div>
</div>`,

  'CO Button Bar Dynamic': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">One button – primary</div>
  <div style="display:flex;justify-content:flex-end"><button class="gds-btn gds-btn--primary">$label</button></div>
  <div class="gds-preview-label">One button – secondary</div>
  <div style="display:flex;justify-content:flex-end"><button class="gds-btn gds-btn--secondary">$label2</button></div>
  <div class="gds-preview-label">Two buttons – primary and secondary</div>
  <div style="display:flex;justify-content:flex-end;gap:8px"><button class="gds-btn gds-btn--primary">$label</button><button class="gds-btn gds-btn--secondary">$label2</button></div>
  <div class="gds-preview-label">Two buttons – primary and tertiary</div>
  <div style="display:flex;justify-content:flex-end;gap:8px"><button class="gds-btn gds-btn--primary">$label</button><button class="gds-btn gds-btn--tertiary">$label2</button></div>
</div>`,

  'CO Button Bar Chat': `
<div class="gds-preview">
  <div style="display:flex;align-items:center;gap:8px">
    <div style="flex:1;padding:10px 16px;background:#fff;border:1.5px solid #dadada;border-radius:8px;font-size:14px;color:#717171">$placeholder</div>
    <button class="gds-btn gds-btn--primary">$actionLabel</button>
  </div>
</div>`,

  'CO Button Bar Summary': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div>
    <div style="font-size:16px;font-weight:600;color:#212121">$label</div>
    <div style="font-size:13px;color:#717171">$caption</div>
    <span style="color:#dadada;float:right;margin-top:-24px">&#8250;</span>
  </div>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Flow example</div>
  <div class="gds-btn-row">
    <button class="gds-btn gds-btn--primary">Open Narrow Flow</button>
    <button class="gds-btn gds-btn--primary">Open Wide Flow</button>
  </div>
</div>`,

  'CO Button Dropdown': `
<div class="gds-preview gds-preview-col" style="gap:12px">
  <div class="gds-preview-label">Primary</div>
  <div class="gds-btn-row">
    <button class="gds-btn gds-btn--primary">$label &#9662;</button>
    <button class="gds-btn gds-btn--primary"><span style="margin-right:4px">&#8962;</span> $label &#9662;</button>
  </div>
  <div class="gds-preview-label">Icon only</div>
  <div class="gds-btn-row">
    <button class="gds-btn gds-btn--primary" style="padding:12px 14px">&#8942;</button>
  </div>
  <div class="gds-preview-label">Loading</div>
  <div style="width:80px;height:40px;background:#ededed;border-radius:24px"></div>
  <div class="gds-preview-label">Disabled</div>
  <div class="gds-btn-row">
    <button class="gds-btn gds-btn--primary" disabled>$label &#9662;</button>
    <button class="gds-btn gds-btn--primary" disabled style="padding:12px 14px">&#8942;</button>
  </div>
</div>`,

  'CO Content Card': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">card-primary</div>
  <div style="background:#fff;border-radius:8px;padding:16px;font-size:14px;color:#212121;line-height:1.5">
    Primary Card<br>Primary Card<br>Primary Card
  </div>
  <div class="gds-preview-label">card-secondary</div>
  <div style="background:#fff;border-radius:8px;padding:16px;font-size:14px;color:#454545;line-height:1.5">
    Secondary card<br>Secondary card<br>Secondary card
  </div>
  <div class="gds-preview-label">card-highlight</div>
  <div style="background:#fff;border-radius:8px;padding:16px;font-size:14px;color:#212121;line-height:1.5;border-left:3px solid #be0000">
    Highlight card<br>Highlight card<br>Highlight card
  </div>
</div>`,

  'CO Datepicker': `
<div class="gds-preview">
  <div class="gds-datepicker">
    <div class="gds-datepicker__nav">
      <span class="gds-datepicker__arrow">&#8249;</span>
      <span class="gds-datepicker__month">Únor 2026</span>
      <span class="gds-datepicker__arrow">&#8250;</span>
    </div>
    <div class="gds-datepicker__grid">
      <span class="gds-datepicker__weekday">Po</span>
      <span class="gds-datepicker__weekday">Út</span>
      <span class="gds-datepicker__weekday">St</span>
      <span class="gds-datepicker__weekday">Čt</span>
      <span class="gds-datepicker__weekday">Pá</span>
      <span class="gds-datepicker__weekday">So</span>
      <span class="gds-datepicker__weekday">Ne</span>
      <span class="gds-datepicker__day gds-datepicker__day--other-month">26</span>
      <span class="gds-datepicker__day gds-datepicker__day--other-month">27</span>
      <span class="gds-datepicker__day gds-datepicker__day--other-month">28</span>
      <span class="gds-datepicker__day gds-datepicker__day--other-month">29</span>
      <span class="gds-datepicker__day gds-datepicker__day--other-month">30</span>
      <span class="gds-datepicker__day gds-datepicker__day--other-month">31</span>
      <span class="gds-datepicker__day">1</span>
      <span class="gds-datepicker__day">2</span>
      <span class="gds-datepicker__day">3</span>
      <span class="gds-datepicker__day">4</span>
      <span class="gds-datepicker__day">5</span>
      <span class="gds-datepicker__day">6</span>
      <span class="gds-datepicker__day">7</span>
      <span class="gds-datepicker__day">8</span>
      <span class="gds-datepicker__day">9</span>
      <span class="gds-datepicker__day">10</span>
      <span class="gds-datepicker__day">11</span>
      <span class="gds-datepicker__day">12</span>
      <span class="gds-datepicker__day gds-datepicker__day--today">13</span>
      <span class="gds-datepicker__day">14</span>
      <span class="gds-datepicker__day">15</span>
      <span class="gds-datepicker__day gds-datepicker__day--selected">16</span>
      <span class="gds-datepicker__day">17</span>
      <span class="gds-datepicker__day">18</span>
      <span class="gds-datepicker__day">19</span>
      <span class="gds-datepicker__day">20</span>
      <span class="gds-datepicker__day">21</span>
    </div>
  </div>
</div>`,

  'CO Digit Picker': `
<div class="gds-preview">
  <div style="display:grid;grid-template-columns:repeat(7,32px);gap:4px;font-size:14px;color:#212121;text-align:center">
    <span style="padding:6px">1</span><span style="padding:6px">2</span><span style="padding:6px">3</span><span style="padding:6px">4</span><span style="padding:6px">5</span><span style="padding:6px">6</span><span style="padding:6px">7</span>
    <span style="padding:6px">8</span><span style="padding:6px">9</span><span style="padding:6px">10</span><span style="padding:6px">11</span><span style="padding:6px">12</span><span style="padding:6px">13</span><span style="padding:6px">14</span>
    <span style="padding:6px">15</span><span style="padding:6px">16</span><span style="padding:6px">17</span><span style="padding:6px">18</span><span style="padding:6px">19</span><span style="padding:6px">20</span><span style="padding:6px">21</span>
    <span style="padding:6px">22</span><span style="padding:6px">23</span><span style="padding:6px">24</span><span style="padding:6px">25</span><span style="padding:6px">26</span><span style="padding:6px">27</span><span style="padding:6px">28</span>
    <span style="padding:6px">29</span><span style="padding:6px">30</span><span style="padding:6px">31</span>
  </div>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Se zvolenou hodnotou</div>
  <div style="display:grid;grid-template-columns:repeat(7,32px);gap:4px;font-size:14px;color:#212121;text-align:center">
    <span style="padding:6px">5</span><span style="padding:6px">6</span><span style="padding:6px;background:#be0000;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center">7</span><span style="padding:6px">8</span><span style="padding:6px">9</span><span style="padding:6px">10</span><span style="padding:6px">11</span>
    <span style="padding:6px">12</span><span style="padding:6px">13</span><span style="padding:6px">14</span><span style="padding:6px">15</span><span style="padding:6px">16</span><span style="padding:6px">17</span><span style="padding:6px">18</span>
    <span style="padding:6px">19</span><span style="padding:6px">20</span><span style="padding:6px">21</span><span style="padding:6px">22</span><span style="padding:6px">23</span><span style="padding:6px">24</span><span style="padding:6px">25</span>
  </div>
</div>`,

  'CO Divider': `
<div class="gds-preview">
  <div style="color:#454545;font-size:14px;margin-bottom:4px">Content above</div>
  <div class="gds-divider"></div>
  <div style="color:#454545;font-size:14px;margin-top:4px">Content below</div>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Thick divider (section separator)</div>
  <div class="gds-divider gds-divider--thick"></div>
</div>`,

  'CO Document Rendering': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#128196;</span>
    Document Rendering – renderuje náhled PDF a obrázků
  </div>
</div>`,

  'CO Dropdown': `
<div class="gds-preview gds-preview-col">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 16px;background:#fff;border:1.5px solid #dadada;border-radius:8px;max-width:260px;cursor:pointer">
    <span style="width:20px;height:20px;background:#be0000;border-radius:2px;display:inline-block"></span>
    <span style="flex:1;font-size:14px;color:#212121">Value 1</span>
    <span style="color:#717171;font-size:12px">&#9662;</span>
  </div>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Items count: 7 items</div>
  <div style="font-size:13px;color:#717171">Options with hasNotification, icons, routerLink</div>
</div>`,

  'CO File QR Upload': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">Empty state</div>
  <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:#fff;border:1px dashed #dadada;border-radius:8px">
    <span style="font-size:20px;color:#717171">&#128247;</span>
    <span style="font-size:13px;color:#717171">Přetáhněte sem QR kód, nebo ho nahrajte pomocí tlačítka.</span>
  </div>
  <div class="gds-preview-label">File selected state</div>
  <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:#fff;border:1px solid #dadada;border-radius:8px">
    <span style="font-size:20px;color:#717171">&#128196;</span>
    <span style="font-size:13px;color:#212121;flex:1">payment_qr_code.png</span>
    <span style="font-size:14px;color:#be0000;cursor:pointer">&#10005;</span>
  </div>
</div>`,

  'CO Header': `
<div class="gds-preview" style="padding:0;overflow:hidden;border-radius:8px">
  <div class="gds-preview-label" style="padding:12px 16px 4px">Ground variant</div>
  <div class="gds-header gds-header--ground">
    <span class="gds-header__action">&#9776;</span>
    <span class="gds-header__title">Přehled</span>
    <div class="gds-avatar gds-avatar--sm" style="background:rgba(255,255,255,0.15);color:#fff">MN</div>
  </div>
  <div class="gds-preview-label" style="padding:12px 16px 4px">Navigation variant</div>
  <div class="gds-header gds-header--nav">
    <span class="gds-header__back">&#8249;</span>
    <span class="gds-header__title">Detail platby</span>
    <span class="gds-header__action">&#8943;</span>
  </div>
  <div class="gds-preview-label" style="padding:12px 16px 4px">Dialog variant</div>
  <div class="gds-header gds-header--dialog">
    <span class="gds-header__back">&#10005;</span>
    <span class="gds-header__title">Nová platba</span>
    <span class="gds-header__action" style="color:#be0000;font-size:14px;font-weight:600">Uložit</span>
  </div>
</div>`,

  'CO Chart': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#128200;</span>
    Chart v1 – vizualizace dat (sloupcové, koláčové)
  </div>
</div>`,

  'CO Chart V2': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#128202;</span>
    Chart v2 – vylepšená verze s novým API a typy grafů
  </div>
</div>`,

  'CO Illustrated Message': `
<div class="gds-preview" style="display:flex;gap:32px;flex-wrap:wrap">
  <div class="gds-illustrated-msg">
    <div class="gds-illustrated-msg__illustration">&#128196;<span style="position:absolute;bottom:-2px;right:-2px;background:#be0000;color:#fff;width:18px;height:18px;border-radius:50%;font-size:11px;display:flex;align-items:center;justify-content:center">&#10007;</span></div>
    <div class="gds-illustrated-msg__heading">$textHeading</div>
    <div class="gds-illustrated-msg__text">$text</div>
    <button class="gds-btn gds-btn--primary" style="margin-top:8px">$label</button>
  </div>
  <div class="gds-illustrated-msg">
    <div class="gds-illustrated-msg__illustration">&#128196;<span style="position:absolute;bottom:-2px;right:-2px;background:#be0000;color:#fff;width:18px;height:18px;border-radius:50%;font-size:11px;display:flex;align-items:center;justify-content:center">&#10007;</span></div>
    <div class="gds-illustrated-msg__heading">$textHeading</div>
    <div class="gds-illustrated-msg__text">$text</div>
    <button class="gds-btn gds-btn--secondary" style="margin-top:8px">$label</button>
  </div>
</div>`,

  'CO Illustration': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#127912;</span>
    Illustration – dekorativní ilustrace pro prázdné stavy a onboarding
  </div>
</div>`,

  'CO Information List': `
<div class="gds-preview">
  <div class="gds-info-list">
    <div class="gds-info-row">
      <span class="gds-info-row__label">Číslo účtu</span>
      <span class="gds-info-row__value">123-4567890/0100</span>
    </div>
    <div class="gds-info-row">
      <span class="gds-info-row__label">IBAN</span>
      <span class="gds-info-row__value">CZ65 0100 0000 0012 3456 7890</span>
    </div>
    <div class="gds-info-row">
      <span class="gds-info-row__label">BIC/SWIFT</span>
      <span class="gds-info-row__value">KOMBCZPP</span>
    </div>
    <div class="gds-info-row">
      <span class="gds-info-row__label">Vlastník</span>
      <span class="gds-info-row__value">Jan Novák</span>
    </div>
  </div>
</div>`,

  'CO InlineMessage': `
<div class="gds-preview gds-preview-col">
  <div class="gds-preview-label">success, icon</div>
  <div class="gds-inline-msg gds-inline-msg--success">
    <span class="gds-inline-msg__icon">&#10003;</span>
    <span class="gds-inline-msg__text">Test message for component</span>
  </div>
  <div class="gds-preview-label">error, no icon</div>
  <div class="gds-inline-msg gds-inline-msg--error">
    <span class="gds-inline-msg__text">Test message for component</span>
  </div>
  <div class="gds-preview-label">warning, navigation</div>
  <div class="gds-inline-msg gds-inline-msg--warning">
    <span class="gds-inline-msg__icon">&#9888;</span>
    <span class="gds-inline-msg__text">Test message for component</span>
  </div>
  <div class="gds-preview-label">info, custom icon</div>
  <div class="gds-inline-msg gds-inline-msg--info">
    <span class="gds-inline-msg__icon">&#128197;</span>
    <span class="gds-inline-msg__text">Test message for component</span>
  </div>
</div>`,

  'CO Input': `
<div class="gds-preview gds-preview-col">
  <div class="gds-preview-label">Basic</div>
  <div class="gds-input-group">
    <span class="gds-input-label">Popisek</span>
    <input class="gds-input" value="" readonly />
    <span style="font-size:12px;color:#717171;margin-top:2px">Info message</span>
  </div>
  <div class="gds-preview-label">Basic Placeholder</div>
  <div class="gds-input-group">
    <span class="gds-input-label">Basic</span>
    <input class="gds-input" placeholder="placeholder" readonly />
    <span style="font-size:12px;color:#717171;margin-top:2px">Info message</span>
  </div>
  <div class="gds-preview-label">Basic Error</div>
  <div class="gds-input-group">
    <span class="gds-input-label" style="color:#be0000">Error</span>
    <input class="gds-input gds-input--error" value="input value" readonly />
    <span class="gds-input-error">Info message</span>
  </div>
</div>`,

  'CO Input Date': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">example basic</div>
  <div class="gds-input-group" style="max-width:260px">
    <span class="gds-input-label">$label</span>
    <input class="gds-input" placeholder="$placeholder" readonly />
    <span style="font-size:12px;color:#717171;margin-top:2px">$message</span>
  </div>
  <div class="gds-preview-label">example error</div>
  <div class="gds-input-group" style="max-width:260px">
    <span class="gds-input-label" style="color:#be0000">$label</span>
    <input class="gds-input gds-input--error" readonly />
    <span class="gds-input-error">$message</span>
  </div>
  <div class="gds-preview-label">example optional</div>
  <div class="gds-input-group" style="max-width:260px">
    <span class="gds-input-label">$label <span style="color:#717171;font-weight:400">(nepovinné)</span></span>
    <input class="gds-input" placeholder="$placeholder" readonly />
    <span style="font-size:12px;color:#717171;margin-top:2px">$message</span>
  </div>
</div>`,

  'CO Input Date Shadow': `
<div class="gds-preview">
  <div class="gds-input-group">
    <span class="gds-input-label">Datum (Shadow DOM)</span>
    <input class="gds-input" value="13/02/2026" readonly style="max-width:200px" />
  </div>
</div>`,

  'CO Input Digits': `
<div class="gds-preview" style="text-align:center">
  <div class="gds-preview-label">Ověřovací kód</div>
  <div style="display:flex;gap:8px;justify-content:center">
    <input class="gds-input" value="4" readonly style="width:44px;height:52px;text-align:center;font-size:20px;font-weight:700" />
    <input class="gds-input" value="8" readonly style="width:44px;height:52px;text-align:center;font-size:20px;font-weight:700" />
    <input class="gds-input" value="2" readonly style="width:44px;height:52px;text-align:center;font-size:20px;font-weight:700" />
    <input class="gds-input gds-input--focused" value="" readonly style="width:44px;height:52px;text-align:center;font-size:20px;font-weight:700" />
    <input class="gds-input" value="" readonly style="width:44px;height:52px;text-align:center;font-size:20px;color:#dadada" />
    <input class="gds-input" value="" readonly style="width:44px;height:52px;text-align:center;font-size:20px;color:#dadada" />
  </div>
</div>`,

  'CO Input Search Bar': `
<div class="gds-preview">
  <div class="gds-search-bar">
    <span class="gds-search-bar__icon">&#128269;</span>
    <span class="gds-search-bar__text">Hledat příjemce...</span>
  </div>
</div>`,

  'CO Input Select': `
<div class="gds-preview">
  <div class="gds-input-group">
    <span class="gds-input-label">Typ účtu</span>
    <div style="position:relative;max-width:280px">
      <input class="gds-input" value="Běžný účet" readonly style="cursor:pointer" />
      <span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#717171">&#9662;</span>
    </div>
  </div>
</div>`,

  'CO Input SuperField': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">Superfield with long list</div>
  <div class="gds-input-group">
    <input class="gds-input" placeholder="Vyberte ze seznamu" readonly />
  </div>
  <div class="gds-preview-label">Superfield payment</div>
  <div class="gds-input-group">
    <div style="display:flex;gap:0">
      <div style="flex:0 0 auto">
        <span class="gds-input-label">Konto</span>
        <span class="gds-input-label" style="margin-left:60px">Kód banky</span>
      </div>
    </div>
    <input class="gds-input" placeholder="Zadejte jméno, nebo číslo účtu" readonly />
  </div>
</div>`,

  'CO Input TextArea': `
<div class="gds-preview">
  <div class="gds-input-group">
    <span class="gds-input-label">Poznámka k platbě</span>
    <textarea class="gds-input" readonly rows="3" style="resize:none">Platba za fakturu č. 2026-001. Děkujeme za spolupráci.</textarea>
  </div>
</div>`,

  'CO Item Account Display': `
<div class="gds-preview">
  <div style="display:flex;align-items:center;gap:16px;padding:12px 0">
    <div style="flex:1">
      <div style="font-size:16px;font-weight:600;color:#212121">Běžný účet 6126126/0100</div>
      <div style="font-size:13px;color:#717171">ČEZ Prodej, a.s.</div>
      <div style="font-size:12px;color:#2196f3;margin-top:2px">&#9432; Vaši se výpovědní dodat do 26. 2. 2025</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:18px;font-weight:700;color:#212121">122 001 Kč</div>
      <div style="font-size:12px;color:#717171">Zůstatek na účtu</div>
    </div>
    <button class="gds-btn gds-btn--secondary gds-btn--sm">Změnit účet</button>
  </div>
</div>`,

  'CO Item Autocomplete': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">Co item autocomplete basic</div>
  <div style="padding:8px 0">
    <div style="font-size:14px;color:#212121">$label</div>
    <div style="font-size:13px;color:#717171">$caption</div>
  </div>
  <div class="gds-preview-label">Co item autocomplete highlight</div>
  <div style="padding:8px 0">
    <input class="gds-input" readonly style="max-width:200px;margin-bottom:8px" />
    <div style="font-size:14px;color:#212121">$label</div>
    <div style="font-size:13px;color:#717171">$caption</div>
  </div>
  <div class="gds-preview-label">Loading skeleton</div>
  <div style="display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;gap:8px"><div style="width:100px;height:12px;background:#ededed;border-radius:4px"></div><div style="width:60px;height:12px;background:#ededed;border-radius:4px"></div></div>
  </div>
</div>`,

  'CO Item Display': `
<div class="gds-preview" style="display:flex;gap:32px;flex-wrap:wrap">
  <div>
    <div class="gds-preview-label">Icon 24 – value vertical</div>
    <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0">
      <span style="font-size:20px;color:#717171">&#8962;</span>
      <div>
        <div style="font-size:13px;color:#717171">$label</div>
        <div style="font-size:16px;font-weight:600;color:#212121">$value</div>
      </div>
    </div>
  </div>
  <div>
    <div class="gds-preview-label">Value vertical</div>
    <div style="padding:8px 0">
      <div style="font-size:13px;color:#717171">$label</div>
      <div style="font-size:16px;font-weight:600;color:#212121">$value</div>
    </div>
  </div>
  <div>
    <div class="gds-preview-label">Vertical action</div>
    <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0">
      <div>
        <div style="font-size:13px;color:#717171">$label</div>
        <div style="font-size:16px;font-weight:600;color:#212121">$value</div>
      </div>
      <span style="font-size:13px;color:#be0000;white-space:nowrap">$actionLabel</span>
    </div>
  </div>
  <div>
    <div class="gds-preview-label">Yield Performance Format</div>
    <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0">
      <span style="font-size:20px;color:#717171">&#8962;</span>
      <div>
        <div style="font-size:13px;color:#717171">$label</div>
        <div style="font-size:14px;font-weight:600;color:#207c29">+32 021,03 Kč</div>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0">
      <span style="font-size:20px;color:#717171">&#8962;</span>
      <div>
        <div style="font-size:13px;color:#717171">$label</div>
        <div style="font-size:14px;font-weight:600;color:#be0000">-32 021,03 Kč</div>
      </div>
    </div>
  </div>
</div>`,

  'CO Item Chat': `
<div class="gds-preview gds-preview-col" style="gap:8px">
  <div style="display:flex;gap:8px;align-items:flex-end">
    <div class="gds-avatar gds-avatar--sm">A</div>
    <div style="background:#fff;padding:10px 14px;border-radius:12px 12px 12px 4px;font-size:14px;max-width:70%;box-shadow:0 1px 2px rgba(33,33,33,0.08)">
      Dobrý den, potřebuji pomoc s platbou.
      <div style="font-size:10px;color:#717171;margin-top:4px">10:30</div>
    </div>
  </div>
  <div style="display:flex;gap:8px;align-items:flex-end;justify-content:flex-end">
    <div style="background:#be0000;color:#fff;padding:10px 14px;border-radius:12px 12px 4px 12px;font-size:14px;max-width:70%">
      Samozřejmě, jak vám mohu pomoci?
      <div style="font-size:10px;color:rgba(255,255,255,0.7);margin-top:4px">10:31</div>
    </div>
  </div>
</div>`,

  'CO Item Checkbox': `
<div class="gds-preview">
  <div class="gds-item-check">
    <div class="gds-checkbox gds-checkbox--checked">&#10003;</div>
    <span class="gds-item-check__label">Souhlasím s obchodními podmínkami</span>
  </div>
  <div class="gds-item-check">
    <div class="gds-checkbox gds-checkbox--checked">&#10003;</div>
    <span class="gds-item-check__label">Souhlasím se zpracováním osobních údajů</span>
  </div>
  <div class="gds-item-check">
    <div class="gds-checkbox"></div>
    <span class="gds-item-check__label">Chci dostávat novinky e-mailem</span>
  </div>
</div>`,

  'CO Item Checkbox Tristate List': `
<div class="gds-preview">
  <div class="gds-item-check">
    <div class="gds-checkbox gds-checkbox--checked">&#10003;</div>
    <span class="gds-item-check__label">Vše vybráno</span>
  </div>
  <div class="gds-item-check" style="padding-left:32px">
    <div class="gds-checkbox gds-checkbox--checked">&#10003;</div>
    <span class="gds-item-check__label">Položka A</span>
  </div>
  <div class="gds-item-check" style="padding-left:32px">
    <div class="gds-checkbox gds-checkbox--checked">&#10003;</div>
    <span class="gds-item-check__label">Položka B</span>
  </div>
  <div class="gds-item-check" style="padding-left:32px">
    <div class="gds-checkbox"></div>
    <span class="gds-item-check__label">Položka C</span>
  </div>
</div>`,

  'CO Item Navigation': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">Success Destructive Off</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden">
    <div class="gds-item-nav">
      <span class="gds-item-nav__icon" style="color:#be0000">&#8962;</span>
      <div class="gds-item-nav__content">
        <div class="gds-item-nav__label">$label</div>
        <div class="gds-item-nav__caption">$caption</div>
        <div style="font-size:12px;color:#207c29">$message</div>
      </div>
      <span class="gds-item-nav__chevron">&#8250;</span>
    </div>
  </div>
  <div class="gds-preview-label">Success Destructive On</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden">
    <div class="gds-item-nav">
      <span class="gds-item-nav__icon" style="color:#be0000">&#8962;</span>
      <div class="gds-item-nav__content">
        <div class="gds-item-nav__label" style="color:#be0000">-2000 CZK</div>
        <div class="gds-item-nav__caption">$caption</div>
        <div style="font-size:12px;color:#207c29">$message</div>
      </div>
      <span class="gds-item-nav__chevron">&#8250;</span>
    </div>
  </div>
  <div class="gds-preview-label">Destructive Off – Message Off</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden">
    <div class="gds-item-nav">
      <span class="gds-item-nav__icon" style="color:#be0000">&#8962;</span>
      <div class="gds-item-nav__content">
        <div class="gds-item-nav__label">$label</div>
        <div class="gds-item-nav__caption">$caption</div>
      </div>
      <span class="gds-item-nav__chevron">&#8250;</span>
    </div>
  </div>
</div>`,

  'CO Item Radiobutton': `
<div class="gds-preview">
  <div class="gds-preview-label">Způsob doručení</div>
  <div class="gds-item-radio">
    <div class="gds-radio gds-radio--selected"></div>
    <span class="gds-item-radio__label">Na pobočku</span>
  </div>
  <div class="gds-item-radio">
    <div class="gds-radio"></div>
    <span class="gds-item-radio__label">Poštou na adresu</span>
  </div>
  <div class="gds-item-radio">
    <div class="gds-radio"></div>
    <span class="gds-item-radio__label">Elektronicky</span>
  </div>
</div>`,

  'CO Item Switch': `
<div class="gds-preview">
  <div class="gds-item-switch">
    <div>
      <div class="gds-item-switch__label">Push notifikace</div>
      <div class="gds-item-switch__caption">Upozornění na příchozí platby</div>
    </div>
    <div class="gds-switch gds-switch--on"></div>
  </div>
  <div class="gds-item-switch">
    <div>
      <div class="gds-item-switch__label">E-mailové notifikace</div>
      <div class="gds-item-switch__caption">Měsíční výpis na e-mail</div>
    </div>
    <div class="gds-switch"></div>
  </div>
  <div class="gds-item-switch">
    <div>
      <div class="gds-item-switch__label">Biometrické přihlášení</div>
    </div>
    <div class="gds-switch gds-switch--on"></div>
  </div>
</div>`,

  'CO Item Transaction': `
<div class="gds-preview" style="padding:0;overflow:hidden;border-radius:8px">
  <div class="gds-item-tx">
    <div class="gds-avatar gds-avatar--success">&#8595;</div>
    <div class="gds-item-tx__content">
      <div class="gds-item-tx__label">Příchozí platba</div>
      <div class="gds-item-tx__caption">Company s.r.o.</div>
    </div>
    <div>
      <div class="gds-item-tx__value gds-item-tx__value--positive">+45 000 CZK</div>
      <div class="gds-item-tx__secondary-value">= 1 800 EUR</div>
    </div>
  </div>
  <div class="gds-item-tx">
    <div class="gds-avatar">&#8593;</div>
    <div class="gds-item-tx__content">
      <div class="gds-item-tx__label">Odchozí platba</div>
      <div class="gds-item-tx__caption">Nájem kanceláře</div>
    </div>
    <div class="gds-item-tx__value">-12 500 CZK</div>
  </div>
  <div class="gds-item-tx">
    <div class="gds-avatar gds-avatar--processing">&#8634;</div>
    <div class="gds-item-tx__content">
      <div class="gds-item-tx__label">Čeká na zpracování</div>
      <div class="gds-item-tx__caption">Online platba</div>
      <div class="gds-item-tx__message gds-item-tx__message--processing">Zpracovává se</div>
    </div>
    <div class="gds-item-tx__value gds-item-tx__value--processing">-890 CZK</div>
  </div>
  <div class="gds-item-tx">
    <div class="gds-avatar gds-avatar--error">&#10007;</div>
    <div class="gds-item-tx__content">
      <div class="gds-item-tx__label">Zamítnutá platba</div>
      <div class="gds-item-tx__caption">Nedostatek prostředků</div>
      <div class="gds-item-tx__message gds-item-tx__message--error">Zamítnuto</div>
    </div>
    <div class="gds-item-tx__value gds-item-tx__value--negative">-25 000 CZK</div>
  </div>
</div>`,

  'CO Item Transaction Select': `
<div class="gds-preview" style="padding:0;overflow:hidden;border-radius:8px">
  <div class="gds-item-tx" style="cursor:pointer">
    <div class="gds-checkbox gds-checkbox--checked">&#10003;</div>
    <div class="gds-item-tx__content">
      <div class="gds-item-tx__label">Platba č. 1</div>
      <div class="gds-item-tx__caption">Company s.r.o.</div>
    </div>
    <div class="gds-item-tx__value">+15 000 CZK</div>
  </div>
  <div class="gds-item-tx" style="cursor:pointer">
    <div class="gds-checkbox"></div>
    <div class="gds-item-tx__content">
      <div class="gds-item-tx__label">Platba č. 2</div>
      <div class="gds-item-tx__caption">Jiná firma s.r.o.</div>
    </div>
    <div class="gds-item-tx__value">+8 500 CZK</div>
  </div>
</div>`,

  'CO Listbox Menu': `
<div class="gds-preview gds-preview-col" style="max-width:320px">
  <div style="display:flex;align-items:center;gap:12px;padding-bottom:12px">
    <div class="gds-avatar gds-avatar--primary">&#128100;</div>
    <div style="font-size:18px;font-weight:600;color:#212121">$heading</div>
  </div>
  <div class="gds-segmented" style="margin-bottom:16px">
    <span class="gds-segmented__item gds-segmented__item--active">label1</span>
    <span class="gds-segmented__item">label2</span>
  </div>
  <div style="font-size:12px;color:#717171;margin-bottom:6px">Osobní a kontaktní údaje</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden">
    <div style="padding:10px 0;font-size:14px;color:#212121;border-bottom:1px solid #f5f5f5">Value 1</div>
    <div style="padding:10px 0;font-size:14px;color:#212121;border-bottom:1px solid #f5f5f5">Value 2</div>
    <div style="padding:10px 0;font-size:14px;color:#212121;display:flex;align-items:center;justify-content:space-between">Value 3 <span style="width:8px;height:8px;background:#be0000;border-radius:50%;display:inline-block"></span></div>
  </div>
  <div style="font-size:12px;color:#717171;margin:12px 0 6px">Osobní a kontaktní údaje</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden">
    <div style="padding:10px 0;font-size:14px;color:#212121;border-bottom:1px solid #f5f5f5">Value 1</div>
    <div style="padding:10px 0;font-size:14px;color:#212121;border-bottom:1px solid #f5f5f5">Value 2</div>
    <div style="padding:10px 0;font-size:14px;color:#212121;display:flex;align-items:center;justify-content:space-between">Value 3 <span style="width:8px;height:8px;background:#be0000;border-radius:50%;display:inline-block"></span></div>
  </div>
</div>`,

  'CO Modal Alert': `
<div class="gds-preview" style="background:rgba(33,33,33,0.15)">
  <div class="gds-modal">
    <div class="gds-modal__title">Potvrdit platbu?</div>
    <div class="gds-modal__text">Opravdu chcete odeslat platbu ve výši 45 000 CZK příjemci Company s.r.o.?</div>
    <div class="gds-modal__actions">
      <button class="gds-btn gds-btn--tertiary gds-btn--sm">Zrušit</button>
      <button class="gds-btn gds-btn--primary gds-btn--sm">Potvrdit</button>
    </div>
  </div>
</div>`,

  'CO Navigation': `
<div class="gds-preview gds-preview--phone" style="padding:0">
  <div style="height:60px"></div>
  <div class="gds-nav-bar">
    <div class="gds-nav-item gds-nav-item--active">
      <span class="gds-nav-item__icon">&#127968;</span>
      Přehled
    </div>
    <div class="gds-nav-item">
      <span class="gds-nav-item__icon">&#128179;</span>
      Platby
    </div>
    <div class="gds-nav-item">
      <span class="gds-nav-item__icon">&#128176;</span>
      Produkty
    </div>
    <div class="gds-nav-item">
      <span class="gds-nav-item__icon">&#8943;</span>
      Více
    </div>
  </div>
</div>`,

  'CO Navigation2': `
<div class="gds-preview" style="padding:0;overflow:hidden;border-radius:8px;max-width:320px">
  <div style="padding:12px 16px;background:#be0000;color:#fff;font-size:14px;display:flex;align-items:center;gap:10px">
    <span>&#8962;</span> Přehled
  </div>
  <div style="padding:12px 16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#212121;display:flex;align-items:center;gap:10px">
    <span style="color:#717171">&#128179;</span> Karty
  </div>
  <div style="padding:12px 16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#212121;display:flex;align-items:center;gap:10px">
    <span style="color:#717171">&#128176;</span> Spoření
  </div>
  <div style="padding:12px 16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#212121;display:flex;align-items:center;gap:10px">
    <span style="color:#717171">&#128100;</span> Účty
  </div>
  <div style="padding:12px 16px;font-size:14px;color:#212121;display:flex;align-items:center;gap:10px">
    <span style="width:20px;height:14px;background:#be0000;display:inline-block;border-radius:2px"></span> <strong>KB</strong>
  </div>
</div>`,

  'CO Page Header Menu': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">Default header</div>
  <div>
    <div style="font-size:20px;font-weight:700;color:#212121;margin-bottom:8px">$title</div>
    <div style="display:flex;gap:20px;font-size:13px;color:#717171;border-bottom:2px solid #f0f0f0;padding-bottom:6px">
      <span>leden</span><span>únor</span><span style="color:#212121;font-weight:600;border-bottom:2px solid #be0000;padding-bottom:6px;margin-bottom:-8px">březen</span><span>duben</span><span>květen</span>
    </div>
  </div>
  <div class="gds-preview-label">Header with info button</div>
  <div>
    <div style="font-size:20px;font-weight:700;color:#212121;display:flex;align-items:center;gap:8px;margin-bottom:8px">$title <span style="color:#2196f3;font-size:14px">&#9432;</span></div>
    <div style="display:flex;gap:20px;font-size:13px;color:#717171;border-bottom:2px solid #f0f0f0;padding-bottom:6px">
      <span>leden</span><span>únor</span><span>březen</span><span>duben</span><span>květen</span>
    </div>
  </div>
  <div class="gds-preview-label">Header with back button</div>
  <div>
    <div style="font-size:13px;color:#717171;margin-bottom:4px">&#8249; Zpět</div>
    <div style="font-size:20px;font-weight:700;color:#212121;margin-bottom:8px">$title</div>
    <div style="display:flex;gap:20px;font-size:13px;color:#717171;border-bottom:2px solid #f0f0f0;padding-bottom:6px">
      <span>leden</span><span>únor</span><span>březen</span><span>duben</span><span>květen</span>
    </div>
  </div>
</div>`,

  'CO Paginator': `
<div class="gds-preview" style="text-align:center">
  <div class="gds-paginator">
    <span class="gds-paginator-dot gds-paginator-dot--active"></span>
    <span class="gds-paginator-dot"></span>
    <span class="gds-paginator-dot"></span>
    <span class="gds-paginator-dot"></span>
    <span class="gds-paginator-dot"></span>
  </div>
</div>`,

  'CO Panel Menu': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">basic - no expanded</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden">
    <div style="padding:14px 16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#212121">Přehled</div>
    <div style="padding:14px 16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#212121;display:flex;justify-content:space-between;align-items:center">
      <span>Oblíbené</span><span style="color:#dadada">&#8250;</span>
    </div>
    <div style="padding:14px 16px;border-bottom:1px solid #f5f5f5;font-size:14px;color:#212121;display:flex;justify-content:space-between;align-items:center">
      <span>Účty a platby</span><span style="color:#dadada">&#8250;</span>
    </div>
    <div style="padding:14px 16px;font-size:14px;color:#212121;display:flex;justify-content:space-between;align-items:center">
      <span>Karty</span><span style="color:#dadada">&#8250;</span>
    </div>
  </div>
  <div class="gds-preview-label">loading state</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden;padding:12px 16px;display:flex;flex-direction:column;gap:16px">
    <div style="display:flex;justify-content:space-between;align-items:center"><div style="width:100px;height:12px;background:#ededed;border-radius:4px"></div><span style="color:#dadada">&#8250;</span></div>
    <div style="display:flex;justify-content:space-between;align-items:center"><div style="width:80px;height:12px;background:#ededed;border-radius:4px"></div><span style="color:#dadada">&#8250;</span></div>
    <div style="display:flex;justify-content:space-between;align-items:center"><div style="width:120px;height:12px;background:#ededed;border-radius:4px"></div><span style="color:#dadada">&#8250;</span></div>
  </div>
</div>`,

  'CO Panel Menu Settings': `
<div class="gds-preview" style="max-width:280px">
  <div style="background:#fff;border:1px solid #ededed;border-radius:8px;overflow:hidden">
    <div style="padding:10px 16px;border-bottom:1px solid #ededed;font-size:14px;color:#212121;display:flex;justify-content:space-between;align-items:center">Úvodní část <span style="width:8px;height:8px;background:#be0000;border-radius:50%;display:inline-block"></span></div>
    <div style="padding:10px 16px;border-bottom:1px solid #ededed;font-size:14px;color:#212121">Přehled účtů</div>
    <div style="padding:10px 16px;border-bottom:1px solid #ededed;font-size:13px;font-weight:600;color:#717171">Nastavení účtu</div>
    <div style="padding:8px 16px 8px 32px;border-bottom:1px solid #f5f5f5;font-size:13px;color:#212121">Profil</div>
    <div style="padding:8px 16px 8px 32px;border-bottom:1px solid #f5f5f5;font-size:13px;color:#212121">Zabezpečení</div>
    <div style="padding:8px 16px 8px 32px;border-bottom:1px solid #f5f5f5;font-size:13px;color:#212121">Notifikace</div>
    <div style="padding:8px 16px 8px 32px;border-bottom:1px solid #ededed;font-size:13px;color:#212121">Oprávnění</div>
    <div style="padding:10px 16px;border-bottom:1px solid #ededed;font-size:13px;font-weight:600;color:#717171">Systémová nastavení</div>
    <div style="padding:8px 16px 8px 32px;border-bottom:1px solid #f5f5f5;font-size:13px;color:#212121">Jazyk a region</div>
    <div style="padding:8px 16px 8px 32px;border-bottom:1px solid #f5f5f5;font-size:13px;color:#212121">Vzhled</div>
    <div style="padding:8px 16px 8px 32px;font-size:13px;color:#212121">Přístupnost</div>
  </div>
</div>`,

  'CO Personalisation': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#127912;</span>
    Personalisation – výběr tématu, barev a rozložení
  </div>
</div>`,

  'CO Product': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">variant: insurance</div>
  <div style="background:#fff;border-radius:8px;padding:14px 16px;display:flex;align-items:center;gap:12px">
    <div style="flex:1">
      <div style="font-size:16px;font-weight:600;color:#212121">$name</div>
      <div style="font-size:13px;color:#717171">$caption</div>
      <div style="font-size:12px;color:#2196f3;margin-top:2px">&#9432; $message</div>
    </div>
    <span style="color:#dadada;font-size:18px">&#8250;</span>
  </div>
  <div class="gds-preview-label">variant: detail-insurance</div>
  <div style="background:#fff;border-radius:8px;padding:16px">
    <div style="font-size:20px;font-weight:600;color:#212121">$name</div>
    <div style="font-size:14px;color:#717171">$caption</div>
  </div>
  <div class="gds-preview-label">variant: current account</div>
  <div style="background:#fff;border-radius:8px;padding:14px 16px;display:flex;align-items:center;gap:12px">
    <div style="flex:1">
      <div style="font-size:16px;font-weight:600;color:#212121">$name</div>
      <div style="font-size:13px;color:#717171">$caption</div>
    </div>
    <span style="color:#dadada;font-size:18px">&#8250;</span>
  </div>
</div>`,

  'CO Product Account / Card': `
<div class="gds-preview">
  <div style="background:#fff;border-radius:8px;padding:14px 16px;display:flex;align-items:center;gap:12px">
    <div style="flex:1">
      <div style="font-size:16px;font-weight:600;color:#212121">$name</div>
      <div style="font-size:13px;color:#717171">$caption</div>
    </div>
    <span style="color:#dadada;font-size:18px">&#8250;</span>
  </div>
</div>`,

  'CO Product Card': `
<div class="gds-preview">
  <div style="background:#fff;border-radius:8px;padding:14px 16px;display:flex;align-items:center;gap:12px">
    <div style="flex:1">
      <div style="font-size:16px;font-weight:600;color:#212121">$name</div>
      <div style="font-size:13px;color:#717171">$caption</div>
      <div style="font-size:12px;color:#207c29;margin-top:2px">$message</div>
    </div>
    <span style="color:#dadada;font-size:18px">&#8250;</span>
  </div>
</div>`,

  'CO Product Detail': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#128196;</span>
    Product Detail – kompletní pohled na produkt se všemi metadaty
  </div>
</div>`,

  'CO Promo Content Card': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">Promo variant – with image</div>
  <div style="background:#fff;border-radius:8px;overflow:hidden">
    <div style="height:48px;background:linear-gradient(135deg,#be0000,#ff6b6b);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:600">&#127381; NDB Banner editor</div>
    <div style="padding:14px 16px">
      <div style="font-size:16px;font-weight:700;color:#212121">Spořte se státní podporou až 2 000 Kč</div>
      <div style="font-size:13px;color:#717171;margin-top:4px">Nařiďte si na rekonstrukci, nové auto nebo cokoliv jiného.</div>
    </div>
  </div>
  <div class="gds-preview-label">Promo variant – no image</div>
  <div style="background:#fff;border-radius:8px;padding:14px 16px">
    <div style="font-size:16px;font-weight:700;color:#be0000">Založte si spoření s úrokem a nařiďte si na svoje sny</div>
    <div style="font-size:13px;color:#717171;margin-top:4px">Chcete šetřit na dovolenou, nové auto nebo si přilepšujete udržovat svoji železnou rezervu na nenadálé výdaje?</div>
  </div>
</div>`,

  'CO Rating': `
<div class="gds-preview" style="text-align:center">
  <div class="gds-preview-label">Hodnocení služby</div>
  <div class="gds-rating" style="justify-content:center">
    <span class="gds-rating__star gds-rating__star--filled">&#9733;</span>
    <span class="gds-rating__star gds-rating__star--filled">&#9733;</span>
    <span class="gds-rating__star gds-rating__star--filled">&#9733;</span>
    <span class="gds-rating__star gds-rating__star--filled">&#9733;</span>
    <span class="gds-rating__star">&#9733;</span>
  </div>
  <div style="font-size:13px;color:#717171;margin-top:8px">4 z 5</div>
</div>`,

  'CO Segmented Control': `
<div class="gds-preview" style="text-align:center">
  <div class="gds-segmented">
    <span class="gds-segmented__item gds-segmented__item--active">Den</span>
    <span class="gds-segmented__item">Týden</span>
    <span class="gds-segmented__item">Měsíc</span>
    <span class="gds-segmented__item">Rok</span>
  </div>
</div>`,

  'CO Snackbar': `
<div class="gds-preview gds-preview-col">
  <div class="gds-snackbar gds-snackbar--success">
    <span class="gds-snackbar__icon">&#10003;</span>
    <span class="gds-snackbar__text">Platba byla úspěšně odeslána</span>
    <span class="gds-snackbar__action">Zpět</span>
  </div>
  <div class="gds-snackbar gds-snackbar--error">
    <span class="gds-snackbar__icon">&#10007;</span>
    <span class="gds-snackbar__text">Nepodařilo se odeslat platbu</span>
    <span class="gds-snackbar__action">Opakovat</span>
  </div>
  <div class="gds-snackbar gds-snackbar--info">
    <span class="gds-snackbar__icon">&#8505;</span>
    <span class="gds-snackbar__text">Nová aktualizace je k dispozici</span>
  </div>
</div>`,

  'CO Spinner': `
<div class="gds-preview" style="text-align:center">
  <div class="gds-preview-row" style="justify-content:center;gap:24px">
    <div>
      <div class="gds-spinner gds-spinner--sm"></div>
      <div style="font-size:11px;color:#717171;margin-top:8px">Small</div>
    </div>
    <div>
      <div class="gds-spinner"></div>
      <div style="font-size:11px;color:#717171;margin-top:8px">Default</div>
    </div>
    <div>
      <div class="gds-spinner gds-spinner--lg"></div>
      <div style="font-size:11px;color:#717171;margin-top:8px">Large</div>
    </div>
  </div>
</div>`,

  'CO Tab': `
<div class="gds-preview" style="padding:0;overflow:hidden;border-radius:8px">
  <div class="gds-tabs">
    <span class="gds-tab gds-tab--active">Přehled</span>
    <span class="gds-tab">Transakce</span>
    <span class="gds-tab">Nastavení</span>
  </div>
  <div style="padding:16px;font-size:13px;color:#717171">
    Obsah aktivního tabu
  </div>
</div>`,

  'CO Tab Menu': `
<div class="gds-preview" style="padding:0;overflow:hidden;border-radius:8px">
  <div class="gds-tabs">
    <span class="gds-tab gds-tab--active">Účty</span>
    <span class="gds-tab">Karty</span>
    <span class="gds-tab">Úvěry</span>
    <span class="gds-tab">Pojištění</span>
  </div>
</div>`,

  'CO Text Heading': `
<div class="gds-preview gds-preview-col" style="gap:8px">
  <div style="font-size:24px;font-weight:700;color:#212121">Heading Primary</div>
  <div style="font-size:20px;font-weight:600;color:#212121">Heading Secondary</div>
  <div style="font-size:18px;font-weight:600;color:#212121">Heading Tertiary</div>
  <div style="font-size:16px;font-weight:600;color:#454545">Heading Quaternary</div>
</div>`,

  'CO Text Paragraph': `
<div class="gds-preview gds-preview-col" style="gap:8px">
  <div style="font-size:16px;color:#212121;line-height:1.6">Body Primary – Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
  <div style="font-size:14px;color:#454545;line-height:1.5">Body Secondary – Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div style="font-size:12px;color:#717171;line-height:1.4">Caption – Ut enim ad minim veniam, quis nostrud exercitation.</div>
</div>`,

  'CO Toolbar': `
<div class="gds-preview" style="padding:0;overflow:hidden;border-radius:8px">
  <div class="gds-toolbar">
    <span class="gds-toolbar__item gds-toolbar__item--active">&#9998;</span>
    <span class="gds-toolbar__item">&#128206;</span>
    <span class="gds-toolbar__item">&#128247;</span>
    <span class="gds-toolbar__item">&#128279;</span>
    <span style="flex:1"></span>
    <span class="gds-toolbar__item">&#8943;</span>
  </div>
</div>`,

  'CO Tooltip': `
<div class="gds-preview" style="text-align:center;padding:32px 20px">
  <div class="gds-tooltip" style="justify-content:center">
    <div class="gds-tooltip__bubble">Toto je nápověda</div>
    <button class="gds-btn gds-btn--secondary gds-btn--sm">Najeďte myší</button>
  </div>
</div>`,

  'CO Transaction Detail': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#128196;</span>
    Transaction Detail – kompletní detail transakce se všemi metadaty
  </div>
</div>`,

  // ─── IDS Components ────────────────────────────────────────────────────────

  'IDS Tooltip': `
<div class="gds-preview" style="text-align:center;padding:32px 20px">
  <div class="gds-tooltip" style="justify-content:center">
    <div class="gds-tooltip__bubble">IDS Tooltip text</div>
    <span style="font-size:14px;color:#717171">&#8592; hover target</span>
  </div>
</div>`,

  // ─── Essentials ────────────────────────────────────────────────────────────

  'ES Colors': `
<div class="gds-preview">
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px">
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">1 - content-primary</div><div style="width:100%;aspect-ratio:1;background:#212121;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px">#212121</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">2 - content-secondary</div><div style="width:100%;aspect-ratio:1;background:#454545;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px">#454545</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">3 - content-tertiary</div><div style="width:100%;aspect-ratio:1;background:#717171;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px">#717171</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">4 - content-quaternary</div><div style="width:100%;aspect-ratio:1;background:#dadada;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#454545;font-size:11px">#dadada</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">5 - content-pentary</div><div style="width:100%;aspect-ratio:1;background:#f0f0f0;border:1px solid #dadada;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#717171;font-size:11px">#f0f0f0</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">6 - skeleton-loading</div><div style="width:100%;aspect-ratio:1;background:#adadad80;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px">#adadad80</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">7 - background-body</div><div style="width:100%;aspect-ratio:1;background:#f9f9f9;border:1px solid #dadada;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#717171;font-size:11px">#f9f9f9</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">8 - background-surface</div><div style="width:100%;aspect-ratio:1;background:#ffffff;border:1px solid #dadada;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#717171;font-size:11px">#ffffff</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">9 - bg-surface-highlighted</div><div style="width:100%;aspect-ratio:1;background:#f5f5f5;border:1px solid #dadada;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#717171;font-size:11px">#f5f5f5</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">10 - bg-surface-avatar</div><div style="width:100%;aspect-ratio:1;background:#2121210a;border:1px solid #dadada;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#717171;font-size:10px">#2121210a</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">11 - bg-table-zebra</div><div style="width:100%;aspect-ratio:1;background:#2121210a;border:1px solid #dadada;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#717171;font-size:10px">#2121210a</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">12 - bg-divider</div><div style="width:100%;aspect-ratio:1;background:#adadad80;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px">#adadad80</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">13 - bg-border</div><div style="width:100%;aspect-ratio:1;background:#dadada80;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#717171;font-size:10px">#dadada80</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">14 - bg-border-highlighted</div><div style="width:100%;aspect-ratio:1;background:#717171;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px">#717171</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">15 - interactive-primary</div><div style="width:100%;aspect-ratio:1;background:#be0000;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px">#be0000</div></div>
    <div><div style="font-size:12px;color:#717171;margin-bottom:6px">16 - interactive-primary-action</div><div style="width:100%;aspect-ratio:1;background:#a00000;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px">#a00000</div></div>
  </div>
</div>`,

  'ES Icons': `
<div class="gds-preview">
  <div class="gds-icon-grid">
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#8592;</span><span class="gds-icon-item__name">arrow-left</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#8594;</span><span class="gds-icon-item__name">arrow-right</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#8593;</span><span class="gds-icon-item__name">arrow-up</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#8595;</span><span class="gds-icon-item__name">arrow-down</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#10003;</span><span class="gds-icon-item__name">check</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#10005;</span><span class="gds-icon-item__name">close</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#9881;</span><span class="gds-icon-item__name">settings</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#128269;</span><span class="gds-icon-item__name">search</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#9733;</span><span class="gds-icon-item__name">star</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#128274;</span><span class="gds-icon-item__name">lock</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#128276;</span><span class="gds-icon-item__name">bell</span></div>
    <div class="gds-icon-item"><span class="gds-icon-item__icon">&#128100;</span><span class="gds-icon-item__name">user</span></div>
  </div>
  <div style="font-size:12px;color:#717171;margin-top:12px;text-align:center">120+ SVG ikon dostupných přes co-icon komponentu</div>
</div>`,

  'ES Icon Flag': `
<div class="gds-preview">
  <div class="gds-preview-row" style="gap:16px">
    <div style="display:flex;align-items:center;gap:8px">
      <div class="gds-flag" style="background:linear-gradient(180deg,#fff 50%,#d7141a 50%)"></div>
      <span style="font-size:13px;color:#454545">CZ</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <div class="gds-flag" style="background:linear-gradient(180deg,#000 33.3%,#dd0000 33.3%,#dd0000 66.6%,#ffce00 66.6%)"></div>
      <span style="font-size:13px;color:#454545">DE</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <div class="gds-flag" style="background:#012169"></div>
      <span style="font-size:13px;color:#454545">GB</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <div class="gds-flag" style="background:linear-gradient(180deg,#fff 50%,#ce1126 50%)"></div>
      <span style="font-size:13px;color:#454545">PL</span>
    </div>
  </div>
</div>`,

  'ES Icon / Interaction Icon / SubIcon': `
<div class="gds-preview gds-preview-col">
  <div class="gds-preview-label">Icon content sources</div>
  <div style="display:flex;gap:24px;align-items:flex-start;font-size:12px;color:#717171">
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">content</div><span style="font-size:24px;color:#212121">&#128100;</span></div>
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">iconString</div><span style="font-size:24px;color:#212121">PD</span></div>
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">iconUrl</div><span style="font-size:24px;color:#717171">&#127748;</span></div>
  </div>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Icon badge and subicon</div>
  <div style="display:flex;gap:20px;align-items:flex-start;font-size:12px;color:#717171">
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">n = '1'</div><div style="position:relative;display:inline-block"><span style="font-size:24px;color:#212121">&#128100;</span><span style="position:absolute;top:-4px;right:-8px;background:#be0000;color:#fff;font-size:9px;min-width:14px;height:14px;border-radius:7px;display:flex;align-items:center;justify-content:center;padding:0 3px">1</span></div></div>
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">n = '19'</div><div style="position:relative;display:inline-block"><span style="font-size:24px;color:#212121">&#128100;</span><span style="position:absolute;top:-4px;right:-10px;background:#be0000;color:#fff;font-size:9px;min-width:14px;height:14px;border-radius:7px;display:flex;align-items:center;justify-content:center;padding:0 3px">19</span></div></div>
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">n = '99+'</div><div style="position:relative;display:inline-block"><span style="font-size:24px;color:#212121">&#128100;</span><span style="position:absolute;top:-4px;right:-12px;background:#be0000;color:#fff;font-size:9px;min-width:14px;height:14px;border-radius:7px;display:flex;align-items:center;justify-content:center;padding:0 3px">99+</span></div></div>
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">subicon</div><div style="position:relative;display:inline-block"><span style="font-size:24px;color:#212121">&#128100;</span><span style="position:absolute;bottom:-2px;right:-4px;width:10px;height:10px;background:#dadada;border-radius:50%;border:1px solid #fff"></span></div></div>
  </div>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Colors</div>
  <div style="display:flex;gap:20px;align-items:flex-start;font-size:12px;color:#717171">
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">color="red"</div><span style="font-size:24px;color:#be0000">&#9745;</span></div>
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">color="green"</div><span style="font-size:24px;color:#207c29">&#9745;</span></div>
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">color="blue"</div><span style="font-size:24px;color:#2196f3">&#9745;</span></div>
    <div style="text-align:center"><div style="font-size:11px;margin-bottom:4px">color="#c367a9"</div><span style="font-size:24px;color:#c367a9">&#9745;</span></div>
  </div>
</div>`,

  'ES Illustration': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#127912;</span>
    Illustration assets – prázdné stavy, onboarding, informační obrazovky
  </div>
</div>`,

  'ES Surface Effect': `
<div class="gds-preview">
  <div style="display:flex;gap:16px;flex-wrap:wrap">
    <div class="gds-surface gds-surface--level-1" style="flex:1;min-width:100px">Level 1</div>
    <div class="gds-surface gds-surface--level-2" style="flex:1;min-width:100px">Level 2</div>
    <div class="gds-surface gds-surface--level-3" style="flex:1;min-width:100px">Level 3</div>
  </div>
</div>`,

  'ES Text Styles': `
<div class="gds-preview gds-preview-col" style="gap:4px">
  <div class="gds-preview-label">Headings – Title</div>
  <div style="font-size:28px;font-weight:400;color:#212121">Title Primary</div>
  <div style="font-size:28px;font-weight:600;color:#212121">Title Primary Bolder <span style="font-size:12px;color:#717171;font-weight:400">(font-weight: 600)</span></div>
  <div style="font-size:22px;font-weight:400;color:#212121">Title Secondary</div>
  <div style="font-size:22px;font-weight:600;color:#212121">Title Secondary Bolder <span style="font-size:12px;color:#717171;font-weight:400">(font-weight: 600)</span></div>
  <div style="font-size:18px;font-weight:400;color:#212121">Title Tertiary</div>
  <div style="font-size:16px;font-weight:400;color:#212121">Title Quaternary</div>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Headings – Headline</div>
  <div style="font-size:16px;font-weight:400;color:#212121">Headline Primary</div>
  <div style="font-size:16px;font-weight:600;color:#212121">Headline Primary Bolder <span style="font-size:12px;color:#717171;font-weight:400">(font-weight: 600)</span></div>
  <div style="font-size:14px;font-weight:400;color:#212121">Headline Secondary</div>
  <div style="font-size:14px;font-weight:600;color:#212121">Headline Secondary Bolder <span style="font-size:12px;color:#717171;font-weight:400">(font-weight: 600)</span></div>
  <div class="gds-preview-spacer"></div>
  <div class="gds-preview-label">Content</div>
  <div style="font-size:14px;color:#212121">Body Primary</div>
  <div style="font-size:14px;font-weight:500;color:#212121">Body Primary Bold <span style="font-size:12px;color:#717171;font-weight:400">(font-weight: 500)</span></div>
  <div style="font-size:12px;color:#717171">Body Secondary</div>
  <div style="font-size:12px;font-weight:500;color:#717171">Body Secondary Bold <span style="font-weight:400">(font-weight: 500)</span></div>
  <div style="font-size:11px;color:#717171">Caption Primary</div>
  <div style="font-size:11px;font-weight:500;color:#717171">Caption Primary Bold <span style="font-weight:400">(font-weight: 500)</span></div>
  <div style="font-size:10px;color:#999">Caption Secondary</div>
</div>`,

  // ─── Auxiliary ─────────────────────────────────────────────────────────────

  'Avatar': `
<div class="gds-preview">
  <div class="gds-preview-row" style="gap:16px">
    <div style="text-align:center">
      <div class="gds-avatar gds-avatar--sm">JD</div>
      <div style="font-size:10px;color:#717171;margin-top:4px">Small</div>
    </div>
    <div style="text-align:center">
      <div class="gds-avatar gds-avatar--primary">MN</div>
      <div style="font-size:10px;color:#717171;margin-top:4px">Default</div>
    </div>
    <div style="text-align:center">
      <div class="gds-avatar gds-avatar--lg gds-avatar--success">OK</div>
      <div style="font-size:10px;color:#717171;margin-top:4px">Large</div>
    </div>
    <div style="text-align:center">
      <div class="gds-avatar gds-avatar--lg gds-avatar--error">!</div>
      <div style="font-size:10px;color:#717171;margin-top:4px">Error</div>
    </div>
  </div>
</div>`,

  // ─── Templates ─────────────────────────────────────────────────────────────

  'TMPL Corporate Header': `
<div class="gds-preview" style="padding:0;overflow:hidden;border-radius:8px">
  <div class="gds-header gds-header--ground">
    <span style="font-weight:700;font-size:16px;letter-spacing:0.02em">LOGO</span>
    <span class="gds-header__title">Corporate App</span>
    <div class="gds-avatar gds-avatar--sm" style="background:rgba(255,255,255,0.15);color:#fff">MN</div>
  </div>
</div>`,

  'TMPL Section Header': `
<div class="gds-preview gds-preview-col" style="gap:16px">
  <div class="gds-preview-label">Default section header</div>
  <div style="display:flex;align-items:center;gap:12px;padding:8px 0">
    <div class="gds-avatar gds-avatar--sm">&#128100;</div>
    <span style="font-size:16px;font-weight:700;color:#212121;flex:1">Nadpis Sekce</span>
    <span style="font-size:16px;color:#717171;cursor:pointer">&#128269;</span>
    <span style="font-size:16px;color:#717171;cursor:pointer">&#9998;</span>
  </div>
  <div class="gds-preview-label">Section header (buttons and dropdown)</div>
  <div style="display:flex;align-items:center;gap:12px;padding:8px 0">
    <div class="gds-avatar gds-avatar--sm">&#128100;</div>
    <span style="font-size:16px;font-weight:700;color:#212121;flex:1">Nadpis Sekce</span>
    <button class="gds-btn gds-btn--secondary gds-btn--sm">$label</button>
    <button class="gds-btn gds-btn--secondary gds-btn--sm">$label</button>
    <span style="font-size:16px;color:#717171;cursor:pointer">&#9662;</span>
  </div>
</div>`,

  // ─── Others ────────────────────────────────────────────────────────────────

  'Data Types': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">{ }</span>
    Data Types – sdílené rozhraní a typy používané napříč komponentami
  </div>
</div>`,

  'Directive - checkTextEllipsis': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#8230;</span>
    checkTextEllipsis – direktiva detekující overflow textu, zobrazí tooltip
  </div>
</div>`,

  'Directive - Mockable': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#128295;</span>
    Mockable – direktiva pro označení komponent jako mockovatelných v testovacím prostředí
  </div>
</div>`,

  'Drag and Drop': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#8597;</span>
    Drag and Drop – přetahování a řazení položek
  </div>
</div>`,

  'Editor': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#9998;</span>
    Editor – rich text editor komponenta
  </div>
</div>`,

  'Message Detail': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#128172;</span>
    Message Detail – detail zprávy s metadaty, akcemi a vláknem
  </div>
</div>`,

  'Navigation Detail': `
<div class="gds-preview">
  <div class="gds-placeholder">
    <span class="gds-placeholder__icon">&#128204;</span>
    Navigation Detail – breadcrumbs a vnořená navigace
  </div>
</div>`,

  'Even Layout': `
<div class="gds-preview">
  <div style="display:flex;gap:8px">
    <div style="flex:1;padding:16px;background:#fff;border-radius:8px;text-align:center;box-shadow:0 1px 2px rgba(33,33,33,0.08)">Item 1</div>
    <div style="flex:1;padding:16px;background:#fff;border-radius:8px;text-align:center;box-shadow:0 1px 2px rgba(33,33,33,0.08)">Item 2</div>
    <div style="flex:1;padding:16px;background:#fff;border-radius:8px;text-align:center;box-shadow:0 1px 2px rgba(33,33,33,0.08)">Item 3</div>
  </div>
</div>`,
};
