import { combineClassNames } from "@nathanhfoster/utils";
import dynamic from "next/dynamic";
import Box from "../Box";
import type { BaseBoxProps } from "../Box/types";
import type { LinkProps } from "../Link/types";
import {
  BASE_STYLES,
  BORDER_STYLES,
  CARD_VARIANTS,
  HOVER_STYLES,
} from "./constants";
import type { CardProps, CardVariant, CardPaddingProp } from "./types";

const Link = dynamic<LinkProps>(() => import("../Link"));

const Card = ({
  children,
  className,
  hoverable = false,
  bordered = true,
  padding = "p-4 sm:p-5 md:p-6",
  variant = "default",
  boxVariant,
  href,
  onClick,
  ...props
}: CardProps) => {
  const cardVariant = CARD_VARIANTS[variant as CardVariant];
  const isLink = !!href;

  const cardClassName = combineClassNames(
    BASE_STYLES,
    bordered && BORDER_STYLES,
    padding && padding,
    hoverable && HOVER_STYLES,
    cardVariant,
    isLink && "cursor-pointer",
    className,
  );

  if (isLink) {
    // Exclude Card-specific props when rendering as Link
    const {
      padding: _,
      variant: __,
      hoverable: ___,
      bordered: ____,
      href: _____,
      ...linkProps
    } = props as CardProps & {
      padding?: CardPaddingProp;
      variant?: CardVariant;
      hoverable?: boolean;
      bordered?: boolean;
      href?: LinkProps["href"];
    };

    return (
      <Box variant={boxVariant} className={cardClassName}>
        <Link
          href={href}
          onClick={onClick}
          className="block h-full w-full"
          {...(linkProps as Omit<
            LinkProps,
            "href" | "children" | "onClick" | "className"
          >)}
        >
          {children}
        </Link>
      </Box>
    );
  }

  // Exclude Card-specific props from props spread since Box doesn't accept them
  const {
    padding: _,
    variant: __,
    hoverable: ___,
    bordered: ____,
    href: _____,
    ...boxProps
  } = props as CardProps & {
    padding?: CardPaddingProp;
    variant?: CardVariant;
    hoverable?: boolean;
    bordered?: boolean;
    href?: never;
  };

  return (
    <Box
      variant={boxVariant}
      className={cardClassName}
      onClick={onClick}
      {...(boxProps as Omit<BaseBoxProps, "variant" | "padding">)}
    >
      {children}
    </Box>
  );
};

export default Card;
