// adas2 5.x TypeScript 선언

type EaseName =
  | 'Linear'
  | `${'In' | 'Out' | 'InOut'}${'Sine' | 'Quad' | 'Cubic' | 'Quart' | 'Quint' | 'Expo' | 'Circ' | 'Back' | 'Elastic' | 'Bounce'}`;

export type ThemeName = 'dark' | 'light' | 'ocean' | (string & {});
export type Variant = 'info' | 'success' | 'warning' | 'danger' | 'default';
export type SpringName = 'snap' | 'move' | 'slow' | 'fx' | 'fxFast';
/** k: 강성(클수록 빠름), z: 감쇠비(1 이면 안 튕김) */
export interface SpringConfig { k: number; z: number }

export interface ToastOptions {
  variant?: Variant;
  /** ms. 0 이면 닫을 때까지 남음 */
  duration?: number;
  action?: { label: string; onClick?: () => void };
  position?: 'bottom' | 'top';
  max?: number;
  onClose?: () => void;
}
export interface DialogTextOptions { title?: string; message?: string; okText?: string; cancelText?: string; danger?: boolean }
export interface PromptOptions extends DialogTextOptions { value?: string; placeholder?: string; type?: string; label?: string }
export interface Animation { stop(): void; finish(): void }

export declare const version: string;
export declare function toast(message: string, options?: ToastOptions): { close(): void };
export declare function alert(message: string | DialogTextOptions, options?: DialogTextOptions): Promise<void>;
export declare function confirm(message: string | DialogTextOptions, options?: DialogTextOptions): Promise<boolean>;
export declare function prompt(message: string | PromptOptions, options?: PromptOptions): Promise<string | null>;
export declare function theme(): ThemeName | 'auto';
export declare function theme(name: ThemeName | 'auto'): ThemeName | 'auto';
export declare const themes: ThemeName[];
/** 강조색 하나로 테마를 만든다 */
export declare function defineTheme(name: string, options?: { base?: 'dark' | 'light' | 'ocean'; accent?: string; tokens?: Record<string, string> }): string;
/** 튕김 정도(0~1.6)와 스프링 값을 바꾼다 */
export declare function setMotion(options?: { bounce?: number; springs?: Partial<Record<SpringName, Partial<SpringConfig>>> }): { bounce: number };
export declare const SPRINGS: Record<SpringName, SpringConfig>;

/** 값과 속도를 가지고 목표로 움직이는 스프링 */
export declare class Spring {
  constructor(value?: number, cfg?: SpringName | SpringConfig, onUpdate?: (x: number, s: Spring) => void, eps?: number);
  x: number; to: number; v: number;
  /** 멈췄을 때 한 번 */
  rest: (() => void) | null;
  readonly moving: boolean;
  set(to: number, options?: { cfg?: SpringName | SpringConfig; velocity?: number; instant?: boolean }): this;
  jump(x: number): this;
  stop(): this;
}
export declare function springs<T extends Record<string, number>>(init: T, cfg: SpringName | SpringConfig, onUpdate: (v: T) => void, eps?: number): {
  cur: T; set(to: Partial<T>, options?: { cfg?: SpringName | SpringConfig; velocity?: number | Partial<T> }): unknown; jump(to: Partial<T>): unknown; readonly moving: boolean;
};
export declare function springEase(cfg: SpringName | SpringConfig): { ease: string; duration: number };
export interface DragInfo { dx: number; dy: number; vx: number; vy: number; moved: boolean; cancelled?: boolean; e: PointerEvent }
export declare function drag(el: Element, handlers: { start?(e: PointerEvent): boolean | void; move?(i: Pick<DragInfo, 'dx' | 'dy' | 'moved' | 'e'>): void; end?(i: DragInfo): void }): void;
export declare function rubber(over: number, range?: number): number;
export declare function ripple(surface: HTMLElement): void;
export declare function openPopover(pop: HTMLElement, anchor: Element | { x: number; y: number }, options?: { match?: boolean; gap?: number; alignEnd?: boolean; onClose?: () => void; closeOnOutside?: Element[] }): { close(): void; readonly open: boolean };
export declare function icon(name: string, size?: number): string;
export declare function addIcon(name: string, viewBox: string, d: string): void;
export declare function animate<T extends Record<string, number>>(from: T, to: T, options?: {
  duration?: number; ease?: EaseName | ((t: number) => number); onUpdate?: (v: T, progress: number) => void; onDone?: () => void;
}): Animation;
export declare function reveal(el: HTMLElement, p: number, from?: 'bottom' | 'top'): void;
export declare const Ease: Readonly<Record<EaseName, (t: number) => number>>;
export declare function evaluate(src: string, vars?: Record<string, number>): { ok: true; value: number } | { ok: false; error: string };
export declare function matchKey(e: KeyboardEvent, combo: string): boolean;
export declare function keyNames(combo: string): string[];
export declare const BASE_CSS: string;
export declare function define(name: string, cls: CustomElementConstructor): void;

/** 직접 요소를 만들 때의 바탕. static styles 에 CSS, render() 에서 this.root 를 채운다 */
export declare class A2Element extends HTMLElement {
  static styles: string;
  static delegatesFocus: boolean;
  root: ShadowRoot;
  internals?: ElementInternals;
  disabled: boolean;
  name: string;
  readonly form: HTMLFormElement | null;
  render(): void;
  update(): void;
  attr(name: string, value: string | null, old: string | null): void;
  $<T extends Element = HTMLElement>(selector: string): T;
  emit(type: string, detail?: unknown): boolean;
  fire(type: 'input' | 'change'): void;
  bool(name: string): boolean;
  setBool(name: string, on: unknown): void;
  str(name: string, fallback?: string): string;
  num(name: string, fallback?: number): number;
}

export declare class A2Button extends A2Element { loading: boolean; selected: boolean }
export declare class A2SplitButton extends A2Element {}
export declare class A2FabItem extends HTMLElement { readonly value: string }
export declare class A2Fab extends A2Element { open: boolean; readonly items: A2FabItem[] }
export declare class A2Input extends A2Element { value: string; select(): void; checkValidity(): boolean; reportValidity(): boolean }
export declare class A2Textarea extends A2Input {}
export declare class A2Number extends A2Element { value: number; readonly min: number; readonly max: number; readonly step: number }
export declare class A2Checkbox extends A2Element { checked: boolean; indeterminate: boolean; value: string; toggle(): void }
export declare class A2Switch extends A2Element { checked: boolean; value: string; toggle(): void }
export declare class A2Radio extends A2Element { checked: boolean; readonly value: string }
export declare class A2RadioGroup extends A2Element { value: string; readonly radios: A2Radio[] }
export declare class A2Slider extends A2Element { value: number; readonly min: number; readonly max: number; readonly step: number }
export declare class A2Option extends HTMLElement { readonly value: string; readonly label: string; readonly disabled: boolean }
export declare class A2Select extends A2Element {
  value: string | string[];
  readonly options: A2Option[];
  readonly selectedOptions: A2Option[];
  readonly isOpen: boolean;
  open(): void;
  close(): void;
}
export declare class A2Chip extends A2Element { selected: boolean; readonly value: string }
export declare class A2Segment extends HTMLElement { readonly value: string; readonly disabled: boolean }
export declare class A2Segmented extends A2Element { value: string | string[] }
export declare class A2TabPanel extends HTMLElement { readonly value: string; readonly label: string }
export declare class A2Tabs extends A2Element { value: string; readonly panels: A2TabPanel[] }
export declare class A2Color extends A2Element { value: string; readonly isOpen: boolean; open(): void }
export declare class A2Keybind extends A2Element { value: string; readonly recording: boolean; start(): void; stop(): void }
export declare class A2Progress extends A2Element { value: number | null }
export declare class A2Spinner extends A2Element {}
export declare class A2Badge extends A2Element {}
export declare class A2Card extends A2Element {}
export declare class A2Dialog extends A2Element { open: boolean; returnValue: string; show(from?: Element): this; close(returnValue?: string): this }
export declare class A2Drawer extends A2Dialog {}
export declare class A2MenuItem extends HTMLElement { readonly value: string }
export declare class A2Menu extends A2Element { readonly isOpen: boolean; show(at?: Element | { x: number; y: number }): void; close(): void }

declare const adas2: {
  version: typeof version; toast: typeof toast; alert: typeof alert; confirm: typeof confirm; prompt: typeof prompt;
  theme: typeof theme; themes: typeof themes; defineTheme: typeof defineTheme; setMotion: typeof setMotion;
  A2Element: typeof A2Element; define: typeof define; BASE_CSS: typeof BASE_CSS; icon: typeof icon; addIcon: typeof addIcon; ripple: typeof ripple; openPopover: typeof openPopover;
  Spring: typeof Spring; springs: typeof springs; SPRINGS: typeof SPRINGS; springEase: typeof springEase; drag: typeof drag; rubber: typeof rubber;
  animate: typeof animate; reveal: typeof reveal; Ease: typeof Ease; evaluate: typeof evaluate; matchKey: typeof matchKey; keyNames: typeof keyNames;
};
export default adas2;

declare global {
  interface HTMLElementTagNameMap {
    'a2-button': A2Button;
    'a2-split-button': A2SplitButton;
    'a2-fab': A2Fab;
    'a2-fab-item': A2FabItem;
    'a2-input': A2Input;
    'a2-textarea': A2Textarea;
    'a2-number': A2Number;
    'a2-checkbox': A2Checkbox;
    'a2-switch': A2Switch;
    'a2-radio': A2Radio;
    'a2-radio-group': A2RadioGroup;
    'a2-slider': A2Slider;
    'a2-option': A2Option;
    'a2-select': A2Select;
    'a2-chip': A2Chip;
    'a2-segment': A2Segment;
    'a2-segmented': A2Segmented;
    'a2-tab-panel': A2TabPanel;
    'a2-tabs': A2Tabs;
    'a2-color': A2Color;
    'a2-keybind': A2Keybind;
    'a2-progress': A2Progress;
    'a2-spinner': A2Spinner;
    'a2-badge': A2Badge;
    'a2-card': A2Card;
    'a2-dialog': A2Dialog;
    'a2-drawer': A2Drawer;
    'a2-menu-item': A2MenuItem;
    'a2-menu': A2Menu;
  }
  interface HTMLElementEventMap {
    'a2-show': CustomEvent<void>;
    'a2-close': CustomEvent<{ returnValue?: string } | void>;
    'a2-select': CustomEvent<{ value: string; item: Element }>;
    'a2-change': CustomEvent<{ value: string }>;
    'a2-toggle': CustomEvent<{ open: boolean }>;
    'a2-remove': CustomEvent<{ value: string }>;
  }
  interface DocumentEventMap {
    'a2-theme': CustomEvent<{ theme: ThemeName | 'auto' }>;
  }
}
