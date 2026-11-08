// adas2 3.x 타입 선언

export type EaseName =
  | 'Linear' | 'InSine' | 'OutSine' | 'InOutSine' | 'InQuad' | 'OutQuad' | 'InOutQuad'
  | 'InCubic' | 'OutCubic' | 'InOutCubic' | 'InQuart' | 'OutQuart' | 'InOutQuart'
  | 'InQuint' | 'OutQuint' | 'InOutQuint' | 'InExpo' | 'OutExpo' | 'InOutExpo'
  | 'InCirc' | 'OutCirc' | 'InOutCirc' | 'InBack' | 'OutBack' | 'InOutBack'
  | 'InElastic' | 'OutElastic' | 'InOutElastic' | 'InBounce' | 'OutBounce' | 'InOutBounce';

export interface ThemeValues {
  name: string;
  bg: string; surface: string; surfaceHover: string; surfaceActive: string; raised: string;
  accent: string; accentHover: string; accentPressed: string; accentSoft: string; onAccent: string;
  text: string; textMuted: string; textFaint: string;
  danger: string; success: string; warning: string;
  shadow: string; scrim: string; tooltip: string;
  radius: number; radiusLarge: number; controlHeight: number;
  fontSize: number; fontSizeSmall: number; fontSizeTitle: number;
  font: string; weight: number; weightStrong: number;
}
export declare class Theme implements Readonly<ThemeValues> {
  readonly [key: string]: any;
  extend(over: Partial<ThemeValues>): Theme;
  apply(el: HTMLElement): void;
}
export declare const themes: { readonly dark: Theme; readonly light: Theme; readonly ocean: Theme };

export interface Settings { theme: Theme; scale: number; animation: number; tooltips: boolean; root: HTMLElement | null; }
export declare const settings: Settings;
export declare function setup(o?: { theme?: 'dark' | 'light' | 'ocean' | Theme; scale?: number; animation?: number; tooltips?: boolean; root?: HTMLElement }): void;
export declare function setTheme(t: 'dark' | 'light' | 'ocean' | Theme): void;
export declare function onSettings(fn: (s: Settings) => void): () => void;

export interface Anim { kill(): void; complete(): void; }
export declare function animate<T extends Record<string, number>>(from: T, to: T, o?: { duration?: number; ease?: EaseName | ((t: number) => number); onUpdate?: (v: T, p: number) => void; onDone?: () => void }): Anim;
export declare const Ease: Readonly<Record<EaseName, (t: number) => number>>;
export declare function evaluate(expr: string, vars?: Record<string, number>): { ok: boolean; value?: number; error?: string };
export declare function tooltip(el: Element, text: string | (() => string)): Element;

export interface Binding { readonly combo: string; rebind(combo: string): void; unbind(): void; }
export declare const keys: {
  paused: () => boolean;
  bind(combo: string, fn: (e: KeyboardEvent) => void, o?: { hold?: number; onHold?: () => void; onRelease?: () => void }): Binding;
  parse(combo: string): { mods: string[]; key: string };
  names(combo: string): string[];
};

type Parent = Element | string | { el: Element } | { body: Element } | { host: Element } | null;
interface Common<V> { id?: string; tooltip?: string | (() => string); className?: string; onChange?: (v: V, c: any) => void; onCommit?: (v: V, c: any) => void; }

export declare class Component<V = unknown> {
  readonly el: HTMLElement;
  readonly id?: string;
  value: V;
  readonly changed: boolean;
  readonly disabled: boolean;
  mount(parent: Parent): this;
  on(event: 'change' | 'commit' | string, fn: (v: V, c: this) => void): this;
  off(event: string, fn: Function): this;
  set(v: V, o?: { silent?: boolean }): this;
  reset(): this;
  disable(off?: boolean): this;
  enable(): this;
  destroy(): void;
}
export declare function get<C extends Component = Component<any>>(id: string): C | undefined;

export interface ButtonOptions extends Common<never> { text?: string; icon?: string | Element; variant?: 'primary' | 'soft' | 'ghost' | 'danger'; size?: 'md' | 'sm'; block?: boolean; onClick?: (e: MouseEvent) => void; }
export declare class Button extends Component<never> { constructor(o?: ButtonOptions); text: string; readonly loading: boolean; setLoading(on?: boolean): this; }
export interface ToggleOptions extends Common<boolean> { label?: string; description?: string; value?: boolean; default?: boolean; }
export declare class Switch extends Component<boolean> { constructor(o?: ToggleOptions); toggle(): this; }
export declare class Checkbox extends Component<boolean> { constructor(o?: ToggleOptions); }
export type Option<T> = T | { value: T; label?: string; description?: string };
export interface RadioOptions<T> extends Common<T> { label?: string; options: Option<T>[]; value?: T; default?: T; }
export declare class Radio<T = string> extends Component<T> { constructor(o?: RadioOptions<T>); }
export interface NumberOptions extends Common<number> { label?: string; description?: string; min?: number; max?: number; step?: number; value?: number; default?: number; unit?: string; decimals?: number; format?: (v: number) => string; }
export declare class Slider extends Component<number> { constructor(o?: NumberOptions); }
export declare class Stepper extends Component<number> { constructor(o?: NumberOptions); }
export interface FieldOptions extends Common<string> { label?: string; value?: string; default?: string; placeholder?: string; icon?: string | Element; multiline?: boolean; rows?: number; maxLength?: number; type?: string; }
export declare class Field extends Component<string> { constructor(o?: FieldOptions); focus(): this; }
export interface SelectOptions<T> extends Common<T> { label?: string; options: Option<T>[]; value?: T; default?: T; placeholder?: string; }
export declare class Select<T = string> extends Component<T> { constructor(o?: SelectOptions<T>); readonly isOpen: boolean; open(): void; close(): void; toggle(): void; setOptions(options: Option<T>[]): this; }
export interface MultiSelectOptions<T> extends Common<T[]> { label?: string; options: Option<T>[]; value?: T[]; default?: T[]; placeholder?: string; summary?: (values: T[]) => string; }
export declare class MultiSelect<T = string> extends Component<T[]> { constructor(o?: MultiSelectOptions<T>); open(): void; close(): void; }
export interface SegmentedOptions<T> extends Common<T> { label?: string; options: Option<T>[]; value?: T; default?: T; }
export declare class Segmented<T = string> extends Component<T> { constructor(o?: SegmentedOptions<T>); }
export interface TabDef { value?: any; label?: string; build?: (body: any) => void; }
export declare class Tabs extends Component<any> { constructor(o?: Common<any> & { tabs: TabDef[]; value?: any }); pane(value: any): HTMLElement; }
export interface ColorOptions extends Common<string> { label?: string; value?: string; default?: string; presets?: string[]; }
export declare class ColorPicker extends Component<string> { constructor(o?: ColorOptions); open(): void; close(): void; setHsv(h: number, s: number, v: number, a?: number): void; }
export interface KeyBindOptions extends Common<string> { label?: string; description?: string; value?: string; default?: string; onPress?: (e: KeyboardEvent) => void; hold?: number; onHold?: () => void; }
export declare class KeyBind extends Component<string> { constructor(o?: KeyBindOptions); record(): void; stop(): void; }
export interface ProgressOptions extends Common<number | null> { label?: string; value?: number | null; showValue?: boolean; }
export declare class Progress extends Component<number | null> { constructor(o?: ProgressOptions); }
export declare class Spinner extends Component<never> { constructor(o?: { size?: number; label?: string }); }
export interface SectionOptions extends Common<boolean> { title?: string; description?: string; toggle?: boolean; enabled?: boolean; collapsible?: boolean; collapsed?: boolean; actions?: { label?: string; icon?: string; danger?: boolean; onClick?: (s: Section) => void }[]; }
export declare class Section extends Component<boolean> { constructor(o?: SectionOptions); readonly body: HTMLElement; readonly enabled: boolean; readonly expanded: boolean; ui: Builder; setExpanded(open: boolean): this; }
export declare class ScrollArea extends Component<never> { constructor(o?: { height?: number | string }); readonly body: HTMLElement; ui: Builder; }

export declare class Builder {
  constructor(host: Parent);
  readonly host: HTMLElement;
  add<C extends Component<any>>(c: C): C;
  button(text: string, onClick?: (e: MouseEvent) => void, o?: ButtonOptions): Button;
  button(o: ButtonOptions): Button;
  switch(label: string, o?: ToggleOptions): Switch;
  checkbox(label: string, o?: ToggleOptions): Checkbox;
  radio<T>(label: string, options: Option<T>[], o?: Partial<RadioOptions<T>>): Radio<T>;
  slider(label: string, o?: NumberOptions): Slider;
  stepper(label: string, o?: NumberOptions): Stepper;
  field(label: string, o?: FieldOptions): Field;
  select<T>(label: string, options: Option<T>[], o?: Partial<SelectOptions<T>>): Select<T>;
  multiSelect<T>(label: string, options: Option<T>[], o?: Partial<MultiSelectOptions<T>>): MultiSelect<T>;
  segmented<T>(options: Option<T>[], o?: Partial<SegmentedOptions<T>>): Segmented<T>;
  color(label: string, o?: ColorOptions): ColorPicker;
  keybind(label: string, o?: KeyBindOptions): KeyBind;
  progress(label: string, o?: ProgressOptions): Progress;
  spinner(o?: { size?: number }): Spinner;
  tabs(tabs: { value?: any; label?: string; build?: (ui: Builder) => void }[], o?: { value?: any; id?: string }): Tabs;
  section(title: string, o?: SectionOptions | ((ui: Builder) => void), fill?: (ui: Builder) => void): Section;
  scroll(o?: { height?: number | string } | ((ui: Builder) => void), fill?: (ui: Builder) => void): ScrollArea;
  row(fill?: (ui: Builder) => void, o?: { gap?: number }): HTMLElement;
  stack(fill?: (ui: Builder) => void, o?: { gap?: number }): HTMLElement;
  text(t: string, o?: { muted?: boolean; small?: boolean }): HTMLElement;
  title(t: string): HTMLElement;
  divider(): HTMLElement;
}
export declare function ui(host: Parent): Builder;

export interface PanelOptions { title?: string; width?: number; height?: number; x?: number; y?: number; resizable?: boolean; minWidth?: number; minHeight?: number; closable?: boolean; onClose?: 'hide' | 'destroy' | 'none'; hidden?: boolean; root?: Element; }
export declare class Panel {
  constructor(o?: PanelOptions);
  readonly el: HTMLElement; readonly body: HTMLElement; readonly visible: boolean; ui: Builder;
  on(event: 'show' | 'hide' | 'close' | 'move' | 'resize' | 'destroy', fn: (...a: any[]) => void): this;
  show(): this; hide(): this; toggle(): this; close(): this; focus(): this;
  setTitle(t: string): this; setSize(w: number, h: number): this; place(x?: number, y?: number): this; destroy(): void;
}
export declare function panel(o?: PanelOptions, fill?: (ui: Builder) => void): Panel;

export declare function toast(text: string, o?: { type?: 'info' | 'success' | 'warning' | 'error'; duration?: number; action?: { label: string; onClick?: () => void } }): { close(): void };
export declare function dialog<T = any>(o?: { title?: string; message?: string; content?: (body: HTMLElement) => void; buttons?: { label: string; value?: T; variant?: string }[]; dismissable?: boolean }): Promise<T | undefined>;
export declare function confirm(message: string, o?: { title?: string; ok?: string; cancel?: string; danger?: boolean }): Promise<boolean>;
export declare function alert(message: string, o?: { title?: string; ok?: string }): Promise<void>;
export interface MenuItem { label: string; icon?: string | Element; shortcut?: string; danger?: boolean; disabled?: boolean; onSelect?: () => void; }
export declare function openMenu(x: number, y: number, items: (MenuItem | '-')[]): { close(): void; readonly open: boolean };
export declare function menu(target: Element | string, items: (MenuItem | '-')[] | ((e: MouseEvent) => (MenuItem | '-')[])): Element;

export declare const version: string;
declare const adas2: {
  version: string; setup: typeof setup; setTheme: typeof setTheme; settings: Settings; onSettings: typeof onSettings;
  Theme: typeof Theme; themes: typeof themes; Ease: typeof Ease; animate: typeof animate; tooltip: typeof tooltip; keys: typeof keys; evaluate: typeof evaluate;
  ui: typeof ui; panel: typeof panel; Builder: typeof Builder; Panel: typeof Panel; get: typeof get;
  toast: typeof toast; dialog: typeof dialog; confirm: typeof confirm; alert: typeof alert; menu: typeof menu; openMenu: typeof openMenu;
  Component: typeof Component; Button: typeof Button; Switch: typeof Switch; Checkbox: typeof Checkbox; Radio: typeof Radio;
  Slider: typeof Slider; Stepper: typeof Stepper; Field: typeof Field; Select: typeof Select; MultiSelect: typeof MultiSelect;
  Segmented: typeof Segmented; Tabs: typeof Tabs; ColorPicker: typeof ColorPicker; KeyBind: typeof KeyBind;
  Progress: typeof Progress; Spinner: typeof Spinner; Section: typeof Section; ScrollArea: typeof ScrollArea;
};
export default adas2;
declare global { interface Window { adas2: typeof adas2; } }
