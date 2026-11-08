// adas2 타입 선언 — 커스텀 엘리먼트와 전역 adas2 객체.

export interface Spring { k: number; c: number; }

export declare class Motion<T extends Record<string, number> = Record<string, number>> {
  constructor(init: T, render: (v: T, m: Motion<T>) => void, spring?: Spring);
  /** 목표값으로 스프링 이동. springs 로 키별 강성을, onRest 로 멈췄을 때 콜백을 준다. */
  to(target: Partial<T>, springs?: Partial<Record<keyof T, Spring>> | null, onRest?: ((m: Motion<T>) => void) | null): this;
  /** 애니메이션 없이 바로 설정 */
  set(target: Partial<T>): this;
  readonly moving: boolean;
  v: T;
  t: T;
}

export declare const springs: { base: Spring; fast: Spring; slow: Spring; press: Spring };
export declare const version: string;
declare const adas2: { Motion: typeof Motion; springs: typeof springs; version: string };
export default adas2;

export interface A2ButtonElement extends HTMLElement {}
export interface A2SliderElement extends HTMLElement { value: number; }
export interface A2DropdownElement extends HTMLElement {
  value: string; readonly selectedIndex: number; readonly open: boolean;
  setOpen(open: boolean): void; toggle(): void; close(): void; select(index: number): void;
}
export interface A2TextfieldElement extends HTMLElement { value: string; focus(): void; }
export interface A2SplitElement extends HTMLElement { selectedIndex: number; }
export interface A2SplitItemElement extends HTMLElement {}
export interface A2NavbarElement extends HTMLElement { value: number; select(index: number): void; }
export interface A2NavItemElement extends HTMLElement {}
export interface A2AppbarElement extends HTMLElement { setTitle(text: string, dir?: 1 | -1): void; }
export interface A2CheckboxElement extends HTMLElement { checked: boolean; }
export interface A2DatepickerElement extends HTMLElement { /** YYYY-MM-DD */ value: string; shift(months: number): void; }
export interface A2TimepickerElement extends HTMLElement { /** HH:MM (24시간) */ value: string; setMode(mode: 'h' | 'm'): void; }
export interface A2ModalElement extends HTMLElement { readonly isOpen: boolean; open(trigger?: Element | null): void; close(): void; }

declare global {
  interface Window { adas2: typeof adas2; }
  interface HTMLElementTagNameMap {
    'a2-button': A2ButtonElement;
    'a2-slider': A2SliderElement;
    'a2-dropdown': A2DropdownElement;
    'a2-textfield': A2TextfieldElement;
    'a2-split': A2SplitElement;
    'a2-split-item': A2SplitItemElement;
    'a2-navbar': A2NavbarElement;
    'a2-nav-item': A2NavItemElement;
    'a2-appbar': A2AppbarElement;
    'a2-checkbox': A2CheckboxElement;
    'a2-datepicker': A2DatepickerElement;
    'a2-timepicker': A2TimepickerElement;
    'a2-modal': A2ModalElement;
  }
}
