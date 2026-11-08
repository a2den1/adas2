// adas2 2.x 타입 선언

export type EaseName =
  | 'Linear' | 'InSine' | 'OutSine' | 'InOutSine' | 'InQuad' | 'OutQuad' | 'InOutQuad'
  | 'InCubic' | 'OutCubic' | 'InOutCubic' | 'InQuart' | 'OutQuart' | 'InOutQuart'
  | 'InQuint' | 'OutQuint' | 'InOutQuint' | 'InExpo' | 'OutExpo' | 'InOutExpo'
  | 'InCirc' | 'OutCirc' | 'InOutCirc' | 'InBack' | 'OutBack' | 'InOutBack'
  | 'InElastic' | 'OutElastic' | 'InOutElastic' | 'InBounce' | 'OutBounce' | 'InOutBounce';
export type EaseFn = (t: number) => number;

export declare class Config {
  constructor(init?: Partial<Config>);
  uiScale: number;
  tooltipEnabled: boolean;
  middleClickToDefault: boolean;
  sliderSensitivity: number;
  animationSpeed: number;
  with(over: Partial<Config>): Config;
  static readonly default: Config;
}

export interface ThemeValues {
  name: string;
  panelBg: string; topBar: string; menuBg: string; objectBg: string; objectButton: string;
  objectActive: string; objectActiveBright: string; menuHover: string; cardHeader: string; cardPanel: string;
  softRed: string; buttonHover: string; buttonPressed: string; text: string; tooltipBg: string;
  overlayScrim: string; outline: string; controlOutlineIdle: string; controlOutlineHover: string;
  mathOk: string; mathWarn: string; mathErr: string;
  channelR: string; channelG: string; channelB: string; channelA: string; channelS: string; channelV: string;
  inactiveAlpha: number; textDimAlpha: number; textFaintAlpha: number; disabledContentAlpha: number;
  cornerRadius: number; outlineWidth: number; controlHeight: number; controlPaddingY: number;
  lineHeight: number; fontSizeBody: number; fontSizeH1: number; font: string; fontMono: string;
}
export declare class Theme implements Readonly<ThemeValues> {
  constructor(values?: Partial<ThemeValues>);
  readonly [K: string]: any;
  with(over: Partial<ThemeValues>): Theme;
  controlHeightFor(fontSize: number): number;
  applyTo(el: HTMLElement): void;
  static readonly Dark: Theme;
  static readonly Light: Theme;
  static readonly Orange: Theme;
}

export declare function configure(opts?: { config?: Partial<Config> | Config; theme?: Theme; root?: HTMLElement }): void;
export declare function ensureDefaults(): void;
export declare function setTheme(theme: Theme): void;
export declare function setConfig(over: Partial<Config>): void;
export declare function onContextChange(fn: (ctx: { config: Config; theme: Theme }) => void): () => void;

export interface TweenHandle { kill(): void; complete(): void; }
export declare function tween<T extends Record<string, number>>(from: T, to: T, duration: number, ease: EaseName | EaseFn, onUpdate: (v: T, progress: number) => void, onDone?: () => void): TweenHandle;
export declare function tweenNumber(from: number, to: number, duration: number, ease: EaseName | EaseFn, onUpdate: (v: number) => void, onDone?: () => void): TweenHandle;
export declare function tweenColor(get: () => string, set: (css: string) => void, target: string, duration: number, ease?: EaseName | EaseFn, onDone?: () => void): TweenHandle;
export declare const Ease: Readonly<Record<EaseName, EaseFn>>;

export declare function evaluate(expr: string, vars?: Record<string, number>): { ok: boolean; value?: number; error?: string };

export type Parent = Element | string | { el: Element } | { content: Element } | null;
export type Opts<T> = Partial<T> | ((o: T) => void);

export declare class Control<V = unknown, O = object> {
  readonly el: HTMLElement;
  readonly id: string | null;
  opts: O;
  value: V;
  blocked: boolean;
  set(v: V, notify?: boolean): void;
  reset(notify?: boolean): void;
  setDefaultValue(v: V | null, noAnimate?: boolean): void;
  updateVisual(noAnimate?: boolean): void;
  setBlocked(blocked: boolean): void;
  dispose(): void;
}
export declare function getControl<C extends Control = Control>(id: string): C | undefined;

export interface ButtonOptions { text: string; icon: string | Element | null; iconPadding: number; height: number | null; onClick: ((b: Button) => void) | null; tooltip: string | (() => string) | null; }
export declare class Button extends Control<never, ButtonOptions> { constructor(parent: Parent, id: string | null, opts?: Opts<ButtonOptions>); text: string; normalColor: string | null; click(notify?: boolean): void; }

export interface ToggleOptions { value: boolean; defaultValue: boolean | null; text: string; onChanged: ((v: boolean, c: Toggle) => void) | null; tooltip: string | null; }
export declare class Toggle extends Control<boolean, ToggleOptions> { constructor(parent: Parent, id: string | null, opts?: Opts<ToggleOptions>); toggle(notify?: boolean): void; }

export interface ValueScale { normalize(min: number, v: number, max: number): number; denormalize(min: number, t: number, max: number): number; }
export interface SliderOptions {
  min: number; max: number; value: number; defaultValue: number | null;
  format: number | ((v: number) => string); label: string;
  clampDrag: boolean; clampInput: boolean; inputMin: number | null; inputMax: number | null;
  dragFilter: ((v: number) => number) | null; inputFilter: ((v: number) => number) | null;
  scale: ValueScale | null; showFill: boolean; dragStep: number | null; height?: number;
  onChanged: ((v: number, c: Slider) => void) | null; onComplete: ((v: number, c: Slider) => void) | null; tooltip: string | null;
}
export declare class Slider extends Control<number, SliderOptions> { constructor(parent: Parent, id: string | null, opts?: Opts<SliderOptions>); normalize(v?: number): number; setNormalized(t: number, notify?: boolean): void; beginEdit(): void; }

export interface InputOptions { value: string; defaultValue: string | null; placeholder: string; icon: string | Element | null; multiline: boolean; monospace: boolean; onChanged: ((v: string, c: Input) => void) | null; onEndEdit: ((v: string, c: Input) => void) | null; tooltip: string | null; }
export declare class Input extends Control<string, InputOptions> { constructor(parent: Parent, id: string | null, opts?: Opts<InputOptions>); focus(): void; }

export interface SegmentedOptions<T> { values: T[]; value: T; defaultValue: T | null; display: (v: T) => string; height: number | null; fontSize: number | null; onChanged: ((v: T, c: Segmented<T>) => void) | null; tooltip: string | null; }
export declare class Segmented<T = string> extends Control<T, SegmentedOptions<T>> { constructor(parent: Parent, id: string | null, opts?: Opts<SegmentedOptions<T>>); setValues(values: T[], notify?: boolean): void; fontSize: number; }

export interface DropdownOptions<T> { values: T[]; value: T; defaultValue: T | null; display: (v: T) => string; onChanged: ((v: T, c: Dropdown<T>) => void) | null; tooltip: string | null; }
export declare class Dropdown<T = string> extends Control<T, DropdownOptions<T>> { constructor(parent: Parent, id: string | null, opts?: Opts<DropdownOptions<T>>); readonly expanded: boolean; setExpanded(open: boolean): void; toggleExpanded(): void; setValues(values: T[], notify?: boolean): void; }
export interface MultiDropdownOptions<T> extends Omit<DropdownOptions<T>, 'value' | 'defaultValue' | 'onChanged'> { value: T[]; defaultValue: T[] | null; summary: ((values: T[]) => string) | null; onChanged: ((v: T[], c: MultiDropdown<T>) => void) | null; }
export declare class MultiDropdown<T = string> extends Control<T[], MultiDropdownOptions<T>> { constructor(parent: Parent, id: string | null, opts?: Opts<MultiDropdownOptions<T>>); toggle(v: T, notify?: boolean): void; has(v: T): boolean; setExpanded(open: boolean): void; }

export interface ColorPickerOptions { value: string; defaultValue: string | null; label: string; onChanged: ((hex: string, c: ColorPicker) => void) | null; onComplete: ((hex: string, c: ColorPicker) => void) | null; tooltip: string | null; }
export declare class ColorPicker extends Control<string, ColorPickerOptions> { constructor(parent: Parent, id: string | null, opts?: Opts<ColorPickerOptions>); open(): void; close(): void; setMode(useHsv: boolean): void; setChannel(i: 0 | 1 | 2 | 3, v: number): void; setHsv(h: number, s: number, v: number, notify?: boolean): void; }

export interface CardOptions { title: string; active: boolean; onActiveChanged: ((on: boolean, c: Card) => void) | null; onDelete: ((c: Card) => void) | null; showDelete: boolean; showActiveToggle: boolean; collapsed: boolean; }
export declare class Card { constructor(parent: Parent, opts?: Opts<CardOptions>); readonly el: HTMLElement; readonly content: HTMLElement; active: boolean; expanded: boolean; title: string; setActive(on: boolean, notify?: boolean): void; setExpanded(open: boolean): void; dispose(): void; }
export declare class ScrollView { constructor(parent: Parent, opts?: { spacing?: number; padding?: number; expand?: boolean }); readonly el: HTMLElement; readonly viewport: HTMLElement; readonly content: HTMLElement; }

export interface WindowOptions {
  id: string | null; title: string; size: [number, number]; position: [number, number] | null;
  icon: string | Element | null; iconSize: number; showCloseButton: boolean; draggable: boolean;
  resizable: boolean; minSize: [number, number]; showOutline: boolean; clipContent: boolean;
  topBarHeight: number; padding: number; panelColor: string | null; topBarColor: string | null;
  titleFontSize: number | null; bringToFrontOnFocus: boolean;
}
export declare class Window {
  readonly el: HTMLElement; readonly content: HTMLElement; readonly id: string; readonly visible: boolean;
  on(event: 'closeRequested' | 'focused' | 'moved' | 'resized', fn: (w: Window) => void): () => void;
  show(): void; hide(): void; setTitle(t: string): void; setIcon(icon: string | Element | null): void;
  setSize(w: number, h: number): void; setPosition(p: [number, number] | null): void; bringToFront(): void; dispose(): void;
}
export declare class WindowManager {
  static create(root?: Parent): WindowManager;
  readonly root: HTMLElement; readonly windows: Set<Window>;
  create(opts?: Opts<WindowOptions>): Window;
  get(id: string): Window | null;
  bringToFront(w: Window): void;
}

export declare const Tooltip: { show(text: string): void; hide(): void };
export declare function tooltip(el: Element, text: string | (() => string)): Element;

export declare function switchPage<K>(pages: Map<K, HTMLElement> | Record<string, HTMLElement> | HTMLElement[], from: K, to: K): boolean;
export declare const PageSwitcher: { switchPage: typeof switchPage };

export declare class KeyCombo { constructor(main: string, ...modifiers: string[]); readonly isHeld: boolean; static parse(s: string): KeyCombo; }
export interface Shortcut { id: string; combo: KeyCombo; holdSeconds: number; }
export declare const ShortcutManager: {
  isSuspended: () => boolean;
  register(id: string, combo: KeyCombo | string, holdSeconds?: number, handlers?: { onPressed?: (s: Shortcut) => void; onHeld?: (s: Shortcut) => void; onReleased?: (s: Shortcut) => void }): Shortcut;
  get(id: string): Shortcut | undefined; unregister(id: string): void; clear(): void;
};

export declare const Factory: {
  button(parent: Parent, id: string | null, opts?: Opts<ButtonOptions>): Button;
  button(parent: Parent, onClick: (b: Button) => void, text?: string, id?: string): Button;
  toggle(parent: Parent, id: string | null, opts?: Opts<ToggleOptions>): Toggle;
  slider(parent: Parent, id: string | null, opts?: Opts<SliderOptions>): Slider;
  input(parent: Parent, id: string | null, opts?: Opts<InputOptions>): Input;
  segmented<T>(parent: Parent, id: string | null, opts?: Opts<SegmentedOptions<T>>): Segmented<T>;
  dropdown<T>(parent: Parent, id: string | null, opts?: Opts<DropdownOptions<T>>): Dropdown<T>;
  multiDropdown<T>(parent: Parent, id: string | null, opts?: Opts<MultiDropdownOptions<T>>): MultiDropdown<T>;
  colorPicker(parent: Parent, id: string | null, opts?: Opts<ColorPickerOptions>): ColorPicker;
  card(parent: Parent, opts?: Opts<CardOptions>): Card;
  scrollView(parent: Parent, opts?: { spacing?: number; padding?: number; expand?: boolean }): ScrollView;
  row(parent: Parent, height?: number): HTMLElement;
  stack(parent: Parent, gap?: number): HTMLElement;
  text(parent: Parent, text: string, opts?: { h1?: boolean; dim?: boolean }): HTMLElement;
  tooltip: typeof tooltip;
};

export declare const version: string;
declare const adas2: {
  version: string; configure: typeof configure; ensureDefaults: typeof ensureDefaults; setTheme: typeof setTheme; setConfig: typeof setConfig;
  onContextChange: typeof onContextChange; Config: typeof Config; Theme: typeof Theme; Ease: typeof Ease;
  tween: typeof tween; tweenNumber: typeof tweenNumber; tweenColor: typeof tweenColor; evaluate: typeof evaluate;
  Tooltip: typeof Tooltip; tooltip: typeof tooltip; Window: typeof Window; WindowManager: typeof WindowManager;
  Control: typeof Control; getControl: typeof getControl; Button: typeof Button; Toggle: typeof Toggle; Slider: typeof Slider;
  Input: typeof Input; Segmented: typeof Segmented; Dropdown: typeof Dropdown; MultiDropdown: typeof MultiDropdown;
  ColorPicker: typeof ColorPicker; Card: typeof Card; ScrollView: typeof ScrollView; Factory: typeof Factory;
  PageSwitcher: typeof PageSwitcher; switchPage: typeof switchPage; KeyCombo: typeof KeyCombo; ShortcutManager: typeof ShortcutManager;
};
export default adas2;
declare global { interface Window { adas2: typeof adas2; } }
