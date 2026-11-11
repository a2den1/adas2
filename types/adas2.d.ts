// adas2 4.x TypeScript 선언

type EaseName =
  | 'Linear'
  | `${'In' | 'Out' | 'InOut'}${'Sine' | 'Quad' | 'Cubic' | 'Quart' | 'Quint' | 'Expo' | 'Circ' | 'Back' | 'Elastic' | 'Bounce'}`;

export type ThemeName = 'dark' | 'light' | 'ocean';
export type Variant = 'info' | 'success' | 'warning' | 'danger' | 'default';

export interface ToastOptions {
  variant?: Variant;
  /** ms. 0 이면 닫을 때까지 남음 */
  duration?: number;
  action?: { label: string; onClick?: () => void };
  position?: 'bottom' | 'top';
  max?: number;
  onClose?: () => void;
}
export interface DialogTextOptions {
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
  danger?: boolean;
}
export interface PromptOptions extends DialogTextOptions {
  value?: string;
  placeholder?: string;
  type?: string;
  label?: string;
}
export interface Animation { stop(): void; finish(): void }

export declare const version: string;
export declare function toast(message: string, options?: ToastOptions): { close(): void };
export declare function alert(message: string | DialogTextOptions, options?: DialogTextOptions): Promise<void>;
export declare function confirm(message: string | DialogTextOptions, options?: DialogTextOptions): Promise<boolean>;
export declare function prompt(message: string | PromptOptions, options?: PromptOptions): Promise<string | null>;
export declare function theme(): ThemeName | 'auto';
export declare function theme(name: ThemeName | 'auto'): ThemeName | 'auto';
export declare const themes: ThemeName[];
export declare function animate<T extends Record<string, number>>(from: T, to: T, options?: {
  duration?: number; ease?: EaseName | ((t: number) => number); onUpdate?: (v: T, progress: number) => void; onDone?: () => void;
}): Animation;
export declare const Ease: Readonly<Record<EaseName, (t: number) => number>>;
export declare function evaluate(src: string, vars?: Record<string, number>): { ok: true; value: number } | { ok: false; error: string };
export declare function matchKey(e: KeyboardEvent, combo: string): boolean;
export declare function keyNames(combo: string): string[];

declare const adas2: {
  version: typeof version; toast: typeof toast; alert: typeof alert; confirm: typeof confirm; prompt: typeof prompt;
  theme: typeof theme; themes: typeof themes; animate: typeof animate; Ease: typeof Ease; evaluate: typeof evaluate;
  matchKey: typeof matchKey; keyNames: typeof keyNames;
};
export default adas2;

declare class A2FormElement extends HTMLElement {
  disabled: boolean;
  name: string;
  readonly form: HTMLFormElement | null;
}
export declare class A2Button extends A2FormElement { loading: boolean }
export declare class A2Input extends A2FormElement { value: string; select(): void; checkValidity(): boolean; reportValidity(): boolean }
export declare class A2Textarea extends A2Input {}
export declare class A2Number extends A2FormElement { value: number; readonly min: number; readonly max: number; readonly step: number }
export declare class A2Checkbox extends A2FormElement { checked: boolean; indeterminate: boolean; value: string; toggle(): void }
export declare class A2Switch extends A2FormElement { checked: boolean; value: string; toggle(): void }
export declare class A2Radio extends HTMLElement { checked: boolean; disabled: boolean; readonly value: string }
export declare class A2RadioGroup extends A2FormElement { value: string; readonly radios: A2Radio[] }
export declare class A2Slider extends A2FormElement { value: number; readonly min: number; readonly max: number; readonly step: number }
export declare class A2Option extends HTMLElement { readonly value: string; readonly label: string; readonly disabled: boolean }
export declare class A2Select extends A2FormElement {
  value: string | string[];
  readonly options: A2Option[];
  readonly selectedOptions: A2Option[];
  readonly isOpen: boolean;
  open(): void;
  close(): void;
}
export declare class A2Segment extends HTMLElement { readonly value: string; readonly disabled: boolean }
export declare class A2Segmented extends A2FormElement { value: string }
export declare class A2TabPanel extends HTMLElement { readonly value: string; readonly label: string }
export declare class A2Tabs extends HTMLElement { value: string; readonly panels: A2TabPanel[] }
export declare class A2Color extends A2FormElement { value: string; readonly isOpen: boolean; open(): void }
export declare class A2Keybind extends A2FormElement { value: string; readonly recording: boolean; start(): void; stop(): void }
export declare class A2Progress extends HTMLElement { value: number | null }
export declare class A2Spinner extends HTMLElement {}
export declare class A2Badge extends HTMLElement {}
export declare class A2Card extends HTMLElement {}
export declare class A2Dialog extends HTMLElement { open: boolean; returnValue: string; show(): this; close(returnValue?: string): this }
export declare class A2Drawer extends A2Dialog {}
export declare class A2MenuItem extends HTMLElement { readonly value: string }
export declare class A2Menu extends HTMLElement { readonly isOpen: boolean; show(at?: Element | { x: number; y: number }): void; close(): void }

declare global {
  interface HTMLElementTagNameMap {
    'a2-button': A2Button;
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
    'a2-select': CustomEvent<{ value: string; item: A2MenuItem }>;
    'a2-change': CustomEvent<{ value: string }>;
  }
  interface DocumentEventMap {
    'a2-theme': CustomEvent<{ theme: ThemeName | 'auto' }>;
  }
}
