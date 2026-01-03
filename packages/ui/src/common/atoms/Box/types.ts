import type React from "react";
import type { BaseTailwindProps, ComponentColor, Size } from "../types";

export type BoxHtmlVariant = "html";
export type BoxDivVariant = "div";
export type BoxSectionVariant = "section";
export type BoxArticleVariant = "article";
export type BoxMainVariant = "main";
export type BoxHeaderVariant = "header";
export type BoxFooterVariant = "footer";
export type BoxNavVariant = "nav";
export type BoxAsideVariant = "aside";
export type BoxSpanVariant = "span";
export type BoxListVariant = "ul" | "ol";
export type BoxFormVariant = "form";
export type BoxDialogVariant = "dialog";
export type BoxDetailsVariant = "details";
export type BoxDetailsSummaryVariant = "summary";

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

export interface HtmlProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLHtmlElement>, "onClick" | "children"> {
  variant: BoxHtmlVariant;
  onClick?: React.MouseEventHandler<HTMLHtmlElement>;
  children?: React.ReactNode;
}

export interface DivProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "children"> {
  variant?: BoxDivVariant;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

export interface SectionProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "children"> {
  variant: BoxSectionVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

export interface ArticleProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "children"> {
  variant: BoxArticleVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

export interface MainProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "children"> {
  variant: BoxMainVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

export interface HeaderProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "children"> {
  variant: BoxHeaderVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

export interface FooterProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "children"> {
  variant: BoxFooterVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

export interface NavProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "children"> {
  variant: BoxNavVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

export interface AsideProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "children"> {
  variant: BoxAsideVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

export interface SpanProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLSpanElement>, "onClick" | "children"> {
  variant: BoxSpanVariant;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  children?: React.ReactNode;
}

export interface ListProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<
      React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
      "onClick" | "children"
    > {
  variant: BoxListVariant;
  onClick?: React.MouseEventHandler<HTMLUListElement | HTMLOListElement>;
  children?: React.ReactNode;
}

export interface FormProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.FormHTMLAttributes<HTMLFormElement>, "onClick" | "children"> {
  variant: BoxFormVariant;
  method?: HTMLFormElement["method"];
  onClick?: React.MouseEventHandler<HTMLFormElement>;
  children?: React.ReactNode;
}

export interface DialogProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<
      React.DialogHTMLAttributes<HTMLDialogElement>,
      "onClick" | "children"
    > {
  variant: BoxDialogVariant;
  onClick?: React.MouseEventHandler<HTMLDialogElement>;
  children?: React.ReactNode;
}

export interface DetailsProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<
      React.DetailedHTMLProps<
        React.DetailsHTMLAttributes<HTMLDetailsElement>,
        HTMLDetailsElement
      >,
      "onClick" | "children"
    > {
  variant: BoxDetailsVariant;
  onClick?: React.MouseEventHandler<HTMLDetailsElement>;
  children?: React.ReactNode;
}

export interface DetailsSummaryProps
  extends Omit<BaseBoxProps, "onClick" | "children">,
    Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "children"> {
  variant: BoxDetailsSummaryVariant;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
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
