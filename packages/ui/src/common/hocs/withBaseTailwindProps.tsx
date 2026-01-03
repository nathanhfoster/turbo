import { combineClassNames , isNil} from '@monkey-tilt/utils';
import { useMemo } from "react";
import type { BaseTailwindProps } from "../atoms/types";

const withBaseTailwindProps = <P extends BaseTailwindProps>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const componentName = Component.displayName || Component.name || "Component";

  const TailwindComponent: React.FC<P> = ({
    fullWidth = false,
    fullHeight = false,
    grid,
    gap,
    items,
    justify,
    justifyItems,
    align,
    flexDirection,
    display = !isNil(items) ||
    !isNil(justify) ||
    !isNil(align) ||
    (flexDirection && flexDirection !== "flex-auto")
      ? "flex"
      : undefined,
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    shadow,
    rounded,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    className,
    darkMode,
    ...props
  }: P) => {
    const classes = useMemo(() => {
      const darkBackgroundClass =
        darkMode === "dark"
          ? "dark:bg-background-dark"
          : darkMode === "light"
            ? "dark:bg-background-light"
            : null;
      return combineClassNames(
        fullWidth && "w-full",
        fullHeight && "h-full",
        grid,
        gap,
        items,
        justify,
        justifyItems,
        align,
        display,
        flexDirection,
        width,
        height,
        maxWidth,
        maxHeight,
        minWidth,
        minHeight,
        shadow,
        rounded,
        m,
        mx,
        my,
        mt,
        mr,
        mb,
        ml,
        p,
        px,
        py,
        pt,
        pr,
        pb,
        pl,
        className,
        darkBackgroundClass
      );
    }, [
      fullWidth,
      fullHeight,
      grid,
      gap,
      items,
      justify,
      justifyItems,
      align,
      flexDirection,
      display,
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      shadow,
      rounded,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      className,
    ]);

    return (
      <Component
        {...({
          ...props,
          className: classes,
        } as P)}
      />
    );
  };

  TailwindComponent.displayName = `withBaseTailwindProps(${componentName})`;
  return TailwindComponent;
};

export default withBaseTailwindProps;
