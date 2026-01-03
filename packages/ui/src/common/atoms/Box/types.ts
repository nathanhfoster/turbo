import type React from 'react';
import type { BaseTailwindProps, ComponentColor, Size } from '../types';

export type BoxHtmlVariant = 'html';
export type BoxDivVariant = 'div';
export type BoxSectionVariant = 'section';
export type BoxArticleVariant = 'article';
export type BoxMainVariant = 'main';
export type BoxHeaderVariant = 'header';
export type BoxFooterVariant = 'footer';
export type BoxNavVariant = 'nav';
export type BoxAsideVariant = 'aside';
export type BoxSpanVariant = 'span';
export type BoxListVariant = 'ul' | 'ol';
export type BoxFormVariant = 'form';
export type BoxDialogVariant = 'dialog';
export type BoxDetailsVariant = 'details';
export type BoxDetailsSummaryVariant = 'summary';

export type BoxVariant =
  | BoxHtmlVariant
  | BoxDivVariant
  | BoxSectionVariant
  | BoxArticleVariant
  | BoxMainVariant
  | BoxHeaderVariant
  | BoxFooterVariant
  | BoxNavVariant
  | BoxAsideVariant
  | BoxListVariant
  | BoxFormVariant
  | BoxSpanVariant
  | BoxDialogVariant
  | BoxDetailsVariant
  | BoxDetailsSummaryVariant;

export interface BaseBoxProps extends BaseTailwindProps {
  position?: string;
  overflow?: string;
  color?: ComponentColor | string;
  bg?: ComponentColor | string;
  border?: string;
  opacity?: string;
  zIndex?: string;
  container?: boolean | Size;
  style?: React.CSSProperties;
}

export interface HtmlProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLHtmlElement>, 'onClick'> {
  variant: BoxHtmlVariant;
  onClick?: React.MouseEventHandler<HTMLHtmlElement>;
}

export interface DivProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  variant?: BoxDivVariant;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface SectionProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  variant: BoxSectionVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface ArticleProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  variant: BoxArticleVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface MainProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  variant: BoxMainVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface HeaderProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  variant: BoxHeaderVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface FooterProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  variant: BoxFooterVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface NavProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  variant: BoxNavVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface AsideProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  variant: BoxAsideVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface SpanProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  variant: BoxSpanVariant;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

export interface ListProps
  extends Omit<BaseBoxProps, 'onClick'>,
    Omit<React.HTMLAttributes<HTMLUListElement | HTMLOListElement>, 'onClick'> {
  variant: BoxListVariant;
  onClick?: React.MouseEventHandler<HTMLUListElement | HTMLOListElement>;
}

export interface FormProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onClick'> {
  variant: BoxFormVariant;
  method?: HTMLFormElement['method'];
  onClick?: React.MouseEventHandler<HTMLFormElement>;
}

export interface DialogProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'onClick'> {
  variant: BoxDialogVariant;
  onClick?: React.MouseEventHandler<HTMLDialogElement>;
}

export interface DetailsProps
  extends Omit<BaseBoxProps, 'onClick'>,
    Omit<React.DetailedHTMLProps<React.DetailsHTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement>, 'onClick'> {
  variant: BoxDetailsVariant;
  onClick?: React.MouseEventHandler<HTMLDetailsElement>;
}

export interface DetailsSummaryProps extends Omit<BaseBoxProps, 'onClick'>, Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  variant: BoxDetailsSummaryVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export type BoxProps =
  | HtmlProps
  | DivProps
  | SectionProps
  | ArticleProps
  | MainProps
  | HeaderProps
  | FooterProps
  | NavProps
  | AsideProps
  | SpanProps
  | ListProps
  | FormProps
  | DialogProps
  | DetailsProps
  | DetailsSummaryProps;
