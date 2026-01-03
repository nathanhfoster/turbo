import type { ComposableComponent } from '../../types';

export type ComponentVariant = 'contained' | 'outlined' | 'text';

export type ComponentColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'white'
  | 'black'
  | 'gray'
  | 'inherit';

export interface ColoredComponent {
  variant?: ComponentVariant;
  color?: ComponentColor;
}

export type ViewportSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type Size =
  | 'inherit'
  | 'xs'
  | ViewportSize
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

export type BaseAlignment = 'start' | 'center' | 'end';
export type AlignItems = BaseAlignment | 'stretch' | 'baseline';
export type JustifyContent = BaseAlignment | 'between' | 'around' | 'evenly';
export type JustifyItems = BaseAlignment | 'stretch';
export type AlignSelf = 'auto' | AlignItems;
export type Shadow = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'outline';
export type ShadowProps = `shadow-${Shadow}`;
export type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type RoundedProps = `rounded-${Rounded}`;
export type AutoSize = 'auto' | 'min' | 'max' | 'fr';
export type Order = 'first' | 'last' | 'none' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type TailwindSpacingSize =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96
  | 'px'
  | 'auto';

export type GridContainer = 'grid' | 'inline-grid';

export type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
export type GridStartEnd = GridSpan | 'auto';
export type GapSize =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64
  | 'px';

export type FlexDirection =
  | 'row'
  | 'row-reverse'
  | 'col'
  | 'col-reverse'
  | 'wrap'
  | 'wrap-reverse'
  | 'nowrap'
  | '1'
  | 'auto'
  | 'initial'
  | 'none';

export type Display =
  | 'block'
  | 'inline-block'
  | 'inline'
  | 'flex'
  | 'inline-flex'
  | GridContainer
  | 'table'
  | 'table-caption'
  | 'table-cell'
  | 'table-column'
  | 'table-column-group'
  | 'table-footer-group'
  | 'table-header-group'
  | 'table-row-group'
  | 'table-row'
  | 'contents'
  | 'list-item'
  | 'hidden';

export type TailwindSpacingPrefix =
  | 'm'
  | 'mx'
  | 'my'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'p'
  | 'px'
  | 'py'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl';

// Tailwind utility definitions remain unchanged
export type TailwindUtilityClass<T extends string> =
  | `${T}-${TailwindSpacingSize}`
  | `${ViewportSize}:${T}-${TailwindSpacingSize}`;

export type TailwindSpacingClass = TailwindUtilityClass<TailwindSpacingPrefix>;

export type TailwindSpacingProps = Partial<Record<TailwindSpacingPrefix, TailwindSpacingClass>>;

export type BoxGap =
  | `gap-${TailwindSpacingSize}`
  | `gap-x-${TailwindSpacingSize}`
  | `gap-y-${TailwindSpacingSize}`;

export type ItemsProp = `items-${AlignItems}`;
export type JustifyProp = `justify-${JustifyContent}`;
export type JustifyItemsProp = `justify-items-${JustifyItems}`;
export type AlignProp = `self-${AlignSelf}`;
export type FlexDirectionProp = `flex-${FlexDirection}`;

export type BoxGridColumns =
  // Grid Template Columns
  // Grid Template Columns and Rows
  | `grid-cols-${GridSpan | 'none'}`
  | `grid-rows-${GridSpan | 'none'}`
  | `grid-cols-${AutoSize}`
  | `grid-rows-${AutoSize}`

  // Gap
  | `gap-${GapSize}`
  | `gap-x-${GapSize}`
  | `gap-y-${GapSize}`

  // Auto Columns and Rows
  | `auto-cols-${AutoSize}`
  | `auto-rows-${AutoSize}`

  // Justify and Align Grid
  | JustifyItemsProp
  | ItemsProp
  | JustifyProp
  | `content-${JustifyContent}`

  // Grid Auto Flow
  | `grid-flow-${'row' | 'col' | 'row-dense' | 'col-dense'}`

  // Ordering Grid Items
  | `order-${Order}`

  // Span and Start/End
  | `col-span-${GridSpan}`
  | `col-start-${GridStartEnd}`
  | `col-end-${GridStartEnd}`
  | `row-span-${GridSpan}`
  | `row-start-${GridStartEnd}`
  | `row-end-${GridStartEnd}`;

export type DarkMode = 'light' | 'dark';

export interface BaseTailwindProps
  extends TailwindSpacingProps,
    ComposableComponent {
  grid?: BoxGridColumns | string;
  gap?: BoxGap;
  items?: ItemsProp;
  justify?: JustifyProp;
  justifyItems?: JustifyItemsProp;
  align?: AlignProp;
  flexDirection?: FlexDirectionProp;
  display?: Display;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  shadow?: ShadowProps;
  rounded?: RoundedProps;
  darkMode?: DarkMode;
  fullWidth?: boolean;
  fullHeight?: boolean;
}
